export const getId = (value: any) =>
  typeof value === "object" && value !== null && "_id" in value
    ? String(value._id)
    : String(value);