import { Person } from "~/data-access/schemas";

export const getFullName = (
  person:
    | {
        firstname: string;
        middleName?: string | undefined | null;
        lastname: string;
      }
    | undefined
    | Person
) =>
  person
    ? `${person.firstname} ${person.middleName ? `${person.middleName} ` : ""}${
        person.lastname
      }`
    : "";
