// @ts-nocheck
import { OpenAPIV3 } from "openapi-types";
import getIntegerExample from "./getIntegerExample";
import getNumberExample from "./getNumberExample";
import getStringExample from "./getStringExample";

/*
 Get Object From 'schemas'
*/
const getObjectExample = (
  doc: OpenAPIV3.Document | OpenAPIV3.BaseSchemaObject,
  schemaName: string
): RawExample => {
  const objectExample: RawExample = {};
  // If doc don't have components then it is a BaseSchemaObject and not a Document
  const schema =
    (doc?.components?.schemas?.[schemaName] as OpenAPIV3.SchemaObject) || doc;
  if (schema) {
    const entries = Object.entries(
      schema.properties || schema?.items?.properties || {}
    );
    for (let i = 0; i < entries.length; i++) {
      let [key, value] = entries[i];
      value = value as OpenAPIV3.NonArraySchemaObject;
      if (value.enum) {
        objectExample[key] = value.enum.length
          ? value.example || value.enum[0]
          : "Enum: Needs enum options";
      } else if (value.example) {
        objectExample[key] = value.example;
      } else if (value.type === "boolean") {
        objectExample[key] = true;
      } else if (value.type === "string") {
        objectExample[key] = getStringExample(value.format);
      } else if (value.type === "integer") {
        objectExample[key] = getIntegerExample(value.format);
      } else if (value.type === "number") {
        objectExample[key] = getNumberExample(value.format);
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
