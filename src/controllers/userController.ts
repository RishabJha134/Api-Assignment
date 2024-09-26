import { Request, Response } from 'express';
import User from '../models/userModel';

// Get all users with pagination and sorting
export const getUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, sortBy = 'name' } = req.query;

  try {
    const users = await User.find()
      .sort({ [sortBy]: 1 }) // Sorting based on the query parameter
      .skip((Number(page) - 1) * Number(limit)) // Skipping for pagination
      .limit(Number(limit)); // Limit the number of results

    const totalUsers = await User.countDocuments(); // Total count of users

    res.json({
      total: totalUsers,
      page: Number(page),
      limit: Number(limit),
      users,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

// Update user
export const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  const updatedUser = await user.save();
  res.json(updatedUser);
};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  await user.remove();
  res.json({ message: 'User removed' });
};
