import { Person } from "~/data-access/schemas";

export const getFullName = (person: Person | undefined) =>
  person
    ? `${person.firstname} ${person.middleName ? `${person.middleName} ` : ""}${
        person.lastname
      }`
    : "";
