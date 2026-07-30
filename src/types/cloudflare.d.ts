/// <reference types="@cloudflare/workers-types" />

declare module "cloudflare:node" {
  interface HttpServerHandlerOptions {
    port: number;
  }
  export function httpServerHandler(options: HttpServerHandlerOptions): ExportedHandler;
}
