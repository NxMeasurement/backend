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
exports.userData = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_memory_server_1 = require("mongodb-memory-server");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const jwt_utils_1 = require("../utils/jwt.utils");
const server_1 = require("./server");
const sessionId = new mongoose_1.default.Types.ObjectId().toString();
exports.userData = {
    name: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};
const clientInput = {
    name: 'Jan',
    lastName: 'Kowalski',
    dateOfBirth: new Date(),
    gender: 'male',
    physiologicalState: 'lack',
    pal: 1.4,
};
const clientPayload = Object.assign(Object.assign({}, clientInput), { specificAims: expect.any(Array), dateOfBirth: expect.any(String), createdAt: expect.any(String), updatedAt: expect.any(String), _id: expect.any(String), __v: expect.any(Number) });
describe('user clients', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('get client route', () => {
        let clientId;
        const accessToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, exports.userData), { sessionId }), 'accessTokenPrivateKey', { expiresIn: '15m' });
        describe('create client', () => {
            it('should return a 200', () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode, body } = yield (0, supertest_1.default)(server_1.app)
                    .post('/api/clients')
                    .set('Authorization', `Bearer ${accessToken}`)
                    .send(clientInput);
                expect(body).toEqual(clientPayload);
                clientId = body._id;
                expect(statusCode).toBe(200);
            }));
        });
        describe('given the user is not logged in', () => {
            it('should return a 403', () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(server_1.app).get('/api/clients');
                expect(statusCode).toBe(403);
            }));
        });
        describe('get user clients', () => {
            it('should return a 200 and the user clients', () => __awaiter(void 0, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(server_1.app)
                    .get('/api/clients')
                    .set('Authorization', `Bearer ${accessToken}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual([clientPayload]);
            }));
        });
    });
});
