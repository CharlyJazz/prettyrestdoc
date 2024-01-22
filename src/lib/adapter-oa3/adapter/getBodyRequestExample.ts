// @ts-nocheck

import { OpenAPIV3 } from "openapi-types";
import getIntegerExample from "./getIntegerExample";
import getNumberExample from "./getNumberExample";
import getSchema from "./getSchema";
import getStringExample from "./getStringExample";

/* 
 Get Object From 'bodyRequest' attribute
*/
const getBodyRequestExample: RawExample = (
  requestBodyObject: OpenAPIV3.RequestBodyObject
): RawExample => {
  const bodyRequest: RawExample = {};
  const schema = getSchema(requestBodyObject);
  if (schema) {
    const entries = Object.entries(
      schema.properties || schema?.items?.properties || {}
    );
    for (let i = 0; i < entries.length; i++) {
      let [key, value] = entries[i];
      value = value as OpenAPIV3.NonArraySchemaObject;
      if (value.enum) {
        bodyRequest[key] = value.enum.length
          ? value.example || value.enum[0]
          : "Enum: Needs enum options";
      } else if (value.example) {
        bodyRequest[key] = value.example;
      } else if (value.type === "boolean") {
        bodyRequest[key] = true;
      } else if (value.type === "string") {
        bodyRequest[key] = `A string`;
      } else if (value.type === "string") {
        bodyRequest[key] = getStringExample(value.format);
      } else if (value.type === "integer") {
        bodyRequest[key] = getIntegerExample(value.format);
      } else if (value.type === "number") {
        bodyRequest[key] = getNumberExample(value.format);
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
