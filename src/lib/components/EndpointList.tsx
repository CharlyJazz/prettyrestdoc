import React, { FC } from "react";
import style from "../api.module.scss";

const EndpointItem: FC<{ method?: HTTP_METHOD; url?: string }> = ({
  method,
  url,
}) => (
  <div>
    <span
      className={`${style.HTTPMethod} ${style[method?.toUpperCase() || "GET"]}`}
    >
      {method}
    </span>
    <span className={style.EndpointURL}>{url}</span>
  </div>
);

const EndpointList: FC<{
  endpoints?: EndpointItem[];
  method?: HTTP_METHOD;
  url?: string;
  title?: string;
  description?: string;
}> = ({ endpoints, url, method, title, description }) => {
  const listMode = endpoints && endpoints.length;
  return (
    <div className={style.EndpointList}>
      <div>
        <span>
          {title}
        </span>
      </div>
      <div>
        {listMode ? (
          endpoints?.map((n, i) => <EndpointItem {...n} key={i} />)
        ) : (
          <EndpointItem {...{ url, method }} />
        )}
      </div>
      <p className={style.EndpointDescription}>{description}</p>
    </div>
  );
};

export default EndpointList;
