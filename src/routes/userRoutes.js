import express from 'express';
import { createUser, getAllUsers } from '../controllers/userController.js';
import { createPost, getAllPosts } from '../controllers/postController.js';

const router = express.Router();

// http://localhost:5001/api/v0/users
router.route('/').get(getAllUsers).post(createUser);

// http://localhost:5001/api/v0/posts
router.route('/posts').get(getAllPosts).post(createPost);

export default router;
