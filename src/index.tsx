import React from 'react';
import ReactDOM from 'react-dom';
import PrettyRestDoc from './lib/PrettyRestDoc';
import docSwagger from "./petstore.json";
import APIDoc from "./doc";
import { OpenAPIV3 } from "openapi-types";
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <PrettyRestDoc
     docCustom={APIDoc}
      docSwagger={docSwagger as unknown as OpenAPIV3.Document}
      roles={[
        {
        label: "Client",
        value: 'client'
      },
      {
        label: "Admin",
        value: 'admin'
      }]}
      />
  </React.StrictMode>,
  document.getElementById('root')
);  
