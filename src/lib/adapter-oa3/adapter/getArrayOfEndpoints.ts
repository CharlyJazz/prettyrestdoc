import { OpenAPIV3 } from "openapi-types";
import getBodyRequestExample from "./getBodyRequestExample";
import getBodyResponseExample from "./getBodyResponseExample";
import getParameters from "./getParameters";

const getArrayOfEndpoints = (
  pathsObject: OpenAPIV3.PathsObject,
  tag: string,
  doc: OpenAPIV3.Document
): EndpointItem[] => {
  const arrayOfEndpoints: EndpointItem[] = [];
  Object.entries(pathsObject).forEach((n) => {
    // @ts-ignore
    Object.entries(n[1]).forEach((k) => {
      const url = n[0] as string;
      const http_method = k[0] as string;
      const content_http_method = k[1] as OpenAPIV3.OperationObject;
      if (content_http_method.tags?.includes(tag)) {
        const method = http_method.toUpperCase() as HTTP_METHOD;
        const new_endpoint_to_add: EndpointItem = {
          title: content_http_method.summary || "",
          description: content_http_method.description || "",
          url: url,
          method,
          // @ts-ignore
          roles: content_http_method.roles,
          // @ts-ignore
          body_request: getBodyRequestExample(
            content_http_method.requestBody || {}
          ),
          // @ts-ignore
          body_response: getBodyResponseExample(
            content_http_method.responses,
            doc
          ),
          parameters: getParameters(
            content_http_method.parameters as
            | OpenAPIV3.ParameterObject[]
            | undefined,
            method,
            content_http_method?.requestBody as OpenAPIV3.RequestBodyObject
          ),
        };
        arrayOfEndpoints.push(new_endpoint_to_add);
      }
    });
  });
  return arrayOfEndpoints;
};

export default getArrayOfEndpoints;
