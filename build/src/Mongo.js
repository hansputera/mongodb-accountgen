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
var puppeteer_1 = require("puppeteer");
var random_email_1 = __importDefault(require("random-email"));
var dog_names_1 = __importDefault(require("dog-names"));
var generate_password_1 = __importDefault(require("generate-password"));
var Utils_1 = __importDefault(require("./Utils"));
var util = new Utils_1.default();
var puppeteer_page_proxy_1 = __importDefault(require("puppeteer-page-proxy"));
var ProxyHandle_1 = __importDefault(require("./ProxyHandle"));
var prox = new ProxyHandle_1.default();
var MongoDB = /** @class */ (function () {
    function MongoDB(companyName, password) {
        this.companyName = companyName;
        this.password = password;
        this.mongodb_register = "https://account.mongodb.com/account/register";
        if (this.password) {
            this.password = this.password;
        }
        else {
            this.password = generate_password_1.default.generate({ length: 10, numbers: true });
        }
    }
    MongoDB.prototype.generator = function () {
        return __awaiter(this, void 0, void 0, function () {
            var proxy, browser, page, email, password;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prox.generate()];
                    case 1:
                        proxy = _a.sent();
                        return [4 /*yield*/, puppeteer_1.launch()];
                    case 2:
                        browser = _a.sent();
                        return [4 /*yield*/, browser.newPage()];
                    case 3:
                        page = _a.sent();
                        email = random_email_1.default();
                        password = this.password;
                        return [4 /*yield*/, page.setRequestInterception(true)];
                    case 4:
                        _a.sent();
                        page.on("request", function (request) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, puppeteer_page_proxy_1.default(request, proxy)];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        return [4 /*yield*/, page.goto(this.mongodb_register)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="emailAddress"]', email)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="firstName"]', dog_names_1.default.femaleRandom())];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="lastName"]', dog_names_1.default.maleRandom())];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="password"]', this.password)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="phoneNumber"]', util.generateNumber(12).toString())];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, page.type('input[name="company"]', this.companyName ? this.companyName : 'Scraper Corps.')];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, page.select('select[name="jobResponsibility"]', 'Student')];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, page.select('select[name="country"]', 'ID')];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, page.$$eval('input[type="checkbox"]', function (checkboxes) {
                                checkboxes.forEach(function (ch) { return ch.parentElement.click(); });
                            })];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, page.evaluate(function () { return document.querySelectorAll("[class=\"css-ntpyb3 leafygreen-ui-xuxy0d\"]")[0].click(); })];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, page.waitForNavigation()];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, page.close()];
                    case 17:
                        _a.sent();
                        return [4 /*yield*/, browser.close()];
                    case 18:
                        _a.sent();
                        console.info("+=+=+=+= MONGO DB ACCOUNT GENERATED =+=+=+=+=\nEmail: " + email + "\nPassword: " + password);
                        return [2 /*return*/, true];
                }
            });
        });
    };
    return MongoDB;
}());
exports.default = MongoDB;
