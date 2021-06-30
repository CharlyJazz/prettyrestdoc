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
    <span>{url}</span>
  </div>
);

const EndpointList: FC<{
  endpoints?: EndpointItem[];
  method?: HTTP_METHOD;
  url?: string;
}> = ({ endpoints, url, method }) => {
  const listMode = endpoints && endpoints.length;
  return (
    <div className={style.EndpointList}>
      <div>
        <span>{listMode ? "ENDPOINTS" : "ENDPOINT"}</span>
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
