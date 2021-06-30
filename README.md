# PrettyRestDoc

This is a template created in React to easily customize and build a REST API Documentation for commercial or development purposes. Project created using using create-react-app wth the typescript template

Roles and Permissions      |  Preview Schema
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/12489333/124013991-59944b00-d9b9-11eb-825e-5a02a9b99487.jpeg)  |  ![](https://user-images.githubusercontent.com/12489333/124013983-57ca8780-d9b9-11eb-90b6-6a0227e8bac3.jpeg)

Search      |  Endpoint Section
:-------------------------:|:-------------------------:
![](https://user-images.githubusercontent.com/12489333/124014002-5b5e0e80-d9b9-11eb-90ae-90e42f798149.jpeg)  |  ![](https://user-images.githubusercontent.com/12489333/124014698-3a49ed80-d9ba-11eb-9357-4678e4ebe17c.jpeg)



### Merge Between custom content and your API contract

You can easily sync you OpenAPI 3 JSON File using the "SectionItem" structure. In the next example you can see a SectionItem create for the Store tag from the PetStore Swagger example. This way can add images, descriptions, and introductory sections like "Getting Started"

```javascript
const documentation: SectionItem = {
  id: "store",
  tag: "store",
  schema: "Order",
  title: "Store",
  content: {
    left_section_title: "Stores",
    left_section_paragraphs: ["This is a Store related operation"],
    right_box_snippet_white: true,
    right_box_snippet_title: "Example of a Order object",
  },
  is_core_resource: true,
};
```

Structure of a `SectionItem`:

`id`: Anchor for URL

`tag`: Tag to found content inside the OpenAPI3 JSON file

`title`: Title for UI

`content`: Titles and descriptions. Also you can create a object like a example of a response/request.

`is_core_resource`: This boolean parameter help to split the content between sections like a "Getting Started" and the API endpoints

With a Array of SectionItems and the JSON of the OpenAPI Schema you can render the documentation:

```javascript
import docSwagger from "./petstore.json"; // OpenAPI JSON
import APIDoc from "./doc"; // Array of SectionItem

<PrettyRestDoc docCustom={APIDoc} docSwagger={docSwagger} />;
```

### Section for Roles and Permissions

You can create easily a table for roles and permissions sending the prop roles to the component. **The `SectionItem` need the `roles-permissions` id for this special case.**

```xml
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
```

Then you will need set the roles to each endpoint in the OpenAPI3 JSON.

```json
{
  "put": {
    "tags": ["user"],
    "roles": ["admin"],
    "summary": "Update user",
    "description": "This can only be done by the logged in user.",
    "operationId": "updateUser"
  }
}
```

### Customization and Styles

The structure of the project is very easy to understand. The code of the documentation is inside the `src/lib` folder:

- `src/lib/adapter-ao3`: Logic to get content from OpenAPI3
- `src/lib/components`: All UI components, you can change styles or logic easily (Modules CSS implemented)
- `src/lib/hooks`: Hooks!
- `src\lib/PrettyRestDoc.jsx`: Root Component

### Current example in this Repository

This Repository have a example using the PetStore from Swagger with the sections Pet, Store and User. But with three sections introductories using the power of `SectionsItem` structures. Also there are a section for **Roles and Permissions**

### Run Documentation in your local Browser
```bash
npm install && npm run start
```

### Run Tests 
```bash
npm install && npm run test
```

### Credits

- [Swagger](https://swagger.io/)
- [OpenAPI](https://www.openapis.org/)
