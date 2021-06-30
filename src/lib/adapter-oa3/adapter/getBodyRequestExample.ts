// @ts-nocheck

import { OpenAPIV3 } from "openapi-types";

const getSchema = (requestBodyObject: OpenAPIV3.RequestBodyObject) =>
  requestBodyObject?.content?.["application/json"]?.schema ||
  requestBodyObject?.content?.["multipart/form-data"]?.schema;

/* 
 Get Object From 'bodyRequest' attribute
*/
const getBodyRequestExample: RawExample = (
  requestBodyObject: OpenAPIV3.RequestBodyObject
): RawExample => {
  const bodyRequest: RawExample = {};
  const schema = getSchema(requestBodyObject) as OpenAPIV3.SchemaObject;
  if (schema) {
    const entries = Object.entries(
      schema.properties || schema?.items?.properties || {}
    );
    for (let i = 0; i < entries.length; i++) {
      let [key, value] = entries[i];
      value = value as OpenAPIV3.NonArraySchemaObject;
      if (value.example) {
        bodyRequest[key] = value.example;
      } else if (value.type === "array" && value.items && value.items.example) {
        bodyRequest[key] = [value.items.example];
      } else if (value.type === "object" && value.properties) {
        bodyRequest[key] = getBodyRequestExample({
          content: { "application/json": { schema: value } },
        });
      } else if (
        value.type === "array" &&
        value.items &&
        value.items.properties
      ) {
        bodyRequest[key] = [
          getBodyRequestExample({
            content: { "application/json": { schema: value } },
          }),
        ];
      }
    }
  }
  return bodyRequest;
};

export default getBodyRequestExample;
