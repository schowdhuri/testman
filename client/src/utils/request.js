const defaultHeaders = {};
const jsonHeaders = {
    "Accept": "application/json",
    "Content-Type": "application/json"
};
const formHeaders = {
    "Content-type": "application/x-www-form-urlencoded"
};
const isJSON = response => {
    const contentType = response.headers.get("content-type");
    return contentType && contentType.toLowerCase().indexOf("application/json")>=0;
};
const serialize = jsonData => {
    let qString = "";
    if(!jsonData || typeof(jsonData)!=="object")
        return qString;
    Object.keys(jsonData).forEach(key => {
        qString += key + "=" + jsonData[key] + "&";
    });
    if(!qString)
        return qString;
    qString = qString.slice(0, qString.length - 1);
    return qString;
};
const getFormData = jsonData => {
    const fd = new FormData();
    if(!jsonData || typeof(jsonData)!=="object")
        return fd;
    Object.keys(jsonData).forEach(key => {
        fd.append(key, jsonData[key]);
    });
    return fd;
};
/**
* @param {Object} options
*   @param {String} options.url - relative or absolute (starting with http) URL
*   @param {String} [type="GET"] - HTTP request type
*   @param {String} [dataType] - "json" | "form"
*   @param {Object|FormData} [options.data]
                            - JSON for GET requests
                            - JSON for dataType=json
                            - FormData for dataType=form or unknown dataType
*   @param {Object) [headers] - HTTP headers
*/
function request(options) {
    if(!options || !options.url) {
        return Promise.reject("URL required");
    }
    const params = {
        method: options.type || options.method || "GET"
    };
    params.method = params.method.toUpperCase();
    let url;
    if(/^http/.test(options.url)) {
        url = options.url;
    } else if(/^\//.test(options.url)) {
        url = `${options.url}`;
    } else {
        url = `/${options.url}`;
    }
    if(!options.noCredentials) {
        params.credentials = "include";
        params.headers = {
            ...defaultHeaders,
            ...options.headers
        };
    } else {
        params.headers = {
            ...defaultHeaders,
            ...options.headers
        };
    }
    if(params.method !== "GET") {
        if(options.dataType=="json") {
            params.headers = {
                ...jsonHeaders,
                ...params.headers
            };
            if(options.data)
                params.body = JSON.stringify(options.data);
        } else {
            if(options.dataType=="form") {
                params.headers = {
                    ...formHeaders,
                    ...params.headers
                };
            }
        }
        if(!params.body) {
            if(options.data instanceof FormData)
                params.body = options.data;
            else
                params.body = getFormData(options.data);
        }
    } else if(options.data && typeof(options.data) === "object") {
        // add query params
        let qString = serialize(options.data);
        if(url.indexOf("?") > 0) {
            qString = "&" + qString;
        } else {
            qString = "?" + qString;
        }
        url += qString;
    }
    return fetch(url, params).then(response => {
        if(response.ok) {
            if(isJSON(response)) {
                return response.text().then(text => {
                    try {
                        const json = JSON.parse(text);
                        return Promise.resolve({
                            status: response.status,
                            statusText: response.statusText,
                            text,
                            json,
                        });
                    } catch(ex) {
                        return Promise.resolve({
                            status: response.status,
                            statusText: response.statusText,
                            text
                        });
                    }
                });
            }
            return response.text().then(text => Promise.resolve({
                status: response.status,
                statusText: response.statusText,
                text
            }));
        }
        // process error
        if(isJSON(response)) {
            return response.text().then(text => {
                try {
                    const errorJSON = JSON.parse(text);
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                        text,
                        json: errorJSON,
                        errors: errorJSON
                    });
                } catch(ex) {
                    return Promise.reject({
                        status: response.status,
                        statusText: response.statusText,
                        text
                    });
                }
            });
        }
        return response.text().then(text => Promise.reject({
            status: response.status,
            statusText: response.statusText,
            text
        }));
    });
}

export default request;
