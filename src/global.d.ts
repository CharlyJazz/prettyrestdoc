/*
  Types and Interfaces for the API Documentation
*/

type HTTP_METHOD = "POST" | "PATCH" | "GET" | "OPTION" | "PUT" | "DELETE";

type RawExample = object;

interface BodyResponse {
  status_http: number;
  description?: string;
  example: RawExample;
}

interface NameAndDescription {
  name: string;
  description: string;
}

interface SchemaItem extends NameAndDescription {
  data_type?: string;
  options?: NameAndDescription[];
  required?: boolean;
  paragraphs?: string[];
  attributes?: SchemaItem[];
}

interface SchemaParameters {
  inHeader: SchemaItem[];
  inBody: SchemaItem[];
  inPath: SchemaItem[];
  inQuery: SchemaItem[];
}

interface EndpointItem {
  roles: string[];
  title: string;
  description: string;
  url: string;
  method: HTTP_METHOD;
  body_response?: BodyResponse[];
  body_request?: RawExample;
  returns?: SchemaItem[];
  parameters: Parameters;
}

interface Content {
  left_section_title: string;
  left_section_paragraphs: string[];
  parameters?: NameAndDescription[];
  returns?: NameAndDescription[];
  right_section_title?: string;
  right_section_paragraphs?: string[];
  right_box_snippet_title?: string;
  right_box_snippet_content?: string | RawExample;
  right_box_snippet_white?: boolean;
}

interface SectionItem {
  id: string;
  tag?: string;
  schema?: string;
  title: string;
  content?: Content;
  object_example?: RawExample;
  object_schema?: SchemaItem[];
  endpoints?: EndpointItem[];
  items?: SectionItem[];
  is_core_resource?: boolean;
}

interface Role {
  label: string;
  value: string;
}
