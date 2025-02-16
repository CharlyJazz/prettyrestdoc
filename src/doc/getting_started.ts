const documentation: SectionItem = {
  id: "getting-started",
  title: "Getting started",
  content: {
    left_section_title: "API Reference",
    left_section_paragraphs: [
      "In order to provide accurate transactional records of client activities on the ShopWorks platform without impacting the performance of the application, a Data Warehouse has been created which  can be accessed via a number of APIs.",
      "The ShopWorks Data Warehouse is designed to allow customers to access the underlying processed  data from the ShopWorks platform, without affecting any business-critical functionality such as  Payroll Files. It achieves this by taking the client-facing application and making an exact copy of it.  When an action is performed on the platform, this is recorded and sent to the Data Warehouse  application. The Data Warehouse can then apply the rules that are bespoke to the client, and output  Cost and Shift information. Clients can then access this information and data, and upload or import  it into their preferred data visualization or business intelligence tool."
    ],
    right_section_title: "JUST GETTING STARTED?",
    right_section_paragraphs: [
      "The Data Warehouse allows clients to access and extract accurate transactional records of activities  undertaken on and data manipulated through the ShopWorks platform, without impacting the  performance of the application. This is facilitated via an API.",
    ],
    right_box_snippet_title: "BASE URL",
    right_box_snippet_content: "https://reporting.api.theshopworks.com/",
    images: [
      "./diagram.png",
    ],
  },
};

export default documentation;
