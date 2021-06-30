import React, { FC, useEffect, useRef, useState } from "react";
import style from "../api.module.scss";

interface Results {
  name: string;
  url: string;
  id: string;
}

var ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

export const SearchModal: FC<{
  open: boolean;
  closeModal(): void;
  APIDoc: SectionItem[];
}> = ({ open, closeModal, APIDoc }) => {
  const initialValues = React.useMemo(() => {
    const newResults: Results[] = [];
    for (let I = 0; I < APIDoc.length; I++) {
      const element = APIDoc[I];
      newResults.push({
        name: element.title,
        url: element.title,
        id: ID(),
      });
    }
    return newResults;
  }, [APIDoc]);
  const refInput = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<Results[]>(initialValues);
  const [value, setValue] = useState<string>("");
  const navigateToUrl = (url: string) => {
    closeModal();
    window.location.hash = url;
    const elmnt = document.getElementById(url);
    elmnt?.scrollIntoView(true);
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
          });
        }
        if (element.items) {
          for (let j = 0; j < element.items.length; j++) {
            const sub_element = element.items[j];
            if (sub_element.title.toLowerCase().includes(value.toLowerCase())) {
              newResults.push({
                name: sub_element.title,
                url: sub_element.title,
                id: ID(),
              });
            }
          }
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
                {n.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
