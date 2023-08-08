import React, { FC, useEffect, useMemo, useState } from "react";
import style from "./api.module.scss";
import Section from "./components/Section";
import { Navigation } from "./components/Navigation";
import { SearchModal } from "./components/SearchModal";
import Header from "./components/Header";
import AdaptarOA3 from "./adapter-oa3/adapter/Adapter";
import { OpenAPIV3 } from "openapi-types";
import { SECTION_ID } from "../constants";

interface Props {
  docSwagger: OpenAPIV3.Document;
  docCustom: SectionItem[];
  roles?: Role[];
}

const PrettyRestDoc: FC<Props> = ({ docCustom, docSwagger, roles }) => {
  const [APIDoc, setAPIDOC] = useState<SectionItem[]>([]);
  const [section, setSection] = useState<string>("");
  const [searchModal, setSearchModal] = useState<boolean>(false);

  const initDoc = async () => {
    const adapter = new AdaptarOA3(docSwagger, docCustom);
    const docMerged = await adapter.createDocumentation();
    setAPIDOC(docMerged);
  };

  useEffect(() => {
    initDoc();
    document.title = "Pretty Rest Doc";

    // Persitency of the navigation
    if (chrome.storage) {
      chrome.storage.local.get([SECTION_ID]).then((result) => {
        setSection(result.SECTION_ID);
        location.href = "#" + result.SECTION_ID;
      });
    } else {
      const sectionSaved = localStorage.getItem(SECTION_ID);
      if (sectionSaved) {
        setSection(sectionSaved);
        location.href = "#" + sectionSaved;
      }
    }

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
    if (chrome.storage) {
      chrome.storage.local.set({ [SECTION_ID]: section });
    } else {
      localStorage.setItem(SECTION_ID, section);
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
      <div key={i}>
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

  return (
    <>
      <Header openSearchModal={openSearchModal} />
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
          docCustomOriginal={docCustom}
        />
        <div className={style.Content}>{itemarray}</div>
      </div>
    </>
  );
};

export default PrettyRestDoc;
