const documentation: SectionItem = {
  id: "authentication",
  title: "Authentication",
  content: {
    left_section_title: "Authentication",
    left_section_paragraphs: [
      "The PetStore API uses API keys to authenticate requests. You can view and manage your API keys in the PetStore Dashboard.",
      "Your API keys carry many privileges, so be sure to keep them secure! Do not share your secret API keys in publicly accessible areas such as GitHub, client-side code, and so forth.",
      "Authentication to the API is performed via HTTP Basic Auth. Provide your API key as the basic auth username value. You do not need to provide a password.",
      "All API requests must be made over HTTPS. Calls made over plain HTTP will fail. API requests without authentication will also fail.",
      "API endpoint: https://api.petstore.com/v1",
    ],
  },
};

export default documentation;
