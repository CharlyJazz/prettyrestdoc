// @ts-nocheck
import { OpenAPIV3 } from "openapi-types";

const getObjectSchema = (
  doc:
    | OpenAPIV3.Document
    | OpenAPIV3.BaseSchemaObject
    | OpenAPIV3.ReferenceObject,
  schemaName: string
): SchemaItem[] => {
  const objectSchema: SchemaItem[] = [];
  const schema =
    (doc?.components?.schemas?.[schemaName] as OpenAPIV3.SchemaObject) || doc;
  if (schema) {
    const entries = Object.entries(schema.properties || {});
    for (let i = 0; i < entries.length; i++) {
      let [key, value] = entries[i];
      value = value as OpenAPIV3.NonArraySchemaObject;
      const schemaToPush = {
        name: key,
        description: value?.description || "",
        required: value.required || schema.required?.includes(key),
        data_type: value.enum ? "enum" : value.type,
        ...(value.enum
          ? { options: value.enum.map((n) => ({ name: n, description: "" })) }
          : {}),
      };
      if (
        schemaToPush.data_type === "object" ||
        schemaToPush.data_type === "array"
      ) {
        schemaToPush.attributes = getObjectSchema({
          properties: value.properties || value.items?.properties,
        });
      }
      objectSchema.push(schemaToPush);
    }
  }
  return objectSchema;
};

export default getObjectSchema;
