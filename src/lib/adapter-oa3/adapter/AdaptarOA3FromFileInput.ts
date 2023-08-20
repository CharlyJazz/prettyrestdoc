import { OpenAPIV3 } from "openapi-types";
import { Resolver } from "@stoplight/json-ref-resolver";
import getArrayOfEndpoints from "./getArrayOfEndpoints";
import { capitalizeFirstWord } from "../../../utils/capitalize";
import { AdaptarOA3 } from "./AdaptarOA3";

const resolver = new Resolver();

class AdaptarOA3FromFileInput extends AdaptarOA3 {
  constructor(docSwagger: OpenAPIV3.Document) {
    super(docSwagger);
  }

  // Override the createDocumentation method to ignore docCustom
  async createDocumentation(): Promise<SectionItem[]> {
    const swaggerDocResolved = await resolver.resolve(this.docSwagger);
    const swaggerDocResolvedResult =
      swaggerDocResolved.result as OpenAPIV3.Document;
    const docMerged: SectionItem[] = [];

    for (const tag of swaggerDocResolvedResult.tags || []) {
      if (!tag.name) {
        console.warn(
          `There is a tag without name and we can not create the documentation without it`
        );
        continue;
      }
      const tagCapitalized = capitalizeFirstWord(tag.name);
      const newSectionItemMerged: SectionItem = {
        id: tag.name,
        title: `${tagCapitalized} endpoints`,
        content: {
          left_section_title: tagCapitalized,
          left_section_paragraphs: [
            tag.description || "",
            tag.externalDocs?.description || "",
            tag.externalDocs?.url || "",
          ],
        },
      };

      newSectionItemMerged.endpoints = getArrayOfEndpoints(
        swaggerDocResolvedResult.paths,
        tag.name,
        swaggerDocResolvedResult
      );

      docMerged.push(newSectionItemMerged);
    }
    return docMerged;
  }
}

export { AdaptarOA3FromFileInput };
