import express from 'express';
import * as PostController from '../controllers/post-controller.js';
import multer from 'multer';
import { passportAuth, passportAdminUserAuth } from '../utils/passportAuth.js';

const upload = multer({});

const PostRouter = express.Router();

PostRouter.post(
  '/create',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  upload.array('photos', 10),
  PostController.createPost
);

PostRouter.get(
  '/user-posts',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PostController.getUserPosts
);

PostRouter.get(
  '/',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  PostController.getPosts
);

PostRouter.get(
  '/all-posts',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  PostController.getAllPosts
);

PostRouter.get('/:id', PostController.getPostById);

PostRouter.put(
  '/:id',
  (req, res, next) => {
    passportAuth(req, res, next);
  },
  upload.array('photos', 10),
  PostController.updatePost
);

PostRouter.delete('/:id', PostController.deletePost);

PostRouter.put(
  '/:id/approve',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  PostController.approvePost
);

PostRouter.post(
  '/approve-all',
  (req, res, next) => {
    passportAdminUserAuth(req, res, next);
  },
  PostController.approveAllPosts
);

export default PostRouter;
