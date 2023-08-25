export const getMissingAttributes = (jsonParsed: any): string[] => {
  const requiredAttributes = [
    "openapi",
    "info",
    "info.title",
    "paths",
    "components",
  ];

  const missingAttributes: string[] = [];
  for (const attr of requiredAttributes) {
    const attrParts = attr.split(".");
    let currentObj = jsonParsed;
    let isValid = true;
    for (const part of attrParts) {
      if (!(part in currentObj)) {
        isValid = false;
        break;
      }
      currentObj = currentObj[part];
    }
    if (!isValid) {
      missingAttributes.push(attr);
    }
  }
  return missingAttributes;
};

export const validationReasons = (attr: string): string => {
  const reasons: Record<string, string> = {
    openapi: "It defines the OpenAPI version of the document.",
    info: "It provides metadata about the API.",
    "info.title": "It specifies the title of the API.",
    paths: "It defines the available API endpoints.",
    components: "It holds reusable components used in the specification.",
  };
  return reasons[attr] || "Unknown reason.";
};
