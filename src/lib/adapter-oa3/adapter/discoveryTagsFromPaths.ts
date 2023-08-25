import { OpenAPIV3 } from "openapi-types";

const discoveryTagsFromPaths = (
  openApiDocument: OpenAPIV3.Document
): OpenAPIV3.TagObject[] => {
  const tags: OpenAPIV3.TagObject[] = [];

  if (openApiDocument.paths) {
    for (const pathKey in openApiDocument.paths) {
      const pathItem = openApiDocument.paths[
        pathKey
      ] as OpenAPIV3.PathItemObject;

      if (pathItem) {
        for (const methodKey in pathItem) {
          if (methodKey !== "parameters") {
            const method = (pathItem as any)[
              methodKey
            ] as OpenAPIV3.OperationObject;
            if (method.tags && Array.isArray(method.tags)) {
              method.tags.forEach((tag) => {
                const existingTag = tags.find((t) => t.name === tag);
                if (!existingTag) {
                  tags.push({
                    name: tag,
                    description: `Section grouped by ${tag}`,
                    externalDocs: {
                      url: "",
                      description: "",
                    },
                  });
                }
              });
            }
          }
        }
      }
    }
  }

  return tags;
};

export default discoveryTagsFromPaths;
