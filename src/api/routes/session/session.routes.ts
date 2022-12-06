import express from 'express';

//controllers
import {
  createUserSessionController,
  deleteUserSessionController,
  getUserSessionsController,
} from '../../controllers/session.controller';

//schema
import { createSessionSchema } from '../../schema/session.schema';

//middleware
import validateSchema from '../../middleware/schema.middleware';
import requireUser from '../../middleware/requireUser';

const router = express.Router();

router.post(
  '/',
  validateSchema(createSessionSchema),
  createUserSessionController
);

router.get('/', requireUser, getUserSessionsController);
router.delete('/', requireUser, deleteUserSessionController);

export default router;
