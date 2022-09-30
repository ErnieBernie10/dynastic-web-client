/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/api/Dynasty": {
    get: {
      parameters: {
        query: {
          isFinished?: boolean;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Dynasty"][];
            "application/json": components["schemas"]["Dynasty"][];
            "text/json": components["schemas"]["Dynasty"][];
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
    post: {
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["AddDynastyCommand"];
          "text/json": components["schemas"]["AddDynastyCommand"];
          "application/*+json": components["schemas"]["AddDynastyCommand"];
        };
      };
    };
  };
  "/api/Dynasty/{Id}": {
    get: {
      parameters: {
        path: {
          Id: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Dynasty"];
            "application/json": components["schemas"]["Dynasty"];
            "text/json": components["schemas"]["Dynasty"];
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
  };
  "/api/Dynasty/{id}/UploadCoaFile": {
    put: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "multipart/form-data": {
            /** Format: binary */
            Coa?: string;
          };
        };
      };
    };
  };
  "/api/Dynasty/{id}/CoaConfiguration": {
    put: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["AddDynastyCoaConfigurationBody"];
          "text/json": components["schemas"]["AddDynastyCoaConfigurationBody"];
          "application/*+json": components["schemas"]["AddDynastyCoaConfigurationBody"];
        };
      };
    };
  };
  "/api/Dynasty/{id}": {
    put: {
      parameters: {
        path: {
          id: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["UpdateDynastyCommandBody"];
          "text/json": components["schemas"]["UpdateDynastyCommandBody"];
          "application/*+json": components["schemas"]["UpdateDynastyCommandBody"];
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
        };
      };
      responses: {
        /** Success */
        200: unknown;
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
  };
  "/api/Dynasty/{DynastyId}/Person": {
    get: {
      parameters: {
        path: {
          DynastyId: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Person"][];
            "application/json": components["schemas"]["Person"][];
            "text/json": components["schemas"]["Person"][];
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
    post: {
      parameters: {
        path: {
          dynastyId: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": string;
            "application/json": string;
            "text/json": string;
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/json": components["schemas"]["AddPersonToDynastyBody"];
          "text/json": components["schemas"]["AddPersonToDynastyBody"];
          "application/*+json": components["schemas"]["AddPersonToDynastyBody"];
        };
      };
    };
  };
  "/api/Dynasty/{DynastyId}/Person/{Id}": {
    get: {
      parameters: {
        path: {
          DynastyId: string;
          Id: string;
        };
      };
      responses: {
        /** Success */
        200: {
          content: {
            "text/plain": components["schemas"]["Person"];
            "application/json": components["schemas"]["Person"];
            "text/json": components["schemas"]["Person"];
          };
        };
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
  };
  "/api/Dynasty/{DynastyId}/Person/{id}": {
    put: {
      parameters: {
        path: {
          id: number;
          DynastyId: string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
      requestBody: {
        content: {
          "application/json": string;
          "text/json": string;
          "application/*+json": string;
        };
      };
    };
    delete: {
      parameters: {
        path: {
          id: number;
          DynastyId: string;
        };
      };
      responses: {
        /** Success */
        200: unknown;
        /** If Authorization header not present, has no value or no valid jwt bearer token */
        401: unknown;
        /** If user not authorized to perform requested action */
        403: unknown;
      };
    };
  };
  "/api/WeatherForecast": {
    get: operations["GetWeatherForecast"];
  };
}

export interface components {
  schemas: {
    AddDynastyCoaConfigurationBody: {
      coaConfiguration?: unknown | null;
    };
    AddDynastyCommand: {
      name?: string | null;
      description?: string | null;
      motto?: string | null;
    };
    AddPersonToDynastyBody: {
      firstname: string;
      middlename?: string | null;
      lastname?: string | null;
      /** Format: date-time */
      birthDate?: string | null;
      /** Format: uuid */
      motherId?: string | null;
      /** Format: uuid */
      fatherId?: string | null;
    };
    /**
     * Format: int32
     * @enum {integer}
     */
    CreationStep: 0 | 1 | 2 | 3;
    Dynasty: {
      /** Format: uuid */
      id?: string;
      /** Format: date-time */
      createdAt?: string;
      /** Format: date-time */
      modifiedAt?: string;
      name?: string | null;
      description?: string | null;
      motto?: string | null;
      members?: components["schemas"]["Person"][] | null;
      creationStep?: components["schemas"]["CreationStep"];
      ownershipProperties?: components["schemas"]["DynastyOwnershipProperties"];
      coaConfiguration?: unknown | null;
    };
    DynastyOwnershipProperties: {
      ownerUserId?: string | null;
      members?: string[] | null;
    };
    GetWeatherForecastsQuery: { [key: string]: unknown };
    Person: {
      /** Format: uuid */
      id?: string;
      firstname?: string | null;
      middlename?: string | null;
      lastname?: string | null;
      /** Format: uuid */
      motherId?: string | null;
      /** Format: uuid */
      fatherId?: string | null;
      /** Format: date-time */
      birthDate?: string | null;
      owner?: string | null;
      relationships?: components["schemas"]["Relationship"][] | null;
    };
    Relationship: {
      /** Format: uuid */
      personId?: string;
      /** Format: uuid */
      partnerId?: string | null;
      children?: string[] | null;
    };
    UpdateDynastyCommandBody: {
      name?: string | null;
      description?: string | null;
      motto?: string | null;
    };
    WeatherForecast: {
      /** Format: date-time */
      date?: string;
      /** Format: int32 */
      temperatureC?: number;
      /** Format: int32 */
      temperatureF?: number;
      summary?: string | null;
    };
  };
}

export interface operations {
  GetWeatherForecast: {
    parameters: {
      query: {
        query?: components["schemas"]["GetWeatherForecastsQuery"];
      };
    };
    responses: {
      /** Success */
      200: {
        content: {
          "text/plain": components["schemas"]["WeatherForecast"][];
          "application/json": components["schemas"]["WeatherForecast"][];
          "text/json": components["schemas"]["WeatherForecast"][];
        };
      };
      /** If Authorization header not present, has no value or no valid jwt bearer token */
      401: unknown;
      /** If user not authorized to perform requested action */
      403: unknown;
    };
  };
}

export interface external {}