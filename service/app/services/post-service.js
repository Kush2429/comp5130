import Post from '../models/post.js';
import {
  renderPostApprovalEmail,
  renderPostCreationEmail,
  renderPostDeactivationEmail,
} from '../templates/post-templates.js';
import { sendEmail, uploadPhotos } from '../utils/azureUtils.js';
import User from '../models/user.js';
import * as ReportService from './report-service.js';

/**
 * Creates a new post.
 * @param {Object} post - The post object containing the post details.
 * @returns {Promise<Object>} - A promise that resolves to an object with a success message.
 * @throws {Error} - If the post is not created.
 */
export const createPost = async (post) => {
  const photos = post.photos;
  const res = new Post(post);
  const photoUrls = await uploadPhotos(res._id, photos);
  res.photos = photoUrls;
  await res.save();

  if (!res) {
    throw new Error('Post not created');
  }

  sendEmail(
    [res.user.email],
    'New Post',
    'A new post has been created',
    renderPostCreationEmail(res.user.name, post.title)
  );
  return { message: 'Post created', success: true };
};

/**
 * Retrieves posts for a given user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 * @throws {Error} - If posts are not found.
 */
export const getUserPosts = async (userId) => {
  const res = await Post.find({ user: userId });

  if (!res) {
    throw new Error('Posts not found');
  }

  return res;
};

/**
 * Retrieves all posts based on the provided query.
 * If a user email is provided in the query, it retrieves the user associated with that email and updates the query accordingly.
 * Populates the 'user' field with the user's name and email.
 * Populates the 'approvedBy' field with the admin user's first name, last name, and email.
 * Sorts the posts by createdAt in descending order.
 * @param {Object} query - The query object to filter the posts.
 * @param {string} query.userEmail - The email of the user to filter the posts by.
 * @returns {Promise<Array>} - A promise that resolves to an array of posts.
 * @throws {Error} - If no posts are found.
 */
export const getAllPosts = async (query = {}) => {
  if (query.userEmail) {
    const user = await User.findOne({ email: query.userEmail });
    if (!user) {
      return [];
    }
    query.user = user._id;
    delete query.userEmail;
  }

  // get all associated users and sort by latest first
  const posts = await Post.find(query)
    .populate('user', 'name email')
    .populate('approvedBy', 'firstName lastName email', 'AdminUser')
    .sort({ createdAt: -1 });
  //

  if (!posts) {
    throw new Error('Posts not found');
  }

  return posts;
};

/**
 * Retrieves a post by its ID.
 *
 * @param {string} id - The ID of the post.
 * @returns {Promise<Object>} - A promise that resolves to the post object.
 * @throws {Error} - If the post ID is not provided or if the post is not found.
 */
export const getPostById = async (id) => {
  if (!id) throw new Error('Post ID is required');

  const res = await Post.findById(id);

  if (!res) {
    throw new Error('Post not found');
  }

  return res;
};

/**
 * Updates a post with the given ID using the provided updated fields.
 * @param {string} id - The ID of the post to be updated.
 * @param {object} updatedFields - The updated fields for the post.
 * @returns {Promise<{ message: string, success: boolean }>} - A promise that resolves to an object containing a message and success status.
 * @throws {Error} - If the post is not updated.
 */
export const updatePost = async (id, updatedFields) => {
  const res = await Post.updateOne({ _id: id }, updatedFields);

  if (!res) {
    throw new Error('Post not updated');
  }

  return { message: 'Post updated', success: true };
};

/**
 * Deletes a post and its associated reports.
 * @param {string} id - The ID of the post to be deleted.
 * @returns {Promise<{ message: string, success: boolean }>} - A promise that resolves to an object with a success message and a success flag.
 * @throws {Error} - If the post is not deleted.
 */
export const deletePost = async (id) => {
  const res = await Post.deleteOne({ _id: id });

  // delete associated reports
  const reports = await ReportService.getPostReports(id);
  await ReportService.deleteReports(reports.map((report) => report._id));

  if (!res) {
    throw new Error('Post not deleted');
  }

  return { message: 'Post deleted', success: true };
};

/**
 * Approves a post.
 *
 * @param {string} id - The ID of the post to be approved.
 * @param {object} approvedBy - The user who is approving the post.
 * @returns {Promise<object>} - A promise that resolves to an object containing the approval status and message.
 * @throws {Error} - If the user is not an admin or if the post is not approved.
 */
export const approvePost = async (id, approvedBy) => {
  if (!id) {
    throw new Error('Post ID is required');
  }

  // only admin can approve posts
  if (approvedBy.collection.modelName !== 'AdminUser') {
    throw new Error('Only admin can approve posts');
  }

  const post = await Post.findById(id);
  if (!post) {
    throw new Error('Post not found');
  }

  if (post.approved) {
    throw new Error('Post already approved');
  }

  if (!post.active) {
    throw new Error('Post is not active');
  }

  const res = await Post.updateOne(
    { _id: id },
    { approved: true, approvedBy: approvedBy, approvedAt: new Date() }
    // { approved: false, approvedBy: approvedBy, approvedAt: new Date() }
  );

  if (!res || res.nModified === 0) {
    throw new Error('Post not approved');
  }

  const user = await User.findById(post.user);

  sendEmail(
    [user.email],
    'Post Approved',
    'Your post has been approved',
    renderPostApprovalEmail(user.name, post.title)
  );

  return { message: 'Post approved', success: true };
};

/**
 * Deactivates a post by setting its 'active' property to false.
 * Sends an email notification to the post owner.
 * @param {string} id - The ID of the post to deactivate.
 * @returns {Promise<{ message: string, success: boolean }>} - A promise that resolves to an object containing a message and success status.
 * @throws {Error} - If the post is not deactivated.
 */
export const deactivatePost = async (id) => {
  const post = await Post.findById(id).populate('user', 'name email');
  const res = await Post.updateOne({ _id: id }, { active: false }, { new: true });

  if (!res || res.nModified === 0) {
    throw new Error('Post not deactivated');
  }

  sendEmail(
    [post.user.email],
    'Post Deactivated',
    'Your post has been deactivated',
    renderPostDeactivationEmail(post.user.name, post.title)
  );

  return { message: 'Post deactivated', success: true };
};
