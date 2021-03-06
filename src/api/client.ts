import { auth0Client } from "../App";
import { Config } from "./ApiBase";
import { DynastyClient, PersonClient } from "./ApiClient";
import { config } from "./config";

export const client = {
  dynastyClient: new DynastyClient(
    new Config(() => auth0Client.getTokenSilently()),
    config.baseUrl as string
  ),
  personClient: new PersonClient(
    new Config(() => auth0Client.getTokenSilently()),
    config.baseUrl as string
  ),
};
