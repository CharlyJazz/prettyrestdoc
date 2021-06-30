import getObjectSchema from "../adapter/getObjectSchema";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create a ObjectSchema for Pet", async () => {
  // Arrange
  const target = getObjectSchema;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const objectSchema = target(swaggerDocResolved.result, "Pet");
  //Assert
  expect(objectSchema[0].name).toBeDefined();
  expect(objectSchema[0].description).toBeDefined();
  expect(objectSchema[5].data_type).toEqual("enum");
  expect(objectSchema[5].options[0].name).toBeDefined();
  expect(objectSchema[5].options[0].description).toBeDefined();
  expect(objectSchema[2].required).toBeTruthy();
  expect(objectSchema[3].required).toBeTruthy();
  expect(objectSchema[4].required).toBeFalsy();
});
