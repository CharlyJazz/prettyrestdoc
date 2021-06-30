import getParameters from "../adapter/getParameters";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create Parameters for Pet", async () => {
  // Arrange
  const target = getParameters;
  // requestBodies Pet es anidado;
  const swaggerDocResolved = (await resolver.resolve(swaggerDoc)).result;
  // Act
  const parameters = target(
    swaggerDocResolved.paths["/pet"].post.parameters,
    "POST",
    swaggerDocResolved.paths["/pet"].post.requestBody
  );
  // Assert
  expect(parameters.inBody).toBeDefined();
  expect(parameters.inHeader).toBeDefined();
  expect(parameters.inPath).toBeDefined();
  expect(parameters.inQuery).toBeDefined();
  expect(parameters.inBody).toHaveLength(6);
  expect(parameters.inHeader).toHaveLength(0);
  expect(parameters.inPath).toHaveLength(0);
  expect(parameters.inQuery).toHaveLength(0);
  expect(parameters.inBody[1].name).toEqual("category");
  expect(parameters.inBody[1].data_type).toEqual("object");
  expect(parameters.inBody[1].attributes).toBeInstanceOf(Array);
  expect(parameters.inBody[1].attributes).toHaveLength(2);
  expect(parameters.inBody[5].attributes).toBeUndefined();
  expect(parameters.inBody[5].options).toBeDefined();
  expect(parameters.inBody[5].options).toHaveLength(3);
  expect(parameters.inBody[3].required).toBeTruthy();
  // Because we need the attributes wrapped in the properties attribute
  expect(parameters.inBody[3].attributes).toHaveLength(0);
});
