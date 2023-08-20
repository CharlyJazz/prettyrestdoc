// @ts-nocheck
import { OpenAPIV3 } from "openapi-types";
import getBodyRequestExample from "./getBodyRequestExample";

const getBodyResponseExample: BodyResponse[] = (
  responsesObject: OpenAPIV3.ResponsesObject,
  doc: OpenAPIV3.Document
) => {
  const bodyResponse: BodyResponse[] = [];
  Object.entries(responsesObject).forEach(
    ([status_http, { content, description }]) => {
      if (description === "An unexpected error response.") {
        const forTest = getBodyRequestExample({ content }, doc);
        console.log(forTest);
      }
      bodyResponse.push({
        status_http,
        description,
        example: getBodyRequestExample({ content }, doc),
      });
    }
  );
  return bodyResponse;
};

export default getBodyResponseExample;
