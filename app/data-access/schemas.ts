import { components } from "~/dynastic-api.server";

type Schemas = components["schemas"];

export type Dynasty = Schemas["Dynasty"];

export type AddDynastyCommand = Schemas["AddDynastyCommand"];
