import express from 'express';

import {signupUser, loginUser} from '../controller/user-controller.js';
import {uploadImage,getImage} from '../controller/image-controller.js';
import {createPost,deletePost, updatePost, getAllPosts,getPost} from '../controller/post-controller.js'
import { newComment, getComments, deleteComment } from '../controller/comment-controller.js';
import { upload } from '../utils/upload.js';
import { authenticateToken, createNewToken } from '../controller/jwt-controller.js';


const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.post('/token', createNewToken);
router.post('/file/upload', upload.single('file'), uploadImage);
router.get('/file/:filename', getImage);
router.post('/create', authenticateToken, createPost);
router.get('/posts',getAllPosts);
router.get('/post/:id', getPost);
router.put('/update/:id', authenticateToken, updatePost);
router.delete('/delete/:id', authenticateToken, deletePost);
router.post('/comment/new', authenticateToken, newComment);
router.get('/comments/:id', authenticateToken, getComments);
router.delete('/comment/delete/:id', authenticateToken, deleteComment);

export default router; 

