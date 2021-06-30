import { OpenAPIV3 } from "openapi-types";
import { Resolver } from "@stoplight/json-ref-resolver";
import getObjectSchema from "./getObjectSchema";
import getObjectExample from "./getObjectExample";
import getArrayOfEndpoints from "./getArrayOfEndpoints";

const resolver = new Resolver();

class AdaptarOA3 {
  private docSwagger: OpenAPIV3.Document;
  private docCustom: SectionItem[];
  constructor(
    // @ts-ignore
    docSwagger: OpenAPIV3.Document,
    docCustom: SectionItem[]
  ) {
    this.docSwagger = docSwagger;
    this.docCustom = docCustom;
  }

  async createDocumentation(): Promise<SectionItem[]> {
    const swaggerDocResolved = await resolver.resolve(this.docSwagger);
    const docMerged: SectionItem[] = [];
    for (let i = 0; i < this.docCustom.length; i++) {
      const sectionItem = this.docCustom[i];
      const newSectionItemMerged: SectionItem = { ...sectionItem };
      if (sectionItem.is_core_resource) {
        if (sectionItem.schema) {
          const schemaOfSection = this.docSwagger.components?.schemas?.[
            sectionItem.schema
          ];
          if (schemaOfSection) {
            const objectSchema = getObjectSchema(
              swaggerDocResolved.result,
              sectionItem.schema
            );
            // console.log(sectionItem.title, objectSchema);
            newSectionItemMerged.object_schema = objectSchema;
            const objectExample = getObjectExample(
              swaggerDocResolved.result,
              sectionItem.schema
            );
            newSectionItemMerged.object_example = objectExample;
          } else {
            console.warn(`
The documentation section
${sectionItem.title}
Don't have the correct OA3 Schema in components attribute.
Please add the correct Schema called: ${sectionItem.schema}
          `);
          }
        }
        if (sectionItem.tag) {
          newSectionItemMerged.endpoints = getArrayOfEndpoints(
            swaggerDocResolved.result.paths,
            sectionItem.tag,
            swaggerDocResolved.result
          );
        }
      }
      docMerged.push(newSectionItemMerged);
    }
    return docMerged;
  }
}

export default AdaptarOA3;
