import { toZonedTime } from "date-fns-tz";

export const toBrazilTime = (date: Date) => {
  return toZonedTime(date, "America/Sao_Paulo");
};