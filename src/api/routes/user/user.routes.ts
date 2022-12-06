import express from 'express';

//controllers
import {
  createUserController,
  getUserController,
  updateUserController,
} from '../../controllers/user.controller';

//schema
import { createUserSchema, updateUserSchema } from '../../schema/user.schema';

//middleware
import validateSchema from '../../middleware/schema.middleware';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

router.get('/', requireUser, getUserController);
router.put(
  '/',
  [requireUser, validateSchema(updateUserSchema)],
  updateUserController
);
router.post('/', [validateSchema(createUserSchema)], createUserController);

export default router;
