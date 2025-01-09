/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import FormData from "form-data";
import camelCase from "lodash-es/camelCase";

// @ts-ignore
import { ApiError } from "./ApiError";
// @ts-ignore
import type { ApiRequestOptions } from "./ApiRequestOptions";
// @ts-ignore
import type { ApiResult } from "./ApiResult";
// @ts-ignore
import { CancelablePromise } from "./CancelablePromise";
// @ts-ignore
import type { OnCancel } from "./CancelablePromise";
// @ts-ignore
import type { OpenAPIConfig } from "./OpenAPI";

export const camelToSnakeCase = (string: string) => {
  return string.replace(/[0-9A-Z]/g, (match) => `_${match.toLowerCase()}`);
};

export const convertBackendObject = <T>(backendObject: T): T => {
  if (backendObject instanceof Array) {
    return backendObject.map(convertBackendObject) as T;
  }

  if (backendObject instanceof Object) {
    return Object.entries(backendObject).reduce(
      (result, [key, value]) => {
        result[camelCase(key)] =
          typeof value === "object" && value !== null
            ? convertBackendObject(value as T)
            : value;

        return result;
      },
      {} as Record<string, unknown>
    ) as T;
  }

  return backendObject as T;
};

export const convertToBackendObject = <T>(object: T): T => {
  if (object instanceof Array) {
    return object.map(convertToBackendObject) as T;
  }

  if (typeof object === "object" && object !== null) {
    return Object.entries(object).reduce(
      (result, [key, value]) => {
        const newKey = camelToSnakeCase(key);
        result[newKey] = convertToBackendObject(value);

        return result;
      },
      {} as Record<string, unknown>
    ) as T;
  }

  return object;
};

export const transformResponse = (data: string) =>
  data ? convertBackendObject(JSON.parse(data)) : data;

export const transformRequest = [
  (data: any) => JSON.stringify(convertToBackendObject(data)),
];

const BASE = import.meta.env.VITE_APP_API_BASE_URL;

const isDefined = <T>(
  value: T | null | undefined
): value is Exclude<T, null | undefined> => {
  return value !== undefined && value !== null;
};

const isString = (value: any): value is string => {
  return typeof value === "string";
};

const isBlob = (value: any): value is Blob => {
  return (
    typeof value === "object" &&
    typeof value.type === "string" &&
    typeof value.stream === "function" &&
    typeof value.arrayBuffer === "function" &&
    typeof value.constructor === "function" &&
    typeof value.constructor.name === "string" &&
    /^(Blob|File)$/.test(value.constructor.name) &&
    /^(Blob|File)$/.test(value[Symbol.toStringTag])
  );
};

const isFormData = (value: any): value is FormData => {
  return value instanceof FormData;
};

const isSuccess = (status: number): boolean => {
  return status >= 200 && status < 300;
};

const getQueryString = (params: Record<string, any>): string => {
  const qs: string[] = [];

  const append = (key: string, value: any) => {
    qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
  };

  const process = (key: string, value: any) => {
    if (isDefined(value)) {
      if (Array.isArray(value)) {
        append(key, value.join(","));
      } else if (typeof value === "object") {
        Object.entries(value).forEach(([k, v]) => {
          process(`${key}[${k}]`, v);
        });
      } else {
        append(key, value);
      }
    }
  };

  Object.entries(params).forEach(([key, value]) => {
    process(key, value);
  });

  if (qs.length > 0) {
    return `?${qs.join("&")}`;
  }

  return "";
};

const getUrl = (options: ApiRequestOptions): string => {
  const encoder = encodeURI;

  const path = options.url.replace(
    /{(.*?)}/g,
    (substring: string, group: string) => {
      if (options.path?.hasOwnProperty(group)) {
        return encoder(String(options.path[group]));
      }
      return substring;
    }
  );

  const url = `${BASE}${path}`;
  if (options.query) {
    return `${url}${getQueryString(options.query)}`;
  }
  return url;
};

const getFormData = (options: ApiRequestOptions): FormData | undefined => {
  if (options.formData) {
    const formData = new FormData();

    const process = (key: string, value: any) => {
      if (isString(value) || isBlob(value)) {
        formData.append(key, value);
      } else {
        formData.append(key, JSON.stringify(value));
      }
    };

    Object.entries(options.formData)
      .filter(([_, value]) => isDefined(value))
      .forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => process(key, v));
        } else {
          process(key, value);
        }
      });

    return formData;
  }
  return undefined;
};

const getHeaders = async (
  options: ApiRequestOptions,
  formData?: FormData
): Promise<Record<string, string>> => {
  const formHeaders =
    (typeof formData?.getHeaders === "function" && formData?.getHeaders()) ||
    {};

  const headers = Object.entries({
    Accept: "application/json",
    ...options.headers,
    ...formHeaders,
  })
    .filter(([_, value]) => isDefined(value))
    .reduce(
      (headers, [key, value]) => ({
        ...headers,
        [key]: String(value),
      }),
      {} as Record<string, string>
    );

  if (options.body) {
    if (options.mediaType) {
      headers["Content-Type"] = options.mediaType;
    } else if (isBlob(options.body)) {
      headers["Content-Type"] = options.body.type || "application/octet-stream";
    } else if (isString(options.body)) {
      headers["Content-Type"] = "text/plain";
    } else if (!isFormData(options.body)) {
      headers["Content-Type"] = "application/json";
    }
  }

  return headers;
};

const getRequestBody = (options: ApiRequestOptions): any => {
  if (options.body) {
    return options.body;
  }
  return undefined;
};

const sendRequest = async <T>(
  options: ApiRequestOptions,
  url: string,
  body: any,
  formData: FormData | undefined,
  headers: Record<string, string>,
  onCancel: OnCancel
): Promise<AxiosResponse<T>> => {
  const source = axios.CancelToken.source();

  const requestConfig: AxiosRequestConfig = {
    url,
    headers,
    data: body ?? formData,
    method: options.method,
    cancelToken: source.token,
    transformRequest, // Added line compared to orginal template
    transformResponse, // Added line compared to orginal template
  };

  onCancel(() => source.cancel("The user aborted a request."));

  return axios.request(requestConfig); // Modified line compared to orginal template
};

const getResponseHeader = (
  response: AxiosResponse<any>,
  responseHeader?: string
): string | undefined => {
  if (responseHeader) {
    const content = response.headers[responseHeader];
    if (isString(content)) {
      return content;
    }
  }
  return undefined;
};

const getResponseBody = (response: AxiosResponse<any>): any => {
  if (response.status !== 204) {
    return response.data;
  }
  return undefined;
};

const catchErrorCodes = (
  options: ApiRequestOptions,
  result: ApiResult
): void => {
  const errors: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...options.errors,
  };

  const error = errors[result.status];
  if (error) {
    throw new ApiError(options, result, error);
  }

  if (!result.ok) {
    throw new ApiError(options, result, "Generic Error");
  }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(
  options: ApiRequestOptions
): CancelablePromise<T> => {
  // @ts-ignore
  return new CancelablePromise(async (resolve, reject, onCancel) => {
    try {
      const url = getUrl(options);
      const formData = getFormData(options);
      const body = getRequestBody(options);
      const headers = await getHeaders(options, formData);

      if (!onCancel.isCancelled) {
        const response = await sendRequest<T>(
          options,
          url,
          body,
          formData,
          headers,
          onCancel
        );
        const responseBody = getResponseBody(response);
        const responseHeader = getResponseHeader(
          response,
          options.responseHeader
        );

        const result: ApiResult = {
          url,
          ok: isSuccess(response.status),
          status: response.status,
          statusText: response.statusText,
          body: responseHeader ?? responseBody,
        };

        catchErrorCodes(options, result);

        resolve(result.body);
      }
    } catch (error) {
      reject(error);
    }
  });
};
