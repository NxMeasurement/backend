"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = __importDefault(require("../api/routes"));
const response_time_1 = __importDefault(require("response-time"));
const express_1 = __importDefault(require("express"));
const metrics_1 = require("./metrics");
const deserializeUser_1 = __importDefault(require("../api/middleware/deserializeUser"));
const createServer = () => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use(deserializeUser_1.default);
    (0, routes_1.default)(app);
    app.use((0, response_time_1.default)((req, res, time) => {
        var _a;
        if ((_a = req === null || req === void 0 ? void 0 : req.route) === null || _a === void 0 ? void 0 : _a.path) {
            metrics_1.restResponseTimeHistogram.observe({
                method: req.method,
                route: req.route.path,
                status_code: res.statusCode,
            }, time * 1000);
        }
    }));
    (0, metrics_1.startMetricsServer)();
    return app;
};
exports.default = createServer;
