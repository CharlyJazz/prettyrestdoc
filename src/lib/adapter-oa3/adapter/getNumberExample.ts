const getNumberExample = (format: string | undefined): number => {
  switch (format) {
    case "float":
      return 3.14;
    case "double":
      return 3.14159265359;
    default:
      return 0.0;
  }
};

export default getNumberExample;
