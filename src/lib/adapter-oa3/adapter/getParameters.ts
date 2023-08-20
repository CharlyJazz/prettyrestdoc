import { OpenAPIV3 } from "openapi-types";
import getObjectSchema from "./getObjectSchema";
import getSchema from "./getSchema";

const getParameters = (
  parameters: OpenAPIV3.ParameterObject[] | undefined,
  method: HTTP_METHOD,
  requestBody: OpenAPIV3.RequestBodyObject | undefined
): SchemaParameters => {
  const inHeader: SchemaItem[] = [];
  const inPath: SchemaItem[] = [];
  const inQuery: SchemaItem[] = [];
  const inBody: SchemaItem[] = [];

  // https://swagger.io/docs/specification/describing-request-body/
  if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
    const schema = getSchema(requestBody as OpenAPIV3.RequestBodyObject);
    if (schema) {
      inBody.push(...getObjectSchema(schema, ""));
    }
  }

  if (parameters && Array.isArray(parameters) && parameters?.length) {
    for (let i = 0; i < parameters.length; i++) {
      const element = parameters[i] as OpenAPIV3.ParameterObject;
      if (element.in === "path") {
        inPath.push({
          name: element.name,
          description: element.description || "",
        });
      }

      if (element.in === "query") {
        inQuery.push({
          name: element.name,
          description: element.description || "",
        });
      }

      if (element.in === "header") {
        inHeader.push({
          name: element.name,
          description: element.description || "",
        });
      }
    }
  }

  return {
    inHeader,
    inBody,
    inPath,
    inQuery,
  };
};

export default getParameters;
