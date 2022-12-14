"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: 'Name is required',
        }),
        lastName: (0, zod_1.string)({
            required_error: 'Lastname is required',
        }),
        password: (0, zod_1.string)({
            required_error: 'Password is required',
        }).min(6, 'Password too short - should be 6 chars minimum'),
        email: (0, zod_1.string)({
            required_error: 'Email is required',
        }).email('Not a valid email'),
    }),
};
exports.createUserSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateUserSchema = (0, zod_1.object)(Object.assign({}, payload));
