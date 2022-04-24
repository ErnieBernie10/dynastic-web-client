/* eslint-disable no-unused-vars */
// noinspection ES6UnusedImports

import { auth0Client } from '../App';

export class Config {
  constructor(getBearerToken: () => Promise<string>) {
    this.getBearerToken = getBearerToken;
  }

  public getBearerToken: () => Promise<string>;
}

export class ApiBase {
  constructor(config: Config) {
    this.config = config;
  }

  private config: Config;

  // eslint-disable-next-line no-undef
  transformOptions = async (options: RequestInit): Promise<RequestInit> => {
    const token = await this.config.getBearerToken();

    const authHeader: Record<string, string> = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    const customOptions = {
      ...options,
    };

    customOptions.headers = {
      ...options.headers,
      'Access-Control-Allow-Origin': '*',
      ...authHeader,
    };

    if (options.body === undefined && options.method !== 'GET') {
      customOptions.body = JSON.stringify({});
    }

    return Promise.resolve(customOptions);
  };
}
