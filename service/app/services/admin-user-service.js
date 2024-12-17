import AdminUser from '../models/admin-user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * Registers a new admin user.
 * @param {Object} adminUser - The admin user object containing the user details.
 * @param {string} adminUser.username - The username of the admin user.
 * @param {string} adminUser.password - The password of the admin user.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success message.
 * @throws {Error} - If the admin user is not created.
 */
export const register = async (adminUser) => {
  const salt = await bcrypt.genSalt(10);
  adminUser.password = await bcrypt.hash(adminUser.password, salt);

  const res = await AdminUser.create(adminUser);

  if (!res) {
    throw new Error('Admin User not created');
  }

  return { message: 'User created', success: true };
};

/**
 * Logs in an admin user.
 * @param {Object} adminUser - The admin user object containing email and password.
 * @returns {Object} - An object containing the login success status, message, token, and user details.
 * @throws {Error} - If the admin user is not found or the password is invalid.
 */
export const login = async (adminUser) => {
  const user = await AdminUser.findOne({ email: adminUser.email });
  if (!user) {
    throw new Error('Admin User not found');
  }

  const isPasswordValid = await bcrypt.compare(adminUser.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: 2592000,
  });

  return {
    success: true,
    message: 'Admin user logged in',
    token: 'Bearer ' + token,
    user: {
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

/**
 * Updates an admin user with the provided updated fields.
 * @param {Object} adminUser - The admin user object to be updated.
 * @param {Object} updatedFields - The fields to be updated in the admin user object.
 * @returns {Object} - An object containing the updated admin user information and a token.
 * @throws {Error} - If no fields to update or if admin user is not updated.
 */
export const update = async (adminUser, updatedFields) => {
  if (!updatedFields) {
    throw new Error('No fields to update');
  }

  if (updatedFields.password) {
    const salt = await bcrypt.genSalt(10);
    updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
  }

  const res = await AdminUser.updateOne({ _id: adminUser._id }, updatedFields);

  const user = await AdminUser.findById(adminUser._id);

  if (!res) {
    throw new Error('Admin User not updated');
  }

  const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: 2592000,
  });

  return {
    message: 'Admin User updated',
    success: true,
    token: 'Bearer ' + token,
    user: {
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
  };
};

/**
 * Deletes an admin user from the database.
 *
 * @param {Object} adminUser - The admin user object to be deleted.
 * @param {string} adminUser.email - The email of the admin user to be deleted.
 * @returns {Promise<Object>} - A promise that resolves to an object with a message and success status.
 * @throws {Error} - If the admin user is not deleted.
 */
export const deleteAdminUser = async (adminUser) => {
  const res = await AdminUser.deleteOne({ email: adminUser.email });

  if (!res) {
    throw new Error('Admin User not deleted');
  }

  return { message: 'Admin User deleted', success: true };
};

/**
 * Retrieves an admin user by their ID.
 *
 * @param {string} id - The ID of the admin user.
 * @returns {Promise<Object>} - A promise that resolves to the admin user object.
 * @throws {Error} - If the admin user is not found.
 */
export const getAdminUserById = async (id) => {
  const res = await AdminUser.findById(id);

  if (!res) {
    throw new Error('Admin User not found');
  }

  return res;
};
