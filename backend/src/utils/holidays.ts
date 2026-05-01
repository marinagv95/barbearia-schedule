import Holidays from "date-holidays";

const hd = new Holidays("BR");

export const isHoliday = (date: Date) => {
  const holidays = hd.isHoliday(date);

  if (!holidays) return false;

  // 🔥 pega só feriado nacional
  return holidays.some((h: any) => h.type === "public");
};

export const getHolidayName = (date: Date) => {
  const holidays = hd.isHoliday(date);

  if (!holidays) return null;

  const national = holidays.find((h: any) => h.type === "public");

  return national?.name || null;
};