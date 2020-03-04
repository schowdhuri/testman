"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Item_1 = __importDefault(require("../models/Item"));
var DAO = /** @class */ (function () {
    function DAO() {
        this.connect = this._connect();
    }
    DAO.prototype._connect = function () {
        return typeorm_1.createConnection({
            type: "mysql",
            host: "db",
            port: 3306,
            username: "root",
            password: process.env.MYSQL_ROOT_PASSWORD,
            database: "bucketlist",
            entities: [Item_1.default],
            synchronize: true,
            logging: false
        });
    };
    DAO.prototype.save = function (entity) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.save(entity)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DAO.prototype.findOne = function (entityClass, id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(entityClass, id)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DAO.prototype.find = function (entityClass) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.find(entityClass)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DAO.prototype.update = function (entityClass, id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, item, key;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(entityClass, id)];
                    case 2:
                        item = _a.sent();
                        if (!item) {
                            throw new Error("Entity ID " + id + " not found");
                        }
                        for (key in data) {
                            item[key] = data[key];
                        }
                        return [4 /*yield*/, connection.manager.save(item)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    DAO.prototype.remove = function (entityClass, id) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, connection.manager.findOne(entityClass, id)];
                    case 2:
                        item = _a.sent();
                        if (!item) {
                            throw new Error("Entity ID " + id + " not found");
                        }
                        return [4 /*yield*/, connection.manager.remove(item)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DAO;
}());
exports.default = DAO;
