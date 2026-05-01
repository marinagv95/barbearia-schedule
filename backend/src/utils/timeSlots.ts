export const addMinutes = (date: Date, minutes: number) =>
  new Date(date.getTime() + minutes * 60000);

export const isValidSlotTime = (date: Date) => {
  const m = date.getMinutes();
  return m === 0 || m === 30;
};

export const normalizeToSlotStart = (date: Date) => {
  const d = new Date(date);
  d.setMinutes(d.getMinutes() < 30 ? 0 : 30, 0, 0);
  return d;
};

export const getSlotKey = (date: Date) => {
  const d = new Date(date);
  return `${String(d.getHours()).padStart(2, "0")}:${
    d.getMinutes() < 30 ? "00" : "30"
  }`;
};