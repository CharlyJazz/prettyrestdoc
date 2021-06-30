import getArrayOfEndpoints from "../adapter/getArrayOfEndpoints";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create a Array of EndpointItem for Pet", async () => {
  // Arrange
  const target = getArrayOfEndpoints;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const arrayOfEndpoints = target(
    swaggerDocResolved.result.paths,
    "pet",
    swaggerDocResolved.result
  );
  const firstEndpoint = arrayOfEndpoints[0];
  const { body_request } = firstEndpoint;
  //Assert
  expect(arrayOfEndpoints.length).toBeGreaterThanOrEqual(8);
  expect(firstEndpoint.title).toBeDefined();
  expect(firstEndpoint.description).toBeDefined();
  expect(firstEndpoint.url).toBeDefined();
  expect(firstEndpoint.method).toBeDefined();
  expect(firstEndpoint.body_response).toBeDefined();
  expect(firstEndpoint.body_response[0].status_http).toBeDefined();
  expect(firstEndpoint.body_response[0].description).toBeDefined();
  expect(firstEndpoint.body_response[0].example).toBeDefined();
  expect(body_request.id).toBeDefined();
  expect(body_request.id).toBeDefined();
  expect(body_request.category).toBeDefined();
  expect(body_request.category.id).toBeDefined();
  expect(body_request.category.name).toBeDefined();
  expect(body_request.name).toBeDefined();
  expect(body_request.photoUrls).toBeDefined();
  expect(body_request.tags).toBeDefined();
  expect(body_request.tags[0].name).toBeDefined();
  expect(body_request.tags[0].id).toBeDefined();
  expect(body_request.status).toBeDefined();
});
