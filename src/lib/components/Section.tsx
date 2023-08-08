import React, { FC, useEffect, useRef } from "react";
import { text } from "./Green";
import SnippetContent from "./SnippetContent/SnippetContent";
import style from "../api.module.scss";
import EndpointList from "./EndpointList";
import { Endpoint } from "./Endpoint";
import useOnScreen from "../hooks/useOnScreen";
import RolesAndPermissionsGrid from "./RolesAndPermissionsGrid";
import { CollapsablesItems } from "./CollapseItem";

interface SectionProps extends SectionItem {
  endpointMode?: boolean;
  APIDoc: SectionItem[];
  roles?: Role[];
  onIntercepted(id: string): void;
}

const Section: FC<SectionProps> = ({
  title,
  content,
  endpoints,
  items,
  object_example,
  object_schema,
  APIDoc,
  roles,
  onIntercepted,
}) => {
  let endpointsTags = null;
  let informativeRightBox = null;
  let informativeRightSnippet = null;
  let theObjectSection = null;
  let paragraphsDescription = null;
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreen(ref);
  useEffect(() => {
    if (onScreen) {
      console.log(title);
      onIntercepted(title);
    }
  }, [onScreen]);
  if (
    content &&
    content?.left_section_paragraphs &&
    content?.left_section_paragraphs.length
  ) {
    paragraphsDescription = content?.left_section_paragraphs.map((n) => {
      return <p key={n}>{text(n)}</p>;
    });
  }
  if (object_example) {
    theObjectSection = (
      <div>
        <h4 className={style.SubTitle}>The {title} Object</h4>
      </div>
    );
  }
  if (content?.right_box_snippet_title || object_example) {
    informativeRightSnippet = (
      <SnippetContent
        title={content?.right_box_snippet_title || ""}
        content={content?.right_box_snippet_content || object_example || ""}
        white={content?.right_box_snippet_white || false}
      />
    );
  }
  if (content?.right_section_title) {
    informativeRightBox = content?.right_section_title && (
      <div>
        <h3>{content?.right_section_title}</h3>
        {content?.right_section_paragraphs?.map((n, i) => {
          return <p key={i}>{text(n)}</p>;
        })}
      </div>
    );
  }
  if (endpoints && endpoints.length) {
    endpointsTags = <EndpointList endpoints={endpoints} />;
  }
  return (
    <>
      <div ref={ref} id={title}>
        <div>
          <h2>{text(content?.left_section_title || "")}</h2>
        </div>
        <div className={style.Flex}>
          {/* <------ LEFT ZONE */}
          <div className={style.Left}>
            {paragraphsDescription}
            {theObjectSection}
            {title === "Pagination & Limits" ? (
              <>
                <CollapsablesItems
                  data={content?.parameters || []}
                  title="Parameters"
                  show_datatype={false}
                />
                <CollapsablesItems
                  data={content?.returns || []}
                  title="Returns"
                  show_datatype={false}
                />
              </>
            ) : (
              <CollapsablesItems
                data={object_schema || []}
                title="Attributes"
                show_datatype={true}
              />
            )}
          </div>
          {/* RIGHT ZONE ------> */}
          <div className={style.Right}>
            {endpointsTags}
            {informativeRightBox}
            {informativeRightSnippet}
          </div>
        </div>
        {endpoints && endpoints?.length ? (
          <div>
            {endpoints.map((endpoint, i) => {
              return (
                <div className={style.EndpointWrapper} key={i}>
                  <Endpoint {...endpoint} />
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      {items && items?.length ? (
        <div>
          {items?.map((n, i) => {
            return (
              <div className={style.EndpointWrapper} key={i}>
                <Section {...n} {...{ onIntercepted }} APIDoc={APIDoc} />
              </div>
            );
          })}
        </div>
      ) : null}
      {title === "Roles & Permissions" && roles && (
        <RolesAndPermissionsGrid APIDoc={APIDoc} roles={roles} />
      )}
    </>
  );
};

export default Section;
