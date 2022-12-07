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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongodb_memory_server_1 = require("mongodb-memory-server");
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = require("./server");
const userId = new mongoose_1.default.Types.ObjectId().toString();
const sessionId = new mongoose_1.default.Types.ObjectId().toString();
const userInput = {
    name: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    password: 'Jan Kowalski2',
};
const userData = {
    name: 'Jan',
    lastName: 'Kowalski',
    email: 'jan.kowalski@gmail.com',
    createdAt: expect.any(String),
    updatedAt: expect.any(String),
};
const createUserPayload = {
    user: Object.assign(Object.assign({}, userData), { _id: expect.any(String), __v: expect.any(Number) }),
    accessToken: expect.any(String),
    refreshToken: expect.any(String),
};
describe('user', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const mongoServer = yield mongodb_memory_server_1.MongoMemoryServer.create();
        yield mongoose_1.default.connect(mongoServer.getUri());
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield mongoose_1.default.disconnect();
        yield mongoose_1.default.connection.close();
    }));
    describe('get user route', () => {
        let accessToken;
        let refreshToken;
        describe('create user', () => {
            it('should return a 200', () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode, body } = yield (0, supertest_1.default)(server_1.app)
                    .post('/api/user')
                    .send(userInput);
                expect(statusCode).toBe(200);
                expect(body).toEqual(createUserPayload);
                accessToken = body.accessToken;
                refreshToken = body.refreshToken;
            }));
        });
        describe('given the user is not logged in', () => {
            it('should return a 403', () => __awaiter(void 0, void 0, void 0, function* () {
                const { statusCode } = yield (0, supertest_1.default)(server_1.app).get('/api/user');
                expect(statusCode).toBe(403);
            }));
        });
        describe('given the user is logged in', () => {
            it('should return a 200 and the user', () => __awaiter(void 0, void 0, void 0, function* () {
                const { body, statusCode } = yield (0, supertest_1.default)(server_1.app)
                    .get('/api/user')
                    .set('Authorization', `Bearer ${accessToken}`);
                expect(statusCode).toBe(200);
                expect(body).toEqual(userData);
            }));
        });
    });
});
