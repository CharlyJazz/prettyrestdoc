import React, { FC } from "react";
import style from "../../api.module.scss";
import { text } from "../Green";
// @ts-ignore
import Highlight from "react-highlight";
import "./highlight.css";

const SnippetContent: FC<{
  content: string | object;
  title: string;
  white: boolean;
}> = ({ content, title, white }) => {
  const isString = typeof content === "string";
  return (
    <div
      className={`${style.BoxSnippet} ${white ? style.BoxSnippetWhite : ""}`}
    >
      <span>{text(title)}</span>
      {isString ? (
        <span>{text(content)}</span>
      ) : (
        <div className={style.ReactJson}>
          <Highlight className="json">
            {JSON.stringify(content, null, 2)}
          </Highlight>
        </div>
      )}
    </div>
  );
};

export default SnippetContent;
