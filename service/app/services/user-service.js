import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { sendEmail } from '../utils/azureUtils.js';
import { renderWelcomeEmail } from '../templates/user-templates.js';
import * as PostService from './post-service.js';

/**
 * Registers a new user.
 *
 * @param {Object} user - The user object containing user details.
 * @param {string} user.email - The email of the user.
 * @param {string} user.password - The password of the user.
 * @param {string} user.name - The name of the user.
 * @returns {Object} - An object with a message and success status.
 * @throws {Error} - If the user already exists or if the user is not created.
 */
export const register = async (user) => {
  const existingUser = await User.findOne({ email: user.email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  const res = await User.create(user);

  if (!res) {
    throw new Error('User not created');
  }

  sendEmail(
    [user.email],
    'Welcome',
    'Welcome to our platform',
    renderWelcomeEmail(user.name)
  );
  return { message: 'User created', success: true };
};

/**
 * Logs in a user.
 * @param {Object} user - The user object containing email and password.
 * @returns {Promise<Object>} - A promise that resolves to an object with success, message, and token properties.
 * @throws {Error} - If the user is not found or the password is invalid.
 */
export const login = async (user) => {
  const userFromDb = await User.findOne({ email: user.email });
  if (!userFromDb) {
    throw new Error('User not found');
  }

  const isPasswordValid = await bcrypt.compare(user.password, userFromDb.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { id: userFromDb._id, email: userFromDb.email },
    process.env.JWT_SECRET,
    {
      expiresIn: 2592000,
    }
  );

  return { success: true, message: 'User logged in', token: 'Bearer ' + token };
};

/**
 * Updates a user with the provided updated fields.
 *
 * @param {Object} user - The user object to be updated.
 * @param {Object} updatedFields - The fields to be updated in the user object.
 * @returns {Promise<Object>} - A promise that resolves to an object with a message and success status.
 * @throws {Error} - If the user is not updated.
 */
export const update = async (user, updatedFields) => {
  if (updatedFields.password) {
    const salt = await bcrypt.genSalt(10);
    updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
  }

  const res = await User.updateOne({ email: user.email }, updatedFields);

  if (!res) {
    throw new Error('User not updated');
  }

  return { message: 'User updated', success: true };
};

/**
 * Deletes a user and all their associated posts.
 * @param {string} userId - The ID of the user to delete.
 * @returns {Promise<{ message: string, success: boolean }>} - A promise that resolves to an object with a message and success status.
 * @throws {Error} - If the user is not deleted.
 */
export const deleteUser = async (userId) => {
  // get all posts by user

  const user = await User.findById(userId);
  const posts = await PostService.getUserPosts(user._id);

  // delete all posts by user
  posts.forEach(async (post) => {
    await PostService.deletePost(post._id);
  });

  const res = await User.deleteOne({ email: user.email });

  if (!res) {
    throw new Error('User not deleted');
  }

  return { message: 'User deleted', success: true };
};

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<object>} The user object.
 * @throws {Error} If the user with the specified ID is not found.
 */
export const getUserById = async (id) => {
  const res = await User.findById(id);

  if (!res) {
    throw new Error('User not found by id');
  }

  return res;
};
/**
 * Retrieves a user based on the provided query.
 * @param {object} query - The query object used to find the user.
 * @returns {Promise<object>} The user object.
 * @throws {Error} If the user matching the query is not found.
 */
export const getUser = async (query) => {
  const res = await User.findOne(query);

  if (!res) {
    throw new Error('User not found getUser');
  }

  return res;
};

/**
 * Retrieves all users based on the provided query.
 * @param {object} [query={}] - The query object used to filter users.
 * @returns {Promise<object[]>} An array of user objects.
 * @throws {Error} If no users are found.
 */

export const getAllUsers = async (query = {}) => {
  const res = await User.aggregate([
    {
      $match: query,
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'user',
        as: 'posts',
      },
    },
    {
      $lookup: {
        from: 'paymentsubscriptions',
        localField: '_id',
        foreignField: 'user',
        as: 'paymentSubscription',
      },
    },
    {
      $project: {
        _id: 1,
        email: 1,
        name: 1,
        numberOfPosts: { $size: '$posts' },
        paymentSubscriptions: '$paymentSubscription',
      },
    },
  ]);

  if (!res) {
    throw new Error('Users not found');
  }

  // set subscription status if status === active and endDate > new Date().getTime()
  res.forEach((user) => {
    user.paymentSubscriptions.forEach((subscription) => {
      if (
        subscription.status === 'active' &&
        subscription.endDate > new Date().getTime()
      ) {
        user.subscriptionStatus = 'active';
      }
    });

    if (!user.subscriptionStatus) {
      user.subscriptionStatus = 'inactive';
    }

    delete user.paymentSubscriptions;
  });

  return res;
};

/**
 * Retrieves users created within the last 30 days.
 * @returns {Promise<object[]>} An array of user objects created within the last 30 days.
 * @throws {Error} If no users are found.
 */
export const getUsersCreatedLast30Days = async () => {
  const res = await User.find({
    createdAt: {
      $gte: new Date(new Date().setDate(new Date().getDate() - 30)),
    },
  });

  if (!res) {
    throw new Error('Users not found');
  }

  return res;
};

/**
 * Retrieves users created between the specified start and end dates.
 * @param {Date} startDate - The start date.
 * @param {Date} endDate - The end date.
 * @returns {Promise<object[]>} An array of user objects created between the specified dates.
 * @throws {Error} If no users are found.
 */
export const getUsersCreatedBetween = async (startDate, endDate) => {
  const res = await User.find({
    createdAt: {
      $gte: startDate,
      $lte: endDate,
    },
  });

  if (!res) {
    throw new Error('Users not found');
  }

  return res;
};
