import getBodyResponseExample from "../adapter/getBodyResponseExample";
import swaggerDoc from "./swagger-oa3-for-testing.json";
import { Resolver } from "@stoplight/json-ref-resolver";

const resolver = new Resolver();

test("Create a Body Request Example for Pet", async () => {
  // Arrange
  const target = getBodyResponseExample;
  const swaggerDocResolved = await resolver.resolve(swaggerDoc);
  // Act
  const bodyRequest = target(
    swaggerDocResolved.result.paths["/store/order/{orderId}"].get.responses,
    swaggerDocResolved.result
  );
  //Assert
  expect(bodyRequest[0].example.id).toBeDefined();
  expect(bodyRequest[0].example.petId).toBeDefined();
  expect(bodyRequest[0].example.quantity).toBeDefined();
  expect(bodyRequest[0].example.shipDate).toBeDefined();
  expect(bodyRequest[0].example.status).toBeDefined();
});
