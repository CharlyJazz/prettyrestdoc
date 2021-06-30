// @ts-nocheck
import { OpenAPIV3 } from "openapi-types";

/* 
 Get Object From 'schemas'
*/
const getObjectExample = (
  doc: OpenAPIV3.Document | OpenAPIV3.BaseSchemaObject,
  schemaName: string
): RawExample => {
  const objectExample: RawExample = {};
  // If doc dont have components then is a BaseSchemaObject and not a Document
  const schema =
    (doc?.components?.schemas?.[schemaName] as OpenAPIV3.SchemaObject) || doc;
  if (schema) {
    const entries = Object.entries(
      schema.properties || schema?.items?.properties || {}
    );
    for (let i = 0; i < entries.length; i++) {
      let [key, value] = entries[i];
      value = value as OpenAPIV3.NonArraySchemaObject;
      if (value.example) {
        objectExample[key] = value.example;
      } else if (value.type === "array" && value.items && value.items.example) {
        objectExample[key] = [value.items.example];
      } else if (value.type === "object" && value.properties) {
        objectExample[key] = getObjectExample(value);
      } else if (
        value.type === "array" &&
        value.items &&
        value.items.properties
      ) {
        objectExample[key] = [getObjectExample(value)];
      }
    }
  }
  return objectExample;
};

export default getObjectExample;
