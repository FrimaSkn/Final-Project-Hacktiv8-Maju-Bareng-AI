const responseSchema = {
  type: "object",
  properties: {
    reply: { type: "string", description: "Empathetic-logical reply to the user" },
    dichotomy_table: {
      type: ["object", "null"],
      properties: {
        internal: {
          type: "array",
          items: { type: "string" },
          description:
            "Things the user can control (shown as an 'INTERNAL' card in the UI)",
        },
        external: {
          type: "array",
          items: { type: "string" },
          description:
            "Things outside the user's control (shown as an 'EXTERNAL' card in the UI)",
        },
      },
    },
    crisis_flag: {
      type: "boolean",
      description: "true if the user shows signs of self-harm intent",
    },
  },
  required: ["reply", "crisis_flag"],
};

export default responseSchema;
