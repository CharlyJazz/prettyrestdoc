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
}> = ({ endpoints, url, method, title }) => {
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
    </div>
  );
};

export default EndpointList;
