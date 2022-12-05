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
exports.updateUserController = exports.getUserController = exports.createUserController = void 0;
const user_service_1 = require("../services/user.service");
const logger_1 = __importDefault(require("../../utils/logger"));
function createUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const email = req.body.email;
            const existingUserEmail = yield (0, user_service_1.validateEmail)(email);
            if (existingUserEmail) {
                return res
                    .status(400)
                    .json({ msg: 'There is already a user with this email address' });
            }
            const user = yield (0, user_service_1.createUser)(req.body);
            if (!user) {
                return res
                    .status(500)
                    .json({ msg: 'A server error occurred during registration' });
            }
            return res.send({ user });
        }
        catch (e) {
            logger_1.default.error(e);
            return res.status(409).send(e.message);
        }
    });
}
exports.createUserController = createUserController;
function getUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = res.locals.user._id;
        const user = yield (0, user_service_1.getUser)({ _id: userId });
        if (!user) {
            return res.sendStatus(404);
        }
        return res.send(user);
    });
}
exports.getUserController = getUserController;
function updateUserController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const update = req.body;
        const userId = res.locals.user._id;
        const user = yield (0, user_service_1.getUser)({ _id: userId });
        if (!user) {
            return res.sendStatus(404);
        }
        const updatedUser = yield (0, user_service_1.findAndUpdateUser)({ _id: userId }, update, {
            new: true,
        });
        return res.send(updatedUser);
    });
}
exports.updateUserController = updateUserController;
