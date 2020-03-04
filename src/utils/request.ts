const fetch =
  (typeof window !== "undefined" && window.fetch) || require("node-fetch");

const JSON_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json"
};
const FORM_HEADERS = {
  "Content-type": "application/x-www-form-urlencoded"
};

function isJSON(response: any) {
  const contentType = response.headers.get("content-type");
  return (
    contentType && contentType.toLowerCase().indexOf("application/json") >= 0
  );
}

function serialize(jsonData: any) {
  let qString = "";
  if (!jsonData || typeof jsonData !== "object") return qString;
  Object.keys(jsonData).forEach((key: string) => {
    if (jsonData[key] instanceof Array) {
      jsonData[key].forEach((value: string) => {
        qString += key + "=" + value + "&";
      });
    } else {
      qString += key + "=" + jsonData[key] + "&";
    }
  });
  if (!qString) return qString;
  qString = qString.slice(0, qString.length - 1);
  return qString;
}
const getFormData = (jsonData: any) => {
  const fd = new FormData();
  if (!jsonData || typeof jsonData !== "object") return fd;
  Object.keys(jsonData).forEach((key: string) => {
    fd.append(key, jsonData[key]);
  });
  return fd;
};

interface IOptions {
  type?: string;
  method?: string;
  headers?: any;
  dataType?: string;
  data?: any;
  sendCredentials?: boolean;
}

interface IResponse {
  status: number;
  statusText?: string;
  text?: string;
  json?: any;
}

interface FetchParams {
  method: string;
  headers: any;
  credentials?: string;
  body?: any;
}

interface IFetchError {
  status: number;
  statusText: string;
  text?: string;
  json?: any;
}

class FetchError extends Error implements IFetchError {
  status: number;
  statusText: string;
  text: string = "";
  json: any = null;

  constructor(params: IFetchError) {
    super("FetchError");
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchError);
    }
    this.name = "FetchError";
    this.status = params.status;
    this.statusText = params.statusText;
    if (params.text) this.text = params.text;
    if (params.json) this.json = params.json;
  }
}

const request = async (url: string, options?: IOptions): Promise<IResponse> => {
  if (!options) options = {};
  if (!url) {
    throw new Error("URL required");
  }
  const params: FetchParams = {
    method: options.type || options.method || "GET",
    headers: options.headers
  };
  params.method = params.method.toUpperCase();

  if (options.sendCredentials) {
    params.credentials = "include";
  }
  if (params.method !== "GET") {
    if (options.dataType === "form") {
      params.headers = {
        ...FORM_HEADERS,
        ...params.headers
      };
    }
    if (options.dataType === "json") {
      params.headers = {
        ...JSON_HEADERS,
        ...params.headers
      };
      if (options.data) params.body = JSON.stringify(options.data);
    }
    if (!params.body) {
      if (options.data instanceof FormData) params.body = options.data;
      else params.body = getFormData(options.data);
    }
  } else if (options.data && typeof options.data === "object") {
    // add query params
    let qString = serialize(options.data);
    if (url.indexOf("?") > 0) {
      qString = "&" + qString;
    } else {
      qString = "?" + qString;
    }
    url += qString;
  }
  const response = await fetch(url, params);
  const text = await response.text();
  if (response.ok) {
    if (isJSON(response)) {
      try {
        const json = JSON.parse(text);
        return {
          status: response.status,
          statusText: response.statusText,
          text,
          json
        };
      } catch (ex) {
        throw new FetchError({
          status: response.status,
          statusText: response.statusText,
          text
        });
      }
    }
    return {
      status: response.status,
      statusText: response.statusText,
      text
    };
  }
  // process error
  if (isJSON(response)) {
    let errorJSON;
    try {
      errorJSON = JSON.parse(text);
    } catch (ex0) {}
    if (errorJSON) {
      throw new FetchError({
        status: response.status,
        statusText: response.statusText,
        text,
        json: errorJSON
      });
    } else {
      throw new FetchError({
        status: response.status,
        statusText: response.statusText,
        text
      });
    }
  }
  throw new FetchError({
    status: response.status,
    statusText: response.statusText,
    text
  });
};

export default request;
