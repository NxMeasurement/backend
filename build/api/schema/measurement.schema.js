"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMeasurementsSchema = exports.getMeasurementSchema = exports.deleteMeasurementSchema = exports.updateMeasurementSchema = exports.createMeasurementSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        client: (0, zod_1.string)({
            required_error: 'Client is required',
        }),
        date: zod_1.z.string().transform((date) => new Date(date)),
        notes: (0, zod_1.string)().optional(),
        weight: (0, zod_1.number)({
            required_error: 'Weight is required',
        }).positive(),
        height: (0, zod_1.number)({
            required_error: 'Height is required',
        }).positive(),
        bmi: (0, zod_1.number)({
            required_error: 'Bmi is required',
        }),
        ppmMifflin: (0, zod_1.number)({
            required_error: 'Ppm mifflin is required',
        }).positive(),
        ppmHarris: (0, zod_1.number)({
            required_error: 'Ppm harris is required',
        }).positive(),
        cpm: (0, zod_1.number)({
            required_error: 'Cpm is required',
        }).positive(),
        whr: (0, zod_1.number)().optional(),
        whtr: (0, zod_1.number)().optional(),
        ymca: (0, zod_1.number)().optional(),
        chest_breath: (0, zod_1.number)().optional(),
        chest_exhaust: (0, zod_1.number)().optional(),
        shoulder: (0, zod_1.number)().optional(),
        shoulder_tonus: (0, zod_1.number)().optional(),
        waist: (0, zod_1.number)().optional(),
        hip: (0, zod_1.number)().optional(),
        forearm: (0, zod_1.number)().optional(),
        thigh: (0, zod_1.number)().optional(),
        calf: (0, zod_1.number)().optional(),
        biceps: (0, zod_1.number)().optional(),
        triceps: (0, zod_1.number)().optional(),
        shoulder_blade: (0, zod_1.number)().optional(),
        ala_of_ilium: (0, zod_1.number)().optional(),
        iliac_spine: (0, zod_1.number)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        measurementId: (0, zod_1.string)({
            required_error: 'measurementId is required',
        }),
    }),
};
const query = {
    query: (0, zod_1.object)({
        page: (0, zod_1.string)().optional(),
        itemsCount: (0, zod_1.string)().optional(),
    }),
};
exports.createMeasurementSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateMeasurementSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteMeasurementSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getMeasurementSchema = (0, zod_1.object)(Object.assign({}, params));
exports.getMeasurementsSchema = (0, zod_1.object)(Object.assign({}, query));
