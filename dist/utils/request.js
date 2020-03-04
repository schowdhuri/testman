"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = (typeof window !== "undefined" && window.fetch) || require("node-fetch");
var JSON_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json"
};
var FORM_HEADERS = {
    "Content-type": "application/x-www-form-urlencoded"
};
function isJSON(response) {
    var contentType = response.headers.get("content-type");
    return (contentType && contentType.toLowerCase().indexOf("application/json") >= 0);
}
function serialize(jsonData) {
    var qString = "";
    if (!jsonData || typeof jsonData !== "object")
        return qString;
    Object.keys(jsonData).forEach(function (key) {
        if (jsonData[key] instanceof Array) {
            jsonData[key].forEach(function (value) {
                qString += key + "=" + value + "&";
            });
        }
        else {
            qString += key + "=" + jsonData[key] + "&";
        }
    });
    if (!qString)
        return qString;
    qString = qString.slice(0, qString.length - 1);
    return qString;
}
var getFormData = function (jsonData) {
    var fd = new FormData();
    if (!jsonData || typeof jsonData !== "object")
        return fd;
    Object.keys(jsonData).forEach(function (key) {
        fd.append(key, jsonData[key]);
    });
    return fd;
};
var FetchError = /** @class */ (function (_super) {
    __extends(FetchError, _super);
    function FetchError(params) {
        var _this = _super.call(this, "FetchError") || this;
        _this.text = "";
        _this.json = null;
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(_this, FetchError);
        }
        _this.name = "FetchError";
        _this.status = params.status;
        _this.statusText = params.statusText;
        if (params.text)
            _this.text = params.text;
        if (params.json)
            _this.json = params.json;
        return _this;
    }
    return FetchError;
}(Error));
var request = function (url, options) { return __awaiter(void 0, void 0, void 0, function () {
    var params, qString, response, text, json, errorJSON;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!options)
                    options = {};
                if (!url) {
                    throw new Error("URL required");
                }
                params = {
                    method: options.type || options.method || "GET",
                    headers: options.headers
                };
                params.method = params.method.toUpperCase();
                if (options.sendCredentials) {
                    params.credentials = "include";
                }
                if (params.method !== "GET") {
                    if (options.dataType === "form") {
                        params.headers = __assign(__assign({}, FORM_HEADERS), params.headers);
                    }
                    if (options.dataType === "json") {
                        params.headers = __assign(__assign({}, JSON_HEADERS), params.headers);
                        if (options.data)
                            params.body = JSON.stringify(options.data);
                    }
                    if (!params.body) {
                        if (options.data instanceof FormData)
                            params.body = options.data;
                        else
                            params.body = getFormData(options.data);
                    }
                }
                else if (options.data && typeof options.data === "object") {
                    qString = serialize(options.data);
                    if (url.indexOf("?") > 0) {
                        qString = "&" + qString;
                    }
                    else {
                        qString = "?" + qString;
                    }
                    url += qString;
                }
                return [4 /*yield*/, fetch(url, params)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.text()];
            case 2:
                text = _a.sent();
                if (response.ok) {
                    if (isJSON(response)) {
                        try {
                            json = JSON.parse(text);
                            return [2 /*return*/, {
                                    status: response.status,
                                    statusText: response.statusText,
                                    text: text,
                                    json: json
                                }];
                        }
                        catch (ex) {
                            throw new FetchError({
                                status: response.status,
                                statusText: response.statusText,
                                text: text
                            });
                        }
                    }
                    return [2 /*return*/, {
                            status: response.status,
                            statusText: response.statusText,
                            text: text
                        }];
                }
                // process error
                if (isJSON(response)) {
                    errorJSON = void 0;
                    try {
                        errorJSON = JSON.parse(text);
                    }
                    catch (ex0) { }
                    if (errorJSON) {
                        throw new FetchError({
                            status: response.status,
                            statusText: response.statusText,
                            text: text,
                            json: errorJSON
                        });
                    }
                    else {
                        throw new FetchError({
                            status: response.status,
                            statusText: response.statusText,
                            text: text
                        });
                    }
                }
                throw new FetchError({
                    status: response.status,
                    statusText: response.statusText,
                    text: text
                });
        }
    });
}); };
exports.default = request;
