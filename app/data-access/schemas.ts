import { components } from "~/dynastic-api.server";

type Schemas = components["schemas"];

export type DynastyCreationStep = Schemas["CreationStep"];

export type Dynasty = Schemas["DynastyDto"];
export type Person = Schemas["Person"];

export type AddDynastyCommand = Schemas["AddDynastyCommand"];
