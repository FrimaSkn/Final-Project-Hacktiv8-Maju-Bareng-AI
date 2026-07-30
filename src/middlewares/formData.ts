import { Request, Response, NextFunction } from "express";

interface FormDataFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  fieldname: string;
  size: number;
}

function parseFormData(req: Request, _res: Response, next: NextFunction): void {
  const contentType = req.headers["content-type"] || "";

  if (!contentType.startsWith("multipart/form-data")) {
    return next();
  }

  const boundaryMatch = contentType.match(/boundary=(?:"([^"]+)"|([^;]+))/);
  if (!boundaryMatch) {
    return next(new Error("Invalid multipart boundary"));
  }

  const boundary = boundaryMatch[1] || boundaryMatch[2];
  const rawBody = (req as unknown as { rawBody?: Buffer }).rawBody;

  if (!rawBody || rawBody.length === 0) {
    return next(new Error("Empty request body"));
  }

  const boundaryBuffer = Buffer.from(`--${boundary}`);
  const parts = splitBuffer(rawBody, boundaryBuffer);

  const parsedBody: Record<string, string> = {};

  for (const part of parts) {
    const headerEnd = part.indexOf("\r\n\r\n");
    if (headerEnd === -1) continue;

    const headerSection = part.subarray(0, headerEnd).toString("utf8");
    const bodySection = part.subarray(headerEnd + 4, part.length - 2);

    const nameMatch = headerSection.match(/name="([^"]+)"/);
    if (!nameMatch) continue;

    const fieldName = nameMatch[1];
    const filenameMatch = headerSection.match(/filename="([^"]+)"/);

    if (filenameMatch) {
      const mimetypeMatch = headerSection.match(/Content-Type:\s*(\S+)/i);
      (req as unknown as { file?: FormDataFile }).file = {
        buffer: bodySection,
        mimetype: mimetypeMatch ? mimetypeMatch[1] : "application/octet-stream",
        originalname: filenameMatch[1],
        fieldname: fieldName,
        size: bodySection.length,
      };
    } else {
      parsedBody[fieldName] = bodySection.toString("utf8");
    }
  }

  req.body = { ...req.body, ...parsedBody };
  next();
}

function splitBuffer(buffer: Buffer, delimiter: Buffer): Buffer[] {
  const parts: Buffer[] = [];
  let start = 0;
  let index: number;

  while ((index = buffer.indexOf(delimiter, start)) !== -1) {
    if (index > start) {
      parts.push(buffer.subarray(start, index));
    }
    start = index + delimiter.length;
  }

  return parts;
}

export default parseFormData;

// Raw body capture middleware — must run BEFORE any body parser
export function captureRawBody(req: Request, _res: Response, next: NextFunction): void {
  const chunks: Buffer[] = [];
  req.on("data", (chunk: Buffer) => chunks.push(chunk));
  req.on("end", () => {
    (req as unknown as { rawBody?: Buffer }).rawBody = Buffer.concat(chunks);
    next();
  });
}
