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
var express_1 = __importDefault(require("express"));
var dao_1 = __importDefault(require("./utils/dao"));
var Item_1 = __importDefault(require("./models/Item"));
var dao = new dao_1.default();
var app = express_1.default();
app.use(express_1.default.json());
app.get("/api/ping", function (req, res) {
    res.send("OK");
});
app.post("/api/todo", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, _b, completed, todo, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                _a = req.body, name = _a.name, _b = _a.completed, completed = _b === void 0 ? false : _b;
                todo = new Item_1.default();
                todo.name = name;
                todo.completed = completed;
                _d = (_c = res).json;
                return [4 /*yield*/, dao.save(todo)];
            case 1:
                _d.apply(_c, [_e.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/todos/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json("id is required")];
                }
                _b = (_a = res).json;
                return [4 /*yield*/, dao.findOne(Item_1.default, Number(id))];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.delete("/api/todos/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json("id is required")];
                }
                _b = (_a = res).json;
                return [4 /*yield*/, dao.remove(Item_1.default, Number(id))];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.put("/api/todos/:id", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                data = req.body;
                if (!req.params.id) {
                    return [2 /*return*/, res.status(400).json("id is required")];
                }
                _b = (_a = res).json;
                return [4 /*yield*/, dao.update(Item_1.default, Number(req.params.id), data)];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
app.get("/api/todos", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var todos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dao.find(Item_1.default)];
            case 1:
                todos = _a.sent();
                res.json(todos);
                return [2 /*return*/];
        }
    });
}); });
app.listen(3001, function () {
    console.log("API server ready...");
});
