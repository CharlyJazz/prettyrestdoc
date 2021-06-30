import getObjectExample from "../adapter/getObjectExample";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create a ObjectExample for Pet", async () => {
  // Arrange
  const target = getObjectExample;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const objectExample = target(swaggerDocResolved.result, "Pet");
  //Assert
  expect(objectExample.id).toBeDefined();
  expect(objectExample.category).toBeDefined();
  expect(objectExample.category.id).toBeDefined();
  expect(objectExample.category.name).toBeDefined();
  expect(objectExample.name).toBeDefined();
  expect(objectExample.photoUrls).toBeDefined();
  expect(objectExample.tags).toBeDefined();
  expect(objectExample.tags[0].name).toBeDefined();
  expect(objectExample.tags[0].id).toBeDefined();
  expect(objectExample.status).toBeDefined();
});
