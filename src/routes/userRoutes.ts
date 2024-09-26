import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/userController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getUsers);
router.route('/:id').get(protect, getUserById).put(protect, updateUser).delete(protect, deleteUser);

export default router;
