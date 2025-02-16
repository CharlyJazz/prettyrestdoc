const documentation: SectionItem = {
  id: "pagination-limits",
  title: "Pagination & Limits",
  content: {
    left_section_title: "Pagination",
    left_section_paragraphs: [
      "Our API response and request supports several common query parameters to handle paging through the response data.",
      "The default number or records returned per page is set to 15.",
      "In order to extend this, you may pass in a 'per_page' parameter with the request query, such as 'per_page=100'",
      "Pagination link data is contained within the 'links' property of every response.",
      "To move to the previous or next page of data, you should reference the response from the current call, which will contain a cursor pointer link (where one is available) within the 'links.prev' and 'links.next' properties.",
      "The pagination data response properties 'links.prev' and 'links.next' will contain all the request parameters needed to make the next call. When making the next call to the API, do not attempt to modify any of the data within the response, as this may result in missing records",
      "NOTE: Due to a change to the pagination method used in the V2 endpoints, V2 only uses the 'links.prev' and 'links.next' properties. It is not possible to specify a page number and jump directly to that page - You may only use 'prev' and 'next' links to cycle through the pages."
    ],
    parameters: [
      {
        name: "per_page",
        description:
          "A limit on the number of objects to be returned.",
      },
    ],
    returns: [
      {
        name: "links.prev",
        description:
          "A link to the previous page of objects.",
      },
      {
        name: "links.next",
        description:
          "A link to the next page of objects.",
      },
    ],
    right_box_snippet_title: "RESPONSE",
    right_box_snippet_content: {
      data: [],
      links: {
        prev: "https://api.example.com/v1/endpoint?per_page=15&cursor=12345",
        next: "https://api.example.com/v1/endpoint?per_page=15&cursor=67890",
      }
    },
    right_box_snippet_white: true,
  },
};

export default documentation;
