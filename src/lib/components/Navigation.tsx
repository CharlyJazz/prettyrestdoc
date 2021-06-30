import style from "../api.module.scss";
import React, { FC } from "react";

export const Navigation: FC<{
  section: string;
  openSearchModal(): void;
  APIDoc: SectionItem[];
  docCustomOriginal: SectionItem[]
}> = ({ section, openSearchModal, APIDoc, docCustomOriginal }) => {
  const indexFirstCore = docCustomOriginal.findIndex((value) => {
    return value.is_core_resource;
  });
  return (
    <div className={style.Navigation}>
      <h1 className={style.Title}>
        <span>Pretty Rest Doc</span>
      </h1>
      <div
        className={style.Search}
        tabIndex={1}
        onKeyDown={openSearchModal}
        onClick={openSearchModal}
      >
        <button>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8563 15.1624L11.2009 10.5067C13.3455 8.00481 13.2318 4.22153 10.8606 1.85767C9.65925 0.659933 8.06302 0 6.36607 0C4.66147 0 3.06013 0.664646 1.85658 1.87181C0.656174 3.07563 -0.00332514 4.67589 1.26075e-05 6.37707C0.00315401 8.07825 0.668347 9.67595 1.87268 10.8755C3.07329 12.074 4.66912 12.7339 6.36607 12.7339C7.90261 12.7339 9.35414 12.192 10.5072 11.201L15.1622 15.8563C15.258 15.9521 15.3837 16 15.5093 16C15.635 16 15.7604 15.9521 15.8565 15.8563C16.0479 15.6648 16.0479 15.3542 15.8563 15.1624ZM2.56576 10.1804C1.54696 9.16563 0.984058 7.81415 0.981702 6.3753C0.978953 4.93644 1.53655 3.583 2.55182 2.56492C3.56983 1.5441 4.92417 0.981752 6.36607 0.981752C7.8013 0.981752 9.15132 1.53978 10.1676 2.55295C12.2699 4.64918 12.2756 8.06529 10.1805 10.1684C9.16251 11.1896 7.80778 11.7522 6.36587 11.7522C4.93104 11.7524 3.58161 11.1943 2.56576 10.1804Z"
              fill="#333333"
            />
          </svg>
        </button>
        <input type="text" placeholder="Search for ..." disabled />
      </div>
      <div className={style.Links}>
        {APIDoc.map((n, i) => {
          return (
            <div key={n.title}>
              {indexFirstCore === i && (
                <div className={style.NavigationCoreWord}>Core Resources</div>
              )}
              <a
                className={
                  section === n.title ? style.NavigationItemActive : ""
                }
                href={`#${n.title}`}
              >
                {n.title}
              </a>
              {"items" in n &&
                n.items?.length &&
                n.items.map((n) => {
                  return (
                    <a
                      key={n.title}
                      className={
                        section === n.title ? style.NavigationItemActive : ""
                      }
                      href={`#${n.title}`}
                    >
                      - {n.title}
                    </a>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
};
