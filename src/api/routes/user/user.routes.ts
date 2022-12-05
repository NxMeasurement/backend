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

const router = express.Router();

router.get('/', getUserController);
router.put('/', [validateSchema(updateUserSchema)], updateUserController);
router.post('/', [validateSchema(createUserSchema)], createUserController);

export default router;
