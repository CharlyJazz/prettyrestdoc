import { OpenAPIV3 } from "openapi-types";
import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { SECTION_ID } from "../constants";
import {
  AdaptarOA3,
  AdaptarOA3FromFileInput,
} from "./adapter-oa3/adapter/Adapter";
import style from "./api.module.scss";
import Header from "./components/Header";
import { Navigation } from "./components/Navigation";
import { SearchModal } from "./components/SearchModal";
import Section from "./components/Section";

interface Props {
  docSwagger?: OpenAPIV3.Document;
  docCustom?: SectionItem[];
  roles?: Role[];
  fileInput?: boolean;
}

const PrettyRestDoc: FC<Props> = ({
  docCustom,
  docSwagger,
  fileInput,
  roles,
}) => {
  const [APIDoc, setAPIDOC] = useState<SectionItem[]>([]);
  const [section, setSection] = useState<string>("");
  const [searchModal, setSearchModal] = useState<boolean>(false);

  // Initialize the local doc that the repository contains (petstore.json)
  const initLocalDoc = async () => {
    if (docSwagger && docCustom) {
      const adapter = new AdaptarOA3(docSwagger, docCustom);
      const docMerged = await adapter.createDocumentation();
      setAPIDOC(docMerged);
    }
  };

  const isChromeExtensionMode =
    window.chrome && chrome.runtime && chrome.runtime.id;

  // Persitency of the navigation
  useLayoutEffect(() => {
    if (!isChromeExtensionMode) return;

    if (chrome.storage) {
      chrome.storage.local.get([SECTION_ID]).then((result) => {
        setTimeout(() => {
          const anchorElement = document.getElementById(result.SECTION_ID);
          if (anchorElement) {
            window.scrollTo(0, anchorElement.offsetTop);
          }
          setSection(result.SECTION_ID);
        }, 1000);
      });
    }
  }, []);

  useEffect(() => {
    initLocalDoc();
    document.title = "Pretty Rest Doc";

    const eventsHandlers: any = { keydown: null, keyup: null };
    let ctrl = false;

    eventsHandlers["keydown"] = document.addEventListener(
      "keydown",
      function (e) {
        if (e.which == 17) {
          ctrl = true;
        }
        if (e.which == 70 && ctrl == true) {
          e.preventDefault();
          openSearchModal();
        }
        if (e.which == 27) {
          closeSearchModal();
        }
      },
      true
    );

    eventsHandlers["keyup"] = document.addEventListener("keyup", function (e) {
      if (e.which == 17) {
        ctrl = false;
      }
    });

    return () => {
      document.removeEventListener("keydown", eventsHandlers["keydown"]);
      document.removeEventListener("keyup", eventsHandlers["keyup"]);
    };
  }, []);

  // Persitency of the navigation
  React.useEffect(() => {
    if (!isChromeExtensionMode) return;

    if (chrome.storage) {
      chrome.storage.local.set({ [SECTION_ID]: section });
    }
  }, [section]);

  const openSearchModal = () => {
    setSearchModal(true);
  };

  const closeSearchModal = () => {
    setSearchModal(false);
  };

  // Optimization of items
  // https://stackoverflow.com/questions/63531652/how-do-i-apply-react-memo-to-all-components-in-an-array
  const items = APIDoc.map((n, i) => {
    return (
      <div key={n.title}>
        <Section
          {...n}
          onIntercepted={(id) => setSection(id)}
          APIDoc={APIDoc}
          roles={Array.isArray(roles) ? roles : []}
        />
      </div>
    );
  });

  const memoizedItems = useMemo(() => {
    return items.map((item) => React.memo(() => item));
  }, [APIDoc]);

  let itemarray = [];
  let index = 0;

  for (const MemoizedItem of memoizedItems) {
    itemarray.push(<MemoizedItem key={index} />);
    index++;
  }

  const getMissingAttributes = (jsonParsed: any): string[] => {
    const requiredAttributes = [
      "openapi",
      "info",
      "info.title",
      "tags",
      "paths",
      "components",
    ];

    const missingAttributes: string[] = [];
    for (const attr of requiredAttributes) {
      const attrParts = attr.split(".");
      let currentObj = jsonParsed;
      let isValid = true;
      for (const part of attrParts) {
        if (!(part in currentObj)) {
          isValid = false;
          break;
        }
        currentObj = currentObj[part];
      }
      if (!isValid) {
        missingAttributes.push(attr);
      }
    }
    return missingAttributes;
  };

  const reason = (attr: string): string => {
    const reasons: Record<string, string> = {
      openapi: "It defines the OpenAPI version of the document.",
      info: "It provides metadata about the API.",
      "info.title": "It specifies the title of the API.",
      tags: "It categorizes API operations into groups.",
      paths: "It defines the available API endpoints.",
      components: "It holds reusable components used in the specification.",
    };
    return reasons[attr] || "Unknown reason.";
  };

  const parseOpenAPIFile = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const fileContent = event.target?.result as string;
          const jsonParsed = JSON.parse(fileContent);

          const missingAttributes = getMissingAttributes(jsonParsed);

          if (missingAttributes.length > 0) {
            const missingAttributesMsg = missingAttributes
              .map(
                (attr) =>
                  `Critical attribute: "${attr}" is not in the JSON File\nYou must add it in order to render it.\nThis value is important because: ${reason(
                    attr
                  )}.\n`
              )
              .join("\n");
            alert(missingAttributesMsg);
          } else {
            // Call AdaptarOA3 with jsonParsed
            const adapter = new AdaptarOA3FromFileInput(jsonParsed);
            const docMerged = await adapter.createDocumentation();
            setAPIDOC(docMerged);
          }
        } catch (error) {
          alert(`Error parsing JSON file.\nError:\n${error}`);
        }
      };
      reader.readAsText(file);
    } catch (error) {
      alert("Error reading file.");
    }
  };

  return (
    <>
      <Header
        openSearchModal={openSearchModal}
        fileInput={Boolean(fileInput)}
        onFileUpload={(file) => parseOpenAPIFile(file)}
      />
      <div className={style.Wrapper}>
        <SearchModal
          open={searchModal}
          closeModal={closeSearchModal}
          APIDoc={APIDoc}
        />
        <Navigation
          section={section}
          openSearchModal={openSearchModal}
          APIDoc={APIDoc}
          docCustomOriginal={docCustom || []}
        />
        <div className={style.Content}>{itemarray}</div>
      </div>
    </>
  );
};

export default PrettyRestDoc;
