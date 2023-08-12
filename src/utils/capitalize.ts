const capitalizeFirstWord = (input: string): string => {
  if (!input) return "";

  const words = input.trim().split(" ");
  const capitalizedWords = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  return capitalizedWords.join(" ");
};

export { capitalizeFirstWord };
