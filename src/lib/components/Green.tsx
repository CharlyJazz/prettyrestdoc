import React, { FC } from "react";
import style from "../api.module.scss";

const Green: FC<{ children: React.ElementType }> = ({ children }) => (
  <span className={style.Green}>{children}</span>
);

export const text = (text: any) => {
  if (!text.length) return text;

  let parts = text.split(new RegExp(/\[(.*?)\]/));

  for (let i = 1; i < parts.length; i += 2) {
    parts[i] = <Green key={i}>{parts[i]}</Green>;
  }

  return parts;
};
