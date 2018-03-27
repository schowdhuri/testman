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

const cbQ = {
    complete: [],
    success: [],
    error: []
};
const onComplete = cb => {
    if(typeof(cb)==="function")
        cbQ.complete.push(cb);
};
const onSuccess = cb => {
    if(typeof(cb)==="function") {
        cbQ.success.push(cb);
        cbQ.complete.push(cb);
    }
};
const onError = cb => {
    if(typeof(cb)==="function") {
        cbQ.error.push(cb);
        cbQ.complete.push(cb);
    }
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
const request = options => {
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
        cbQ.complete.forEach(cb => {
            setTimeout(() => {
                cb(response);
            }, 0);
        });
        if(response.ok) {
            cbQ.success.forEach(cb => {
                setTimeout(() => {
                    cb(response);
                }, 0);
            });
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
            cbQ.forEach(cb => cb(response));
            return response.text().then(text => Promise.resolve({
                status: response.status,
                statusText: response.statusText,
                text
            }));
        }
        // process error
        if(isJSON(response)) {
            cbQ.error.forEach(cb => {
                setTimeout(() => {
                    cb(response);
                }, 0);
            });
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
};
request.on = (event, cb) => {
    if(event==="success") {
        onSuccess(cb);
        onComplete(cb);
    }
    if(event==="error") {
        onError(cb);
        onComplete(cb);
    }
    if(event==="complete") {
        onComplete(cb);
    }
};
request.off = (event, cb) => {
    if(event==="success") {
        const index = cbQ.success.findIndex(f => f===cb);
        if(index != -1) {
            cbQ.success.splice(index, 1);
        }
    }
    if(event==="error") {
        const index = cbQ.error.findIndex(f => f===cb);
        if(index != -1) {
            cbQ.error.splice(index, 1);
        }
    }
    const index = cbQ.error.findIndex(f => f===cb);
    if(index != -1) {
        cbQ.complete.splice(index, 1);
    }
};

export default request;
