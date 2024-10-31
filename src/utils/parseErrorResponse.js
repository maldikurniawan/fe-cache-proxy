export const parseErrorResponse = (responseData) => {
  const parseValue = (value) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    } else if (typeof value === "object" && value !== null) {
      return parseErrorResponse(value);
    } else {
      return String(value);
    }
  };

  if (typeof responseData === "string") {
    return responseData;
  }

  if (typeof responseData === "object" && responseData !== null) {
    return Object.entries(responseData)
      .map(([key, value]) => `${key}: ${parseValue(value)}`)
      .join("\n");
  }

  return "Unknown error occurred";
};
