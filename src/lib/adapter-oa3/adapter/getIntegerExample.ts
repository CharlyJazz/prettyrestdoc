const getIntegerExample = (format: string | undefined): number => {
  switch (format) {
    case "int32":
      return 2147483647;
    case "int64":
      return 9223372036854775807;
    default:
      return 0;
  }
};

export default getIntegerExample;
