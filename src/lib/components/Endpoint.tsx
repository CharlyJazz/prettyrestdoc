import React, { FC } from "react";
import style from "../api.module.scss";
import { CollapsablesItems } from "./CollapseItem";
import EndpointList from "./EndpointList";
import { text } from "./Green";
import SnippetContent from "./SnippetContent/SnippetContent";

export const Endpoint: FC<EndpointItem> = ({
  title,
  description,
  method,
  url,
  body_request,
  body_response,
  parameters,
}) => {
  return (
    <>
      <div>
        <h2>{title}</h2>
      </div>
      <div className={style.Flex}>
        {/* <------ LEFT ZONE */}
        <div className={style.Left}>
          <p>{text(description)}</p>
          <CollapsablesItems
            data={parameters.inBody || []}
            title="In Body"
            show_datatype={false}
          />
          <CollapsablesItems
            data={parameters.inPath || []}
            title="In Path"
            show_datatype={false}
          />
          <CollapsablesItems
            data={parameters?.inHeader || []}
            title="In Header"
            show_datatype={false}
          />
          <CollapsablesItems
            data={parameters?.inQuery || []}
            title="In Query"
            show_datatype={false}
          />
        </div>
        {/* RIGHT ZONE ------> */}
        <div className={style.Right}>
          <EndpointList {...{ method, url }} />
          {body_response &&
            body_response.length &&
            body_response.map((n) => (
              <div key={n.status_http}>
                <SnippetContent
                  white
                  content={n.example}
                  title={`${n.status_http} - ${n.description}`}
                />
                <div style={{ marginBottom: 20 }} />
              </div>
            ))}
          {/* Andrzej - There's not request object for GET and DELETE methods. The request body is only present for POST methods. */}
          {!["GET", "DELETE"].includes(method) && body_request && (
            <>
              <div style={{ marginTop: 40 }} />
              <SnippetContent white content={body_request} title={"Request"} />
            </>
          )}
        </div>
      </div>
    </>
  );
};
