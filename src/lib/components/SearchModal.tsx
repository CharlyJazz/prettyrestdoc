import React, { FC, useEffect, useRef, useState } from "react";
import style from "../api.module.scss";

interface Results {
  name: string;
  url: string;
  id: string;
  type_result: ResultType;
}

enum ResultType {
  Title = "Title",
  Description = "Description",
  UrlEndpoint = "UrlEndpoint",
  TitleEndpoint = "TitleEndpoint",
  DescriptionEndpoint = "DescriptionEndpoint"
}

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const resultTypeLabelStyles: { [key in ResultType]: { backgroundColor: string; color: string } } = {
  [ResultType.Title]: { backgroundColor: "#FFCCCB", color: "#000" }, // Pastel red
  [ResultType.Description]: { backgroundColor: "#FFDAB9", color: "#000" }, // Pastel peach
  [ResultType.UrlEndpoint]: { backgroundColor: "#E0FFFF", color: "#000" }, // Pastel cyan
  [ResultType.TitleEndpoint]: { backgroundColor: "#B0E57C", color: "#000" }, // Pastel green
  [ResultType.DescriptionEndpoint]: { backgroundColor: "#FFB6C1", color: "#000" } // Pastel pink
};

export const SearchModal: FC<{
  open: boolean;
  closeModal(): void;
  APIDoc: SectionItem[];
  setSection(title: string): void;
}> = ({ open, closeModal, APIDoc, setSection }) => {
  const initialValues = React.useMemo(() => {
    const newResults: Results[] = [];
    for (let I = 0; I < APIDoc.length; I++) {
      const element = APIDoc[I];
      newResults.push({
        name: element.title,
        url: element.title,
        id: ID(),
        type_result: ResultType.Title,
      });
    }
    return newResults;
  }, [APIDoc]);

  const refInput = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Results[]>(initialValues);
  const [value, setValue] = useState<string>("");

  const navigateToUrl = (title: string) => {
    closeModal();
    const element = document.querySelector(`[data-uri="${title}"]`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setSection(title);
      }, 1000);
    }
  };

  useEffect(() => {
    if (open) {
      refInput.current?.focus();
      setResults(initialValues);
    }
  }, [open]);

  useEffect(() => {
    if (value.length && value.trim().length) {
      const newResults: Results[] = [];
      for (let I = 0; I < APIDoc.length; I++) {
        const element = APIDoc[I];
        if (element.title.toLowerCase().includes(value.toLowerCase())) {
          newResults.push({
            name: element.title,
            url: element.title,
            id: ID(),
            type_result: ResultType.Title,
          });
        }
        if (element.content) {
          element.content.left_section_paragraphs.forEach((paragraph) => {
            if (paragraph.toLowerCase().includes(value.toLowerCase())) {
              newResults.push({
                name: paragraph,
                url: element.title,
                id: ID(),
                type_result: ResultType.Description,
              });
            }
          });
        }
        if (element.endpoints && element.endpoints.length) {
          element.endpoints.forEach((endpoint) => {
            if (endpoint.title.toLowerCase().includes(value.toLowerCase())) {
              newResults.push({
                name: endpoint.title,
                url: element.title,
                id: ID(),
                type_result: ResultType.TitleEndpoint,
              });
            } else if (endpoint.description.toLowerCase().includes(value.toLowerCase())) {
              newResults.push({
                name: endpoint.description,
                url: element.title,
                id: ID(),
                type_result: ResultType.DescriptionEndpoint,
              });
            } else if (endpoint.url.toLowerCase().includes(value.toLowerCase())) {
              newResults.push({
                name: endpoint.url,
                url: element.title,
                id: ID(),
                type_result: ResultType.UrlEndpoint,
              });
            }
          });
        }
      }
      setResults(newResults);
    } else {
      setResults(initialValues);
    }
  }, [value]);

  return (
    <div
      className={style.SearchModalBackground}
      tabIndex={1}
      onKeyDown={closeModal}
      onClick={closeModal}
      style={{
        display: open ? "flex" : "none",
      }}
    >
      <div
        className={style.SearchModalContentContainer}
        onKeyDown={(n) => {
          n.stopPropagation();
        }}
        onClick={(n) => {
          n.stopPropagation();
        }}
      >
        <div className={style.SearchModalContent}>
          <label className={style.SearchBarLabel} htmlFor="SearchBar-input">
            <div className={style.SearchBarIcon}>
              <div>
                <svg
                  style={{ width: 16, height: 16 }}
                  height="16"
                  viewBox="0 0 16 16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.6 11.2c.037.028.073.059.107.093l3 3a1 1 0 1 1-1.414 1.414l-3-3a1.009 1.009 0 0 1-.093-.107 7 7 0 1 1 1.4-1.4zM7 12A5 5 0 1 0 7 2a5 5 0 0 0 0 10z"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
            <input
              id="SearchBar-input"
              type="search"
              placeholder="Go to…"
              autoComplete="off"
              className={style.SearchBarInput}
              value={value}
              onChange={(n) => setValue(n.target.value)}
              ref={refInput}
            />
          </label>
        </div>
        <div className={style.SearchModalListContainer}>
          {results.map((n) => {
            return (
              <button
                className={style.ResultsItem}
                onClick={() => navigateToUrl(n.url)}
                key={n.id}
              >
                <span
                  style={{
                    ...resultTypeLabelStyles[n.type_result],
                    padding: "2px 5px",
                    borderRadius: "3px",
                    fontSize: "9px",
                    fontFamily: "Roboto, sans-serif",
                    marginRight: "8px",
                    minWidth: "30px",
                    display: "inline-block",
                  }}
                >
                  {n.type_result}
                </span>
                {n.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
