import express from 'express';
import { passportAdminUserAuth, passportAuth } from '../utils/passportAuth.js';
import * as UserController from '../controllers/user-controller.js';

const UserRouter = express.Router();

UserRouter.post('/login', UserController.login);
UserRouter.post('/register', UserController.register);
UserRouter.put(
  '/update',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  UserController.update
);

UserRouter.delete(
  '/:id',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  UserController.deleteUser
);

UserRouter.get(
  '/context',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  UserController.getUserContext
);

UserRouter.get(
  '/',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  UserController.getAllUsers
);

export default UserRouter;
