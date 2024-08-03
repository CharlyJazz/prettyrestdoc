import { FC, useState } from "react";
import style from "../api.module.scss";
import { CollapsablesItems } from "./CollapseItem";
import EndpointList from "./EndpointList";
import { text } from "./Green";
import SnippetContent from "./SnippetContent/SnippetContent";
// @ts-ignore
import { Collapse } from "react-collapse";

export const Endpoint: FC<EndpointItem> = ({
  title,
  description,
  method,
  url,
  body_request,
  body_response,
  parameters,
}) => {
  const [open, toggle] = useState<boolean>(false);
  return (
    <>
      <>
        <button onClick={() => toggle(!open)} className={[
          style.ButtonCollapse, 
          open ? style.ButtonCollapseOpen : ''
        ].join(" ")}>
          <EndpointList {...{ method, url, title }} />
        </button>
      </>
      <Collapse isOpened={open}>
        <div className={style.Flex}>

          {/* <------ LEFT ZONE */}
          <div className={[
            style.Left,
            style.EndpointListSection,
            open ? style.LeftOpen : style.LeftClose
          ].join(" ")}>
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
            {body_response &&
              body_response.length &&
              body_response.map((n) => (
                <div key={n.status_http}>
                  <SnippetContent
                    white
                    content={n.example}
                    title={`${n.status_http} - ${n.description}`}
                  />
                </div>
              ))}
            {!["GET", "DELETE"].includes(method) && body_request && (
              <>
                <div style={{ marginTop: 40 }} />
                <SnippetContent white content={body_request} title={"Request"} />
              </>
            )}
          </div>
        </div>
        <div style={{ marginBottom: 20 }} />
      </Collapse>
    </>
  );
};
