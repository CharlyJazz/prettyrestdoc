import getBodyRequestExample from "../adapter/getBodyRequestExample";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create a Body Request Example for Pet", async () => {
  // Arrange
  const target = getBodyRequestExample;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const bodyRequest = target(
    swaggerDocResolved.result.paths["/pet"].post.requestBody
  );
  //Assert
  expect(bodyRequest.id).toBeDefined();
  expect(bodyRequest.category).toBeDefined();
  expect(bodyRequest.category.id).toBeDefined();
  expect(bodyRequest.category.name).toBeDefined();
  expect(bodyRequest.name).toBeDefined();
  expect(bodyRequest.photoUrls).toBeDefined();
  expect(bodyRequest.tags).toBeDefined();
  expect(bodyRequest.tags[0].name).toBeDefined();
  expect(bodyRequest.tags[0].id).toBeDefined();
  expect(bodyRequest.status).toBeDefined();
});

test("Create a Body Request Example for User Creation", async () => {
  // Arrange
  const target = getBodyRequestExample;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const bodyRequest = target(
    swaggerDocResolved.result.paths["/user"].post.requestBody,
    swaggerDocResolved.result
  );
  //Assert
  expect(bodyRequest.id).toBeDefined();
  expect(bodyRequest.email).toBeDefined();
  expect(bodyRequest.firstName).toBeDefined();
  expect(bodyRequest.lastName).toBeDefined();
  expect(bodyRequest.password).toBeDefined();
  expect(bodyRequest.username).toBeDefined();
});

test("Create a Body Request Example for User Creation with Array", async () => {
  // Arrange
  const target = getBodyRequestExample;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const bodyRequest = target(
    swaggerDocResolved.result.paths["/user/createWithArray"].post.requestBody,
    swaggerDocResolved.result
  );
  //Assert
  expect(bodyRequest.id).toBeDefined();
  expect(bodyRequest.email).toBeDefined();
  expect(bodyRequest.firstName).toBeDefined();
  expect(bodyRequest.lastName).toBeDefined();
  expect(bodyRequest.password).toBeDefined();
  expect(bodyRequest.username).toBeDefined();
});
