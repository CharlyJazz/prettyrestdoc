import { OpenAPIV3 } from "openapi-types";

const getSchema = (requestBodyObject: OpenAPIV3.RequestBodyObject) =>
  requestBodyObject?.content?.["application/json"]?.schema ||
  requestBodyObject?.content?.["multipart/form-data"]?.schema ||
  requestBodyObject?.content?.["*/*"]?.schema;

export default getSchema;
