import { OpenAPIV3 } from "openapi-types";
import React from "react";
import ReactDOM from "react-dom/client";
import APIDoc from "./doc";
import "./index.css";
import PrettyRestDoc from "./lib/PrettyRestDoc";
import docSwagger from "./petstore.json";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <React.StrictMode>
      <PrettyRestDoc
        docCustom={APIDoc}
        docSwagger={docSwagger as unknown as OpenAPIV3.Document}
        roles={[
          {
            label: "Client",
            value: "client",
          },
          {
            label: "Admin",
            value: "admin",
          },
        ]}
      />
    </React.StrictMode>
  </React.StrictMode>
);
