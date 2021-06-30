import { OpenAPIV3 } from "openapi-types";
import getObjectSchema from "./getObjectSchema";

const getParameters = (
  parameters: OpenAPIV3.ParameterObject[] | undefined,
  method: HTTP_METHOD,
  requestBody: OpenAPIV3.RequestBodyObject | undefined
): SchemaParameters => {
  // console.log(parameters);
  const inHeader: SchemaItem[] = [];
  const inPath: SchemaItem[] = [];
  const inQuery: SchemaItem[] = [];
  const inBody: SchemaItem[] = [];

  // https://swagger.io/docs/specification/describing-request-body/
  if (["POST", "PUT", "PATCH"].includes(method) && requestBody) {
    inBody.push(
      ...getObjectSchema(
        (requestBody as OpenAPIV3.RequestBodyObject)?.content?.[
          "application/json"
        ]?.schema as OpenAPIV3.BaseSchemaObject,
        ""
      )
    );
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
