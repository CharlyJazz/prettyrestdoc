const getStringExample = (format: string | undefined): string => {
  switch (format) {
    case "date":
      return "2023-12-23";
    case "date-time":
      return "2023-12-23T15:30:00Z";
    case "password":
      return "Password123!";
    case "byte":
      return "U3dhZzE=";
    case "binary":
      return "Binary data here";
    case "email":
      return "example@email.com";
    case "uuid":
      return "123e4567-e89b-12d3-a456-426614174000";
    case "uri":
      return "https://example.com";
    default:
      return `String: Needs example with format: ${
        format || "No format specified"
      }`;
  }
};

export default getStringExample;
