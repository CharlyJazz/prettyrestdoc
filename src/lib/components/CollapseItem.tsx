import React, { FC, useState } from "react";
import style from "../api.module.scss";
import { text } from "./Green";
// @ts-ignore
import { Collapse } from "react-collapse";

const Icon: FC<{ open: boolean }> = ({ open }) => {
  return (
    <svg
      width="12"
      height="7"
      viewBox="0 0 12 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${open ? 0 : -91}deg)`,
        transition: ".2s all",
      }}
    >
      <path
        d="M1 1L6 6L11 1"
        stroke="url(#paint0_linear)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="1"
          y1="2.93317"
          x2="10.9994"
          y2="3.01053"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#12EEF9" />
          <stop offset="0.296354" stopColor="#89BFFD" />
          <stop offset="0.654687" stopColor="#C275E5" />
          <stop offset="1" stopColor="#FC7971" />
        </linearGradient>
      </defs>
    </svg>
  );
};

interface Props extends SchemaItem {
  show_datatype?: boolean;
}

const ShowChildParametersButton: FC<{ children: React.ReactElement }> = ({
  children,
}) => {
  const [showing, setShowing] = useState<boolean>(true);

  if (showing) {
    return (
      <button
        className={style.ShowChildParametersButton}
        onClick={() => setShowing(!showing)}
      >
        <span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.6568 8.11081C18.1449 7.62266 18.1449 6.8312 17.6568 6.34305C17.1686 5.85489 16.3772 5.85489 15.889 6.34304L11.8232 10.4089L7.93418 6.51987C7.44602 6.03171 6.65456 6.03171 6.16641 6.51987C5.67825 7.00803 5.67825 7.79948 6.16641 8.28764L10.0554 12.1766L6.34306 15.889C5.8549 16.3771 5.8549 17.1686 6.34306 17.6568C6.83121 18.1449 7.62267 18.1449 8.11082 17.6568L11.8232 13.9444L15.7124 17.8336C16.2005 18.3217 16.992 18.3217 17.4801 17.8336C17.9683 17.3454 17.9683 16.554 17.4801 16.0658L13.5909 12.1766L17.6568 8.11081Z"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="7.62572"
                y1="5.06055"
                x2="18.8955"
                y2="16.4179"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#12EEF9" />
                <stop offset="0.296354" stopColor="#89BFFD" />
                <stop offset="0.654687" stopColor="#C275E5" />
                <stop offset="1" stopColor="#FC7971" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span>Show child parameteres</span>
      </button>
    );
  } else {
    return (
      <div>
        <div>
          <button
            className={style.ShowChildParametersButton}
            onClick={() => setShowing(!showing)}
          >
            <span>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.6568 8.11081C18.1449 7.62266 18.1449 6.8312 17.6568 6.34305C17.1686 5.85489 16.3772 5.85489 15.889 6.34304L11.8232 10.4089L7.93418 6.51987C7.44602 6.03171 6.65456 6.03171 6.16641 6.51987C5.67825 7.00803 5.67825 7.79948 6.16641 8.28764L10.0554 12.1766L6.34306 15.889C5.8549 16.3771 5.8549 17.1686 6.34306 17.6568C6.83121 18.1449 7.62267 18.1449 8.11082 17.6568L11.8232 13.9444L15.7124 17.8336C16.2005 18.3217 16.992 18.3217 17.4801 17.8336C17.9683 17.3454 17.9683 16.554 17.4801 16.0658L13.5909 12.1766L17.6568 8.11081Z"
                  fill="url(#paint0_linear)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="7.62572"
                    y1="5.06055"
                    x2="18.8955"
                    y2="16.4179"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#12EEF9" />
                    <stop offset="0.296354" stopColor="#89BFFD" />
                    <stop offset="0.654687" stopColor="#C275E5" />
                    <stop offset="1" stopColor="#FC7971" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <span>Hide child parameteres</span>
          </button>
        </div>
        {children}
      </div>
    );
  }
};

export const CollapsableItem: FC<Props> = ({
  name,
  description,
  options,
  paragraphs,
  required,
  data_type,
  show_datatype,
  attributes,
}) => {
  const [open, toggle] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => toggle(!open)} className={style.ButtonCollapse}>
        <div className={style.CollapsablesItemsName}>
          <div>
            <Icon {...{ open }} />
          </div>
          <div>
            <span>
              {name}
              <span className={style.CollapsablesItemsNameLight}>
                {show_datatype ? data_type : required ? "required" : "optional"}
              </span>
            </span>
          </div>
        </div>
      </button>
      <Collapse isOpened={open}>
        <span className={style.CollapsablesItemsDescription}>
          <span>{text(description)}</span>
          {paragraphs?.length && (
            <ul>
              {paragraphs?.map((n, i) => (
                <li key={i} className={style.ListType}>
                  {text(n)}
                </li>
              ))}
            </ul>
          )}
          {options?.length && (
            <ul>
              {options?.map(({ description, name }, i) => (
                <li key={i} className={style.ListType}>
                  {text(name)} {text(description)}
                </li>
              ))}
            </ul>
          )}
        </span>
        {Array.isArray(attributes) && attributes.length ? (
          <ShowChildParametersButton>
            <CollapsablesItems
              data={attributes}
              title={""}
              show_datatype={show_datatype || false}
              is_child
            />
          </ShowChildParametersButton>
        ) : null}
      </Collapse>
    </>
  );
};

const CollapsablesItems: FC<{
  data: SchemaItem[];
  title: string;
  show_datatype: boolean;
  is_child?: boolean;
}> = ({ data, title, show_datatype, is_child }) => {
  if (!data || !data?.length) {
    return <div />;
  }
  return (
    <div
      className={
        is_child ? style.CollapsablesItemsChild : style.CollapsablesItems
      }
    >
      <h4>{text(title)}</h4>
      {data.map((prop) => (
        <CollapsableItem key={prop.name} {...prop} {...{ show_datatype }} />
      ))}
    </div>
  );
};

CollapsablesItems.defaultProps = {
  show_datatype: true,
};

export { CollapsablesItems };
