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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeasurementController = exports.getMeasurementsController = exports.getMeasurementQueryController = exports.getMeasurementController = exports.updateMeasurementController = exports.createMeasurementController = void 0;
const measurement_service_1 = require("../services/measurement.service");
const measurement_model_1 = __importDefault(require("../models/measurement.model"));
const client_service_1 = require("../services/client.service");
function createMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const body = req.body;
        const measurement = yield (0, measurement_service_1.createMeasurement)(Object.assign(Object.assign({}, body), { user: userId }));
        return res.send(measurement);
    });
}
exports.createMeasurementController = createMeasurementController;
function updateMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const update = req.body;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        const updatedMeasurement = yield (0, measurement_service_1.getAndUpdateMeasurement)({ _id: measurementId }, update, {
            new: true,
        });
        return res.send(updatedMeasurement);
    });
}
exports.updateMeasurementController = updateMeasurementController;
function getMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        return res.send(measurement);
    });
}
exports.getMeasurementController = getMeasurementController;
function getMeasurementQueryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        const measurementClient = yield (0, client_service_1.getClient)({
            _id: measurement.client,
        });
        const measurementQueryObj = Object.assign(Object.assign({}, measurement), { client: measurementClient });
        return res.send(measurementQueryObj);
    });
}
exports.getMeasurementQueryController = getMeasurementQueryController;
function getMeasurementsController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const queryPage = req.query.page;
        const itemsCount = req.query.itemsCount;
        if (queryPage && itemsCount) {
            const page = parseInt(queryPage);
            const skip = (page - 1) * parseInt(itemsCount); // 1 * 20 = 20
            console.log({ skip });
            const countPromise = measurement_model_1.default.estimatedDocumentCount();
            const measurementsPromise = measurement_model_1.default.find({ user: userId })
                .limit(parseInt(itemsCount))
                .skip(skip);
            const [count, measurements] = yield Promise.all([
                countPromise,
                measurementsPromise,
            ]);
            const pageCount = count / parseInt(itemsCount); // 400 items / 20 = 20
            if (!count || !measurements) {
                return res.sendStatus(404);
            }
            const measurementsQuery = yield Promise.all(measurements.map((measurement) => __awaiter(this, void 0, void 0, function* () {
                const client = yield (0, client_service_1.getClient)({ _id: measurement.client });
                return Object.assign(Object.assign({}, measurement.toObject()), { measurementClient: {
                        name: client === null || client === void 0 ? void 0 : client.name,
                        lastName: client === null || client === void 0 ? void 0 : client.lastName,
                        fullName: (client === null || client === void 0 ? void 0 : client.name) + ' ' + (client === null || client === void 0 ? void 0 : client.lastName),
                    } });
            })));
            return res.send({
                pagination: {
                    count,
                    pageCount,
                },
                measurements: measurementsQuery,
            });
        }
        const measurements = yield (0, measurement_service_1.getMeasurements)({ user: userId });
        if (!measurements) {
            return res.sendStatus(404);
        }
        return res.send(measurements);
    });
}
exports.getMeasurementsController = getMeasurementsController;
function deleteMeasurementController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const measurementId = req.params.measurementId;
        const measurement = yield (0, measurement_service_1.getMeasurement)({ _id: measurementId });
        if (!measurement) {
            return res.sendStatus(404);
        }
        if (String(measurement.user) !== userId) {
            return res.sendStatus(403);
        }
        yield (0, measurement_service_1.deleteMeasurement)({ _id: measurementId });
        return res.sendStatus(200);
    });
}
exports.deleteMeasurementController = deleteMeasurementController;
