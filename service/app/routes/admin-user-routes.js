import express from 'express';
import { passportAdminUserAuth } from '../utils/passportAuth.js';

import * as AdminUserController from '../controllers/admin-user-controller.js';

const AdminUserRouter = express.Router();

AdminUserRouter.post('/login', AdminUserController.login);
AdminUserRouter.post('/register', AdminUserController.register);
AdminUserRouter.put(
  '/:id',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  AdminUserController.update
);
AdminUserRouter.delete(
  '/delete',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  AdminUserController.deleteUser
);

export default AdminUserRouter;
