import { Person } from "~/data-access/schemas";

export const getFullName = (person: Person | undefined) =>
  person
    ? `${person.firstname} ${person.middlename ? `${person.middlename} ` : ""}${
        person.lastname
      }`
    : "";
