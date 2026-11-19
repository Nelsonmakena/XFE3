import type { ModifiedArray } from "@/types/types";
import type { SELECTS } from "./inputs";

//avatar formatter
export const AvatarFormatter = (name: string, fallback: string): string => {
  if (name) {
    return name[0].toUpperCase();
  } else {
    return fallback;
  }
};

//formters

//stirring checker and formatter

export const stringWordCase = (string: string): string => {
  if (!string) return "";
  return string[0].toUpperCase() + string.slice(1);
};

export const stringUpperCase = (string: string): string => {
  if (!string) return "";
  return string.toUpperCase();
};
export const stringLowerCase = (string: string): string => {
  if (!string) return "";
  return string.toLowerCase();
};

// time formatter

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-KE", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  });
};

//custom dropdown menu converter
export const convertArray = <T>(
  array: T[] = [],
  idKey: keyof T,
  nameKey: keyof T,
): ModifiedArray[] => {
  return array?.map((u) => ({
    id: String(u[idKey]),
    name: String(u[nameKey]),
  }));
};
