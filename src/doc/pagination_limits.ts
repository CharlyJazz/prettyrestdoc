const documentation: SectionItem = {
  id: "pagination-limits",
  title: "Pagination & Limits",
  content: {
    left_section_title: "Pagination",
    left_section_paragraphs: [
      "PetStore API utilizes cursor-based pagination via the [starting_after] parameter. The [starting_after] parameter takes an existing [last_element] attribute value and returns the next batch of objects.",
    ],
    parameters: [
      {
        name: "limit",
        description:
          "A limit on the number of objects to be returned. The limit can range between 1 and 1000, and the default is 10.",
      },
      {
        name: "starting_after",
        description:
          "A cursor for use in pagination. [starting_after] is a generated ID that defines your place in the list. For instance, if you make a list request and receive 100 objects, including [last_element] in the data root, your subsequent call can include [starting_after]=[last_element] in order to fetch the next page of the list.",
      },
    ],
    returns: [
      {
        name: "has_more",
        description: "Indicates whether there are more items in the database",
      },
      {
        name: "data",
        description: "A list of individual objects",
      },
      {
        name: "last_element",
        description:
          "Provide this value in the starting_after parameter to get the next list of resources",
      },
    ],
    right_box_snippet_title: "RESPONSE",
    right_box_snippet_content: {
      object: "list",
      url: "/pets",
      has_more: true,
      data: [
        {
          name: "Poppy",
          photo: "photo.com",
        },
      ],
      last_element: "2S87A62H",
    },
    right_box_snippet_white: true,
  },
};

export default documentation;
