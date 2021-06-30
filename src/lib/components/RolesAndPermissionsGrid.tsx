import React, { FC, useMemo } from "react";
import style from "../api.module.scss";

/*
  Create array of arrays, grouped per section
*/
const RolesAndPermissionsGrid: FC<{ APIDoc: SectionItem[], roles?: Role[] }> = ({ APIDoc, roles }) => {
  const arrayRoleNames = roles?.map(n=> n.label) || []
  const cols = [
    { accessor: "title", name: "Resource" },
    { accessor: "method", name: "Action" },
    { accessor: "url", name: "Path" },
    ...roles?.map(n => ({accessor: n.value, name: n.label})) || []
  ];
  const Endpoints: EndpointItem[][] = useMemo(() => {
    return APIDoc.filter((n) => n.endpoints?.length).reduce((p, c) => {
      if (c.items?.length) {
        const items =
          c.items.filter((n) => n.endpoints?.length).map((n) => n.endpoints) ||
          [];
        // @ts-ignore
        return p.concat([...items, c.endpoints]);
      }
      // @ts-ignore
      return p.concat([c.endpoints]);
    }, []);
  }, [APIDoc]);
  return (
    <div className={style.RolesAndPermissionsGrid}>
      <div className={style.RolesAndPermissionsGridColHeaderWrapper}>
        {cols.map((n) => (
          <div key={n.name}>{n.name}</div>
        ))}
      </div>
      {Endpoints.map((groupOfMethods, i) => (
        <div className={style.RolesAndPermissionsGridRow} key={i}>
          {groupOfMethods.map((m, i) => (
            <div key={i}>
              {cols.map((n, i) => {
                if (arrayRoleNames.includes(n.name)) {
                  return (
                    <div key={i}>
                      <div
                        className={
                          m?.roles?.includes(n.accessor)
                            ? style.RolesAndPermissionsCircle
                            : style.RolesAndPermissionsCircleGrey
                        }
                      />
                    </div>
                  );
                }
                return (
                  // @ts-ignore
                  <div key={i}>{m[n.accessor]}</div>
                );
              })}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RolesAndPermissionsGrid;
