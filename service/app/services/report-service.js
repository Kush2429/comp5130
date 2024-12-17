import Report from '../models/report.js';
import * as PostService from './post-service.js';
import * as UserService from './user-service.js';
import { sendEmail } from '../utils/azureUtils.js';
import { renderReportCreationEmail } from '../templates/report-templates.js';
import logger from '../utils/logger.js';

/**
 * Creates a new report.
 * @param {Object} report - The report object.
 * @param {string} report.postId - The ID of the post being reported.
 * @param {Object} report.user - The user object who is creating the report.
 * @param {string} report.user._id - The ID of the user creating the report.
 * @param {string} report.user.email - The email of the user creating the report.
 * @param {string} report.user.name - The name of the user creating the report.
 * @returns {Object} - The result of the report creation.
 * @throws {Error} - If the post being reported is the user's own post.
 * @throws {Error} - If the post being reported is not found.
 * @throws {Error} - If the post being reported is already deactivated.
 * @throws {Error} - If the post being reported needs to be approved before reporting.
 * @throws {Error} - If a report already exists for the post by the same user.
 * @throws {Error} - If the report creation fails.
 */
export const createReport = async (report) => {
  report.post = await PostService.getPostById(report.postId);

  if (report.post.user.toString() === report.user._id.toString()) {
    throw new Error('Cannot report your own post');
  }

  if (!report.post) {
    throw new Error('Post not found');
  }

  if (!report.post.active) {
    throw new Error('Post is already deactivated');
  }

  if (!report.post.approved) {
    throw new Error('Post needs to be approved before reporting');
  }

  // check if the user has already reported the post
  const existingReport = await Report.findOne({ user: report.user, post: report.post });

  if (existingReport) {
    throw new Error(`Report already exists for this post by ${report.user.email}`);
  }

  const res = await Report.create(report);

  if (!res) {
    throw new Error('Report not created');
  }

  sendEmail(
    [report.user.email],
    'New Report',
    'A new report has been created',
    renderReportCreationEmail(report.user.name, report, report.post)
  );
  return { message: 'Report created', success: true };
};

/**
 * Retrieves reports for a specific user.
 *
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of reports.
 * @throws {Error} - If reports are not found.
 */
export const getUserReports = async (userId) => {
  const res = await Report.find({ user: userId });

  if (!res) {
    throw new Error('Reports not found');
  }

  return res;
};

/**
 * Retrieves the reports associated with a specific post.
 *
 * @param {string} postId - The ID of the post.
 * @returns {Promise<Array>} - A promise that resolves to an array of reports.
 * @throws {Error} - If no reports are found.
 */
export const getPostReports = async (postId) => {
  const res = await Report.find({ post: postId });

  if (!res) {
    throw new Error('Reports not found');
  }

  return res;
};

/**
 * Retrieves all reports based on the provided query.
 * @param {Object} query - The query object to filter the reports.
 * @returns {Promise<Array>} - A promise that resolves to an array of reports.
 */
export const getAllReports = async (query = {}) => {
  const res = [];
  try {
    // Find the user document based on the userEmail

    let user = null;
    if (query.userEmail) {
      user = await UserService.getUser({ email: query.userEmail });
    }
    if (user) {
      query.user = user._id;
      delete query.userEmail;
    }

    const res = await Report.find(query)
      .populate([
        { path: 'user', select: 'name email', model: 'User' },

        // get associated User details of the post
        {
          path: 'post',
          model: 'Post',
          populate: { path: 'user', select: 'name email' },
        },
        { path: 'handledBy', select: 'name email', model: 'AdminUser' },
      ])
      .sort({ createdAt: -1 });

    return res;
  } catch (error) {
    logger.error(error);
    return [];
  }
};

/**
 * Retrieves a report by its ID.
 *
 * @param {string} id - The ID of the report to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the retrieved report.
 * @throws {Error} - If the report is not found.
 */
export const getReportById = async (id) => {
  const res = await Report.findById(id);

  if (!res) {
    throw new Error('Report not found');
  }

  return res;
};

/**
 * Deletes reports with the specified IDs.
 * @param {Array|string} ids - The IDs of the reports to delete. If only one ID is passed, it will be converted to an array.
 * @returns {Promise<Object>} - A promise that resolves to an object containing a success message.
 * @throws {Error} - If the reports are not deleted.
 */
export const deleteReports = async (ids = []) => {
  // if only one ID is passed, convert it to an array
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  const res = await Report.deleteMany({ _id: { $in: ids } });

  if (!res) {
    throw new Error('Report not deleted');
  }

  return { message: 'Report deleted', success: true };
};

/**
 * Handles a report by updating its status and related information.
 * @param {string} id - The ID of the report.
 * @param {object} handledBy - The user who handles the report.
 * @param {string} status - The new status of the report (either 'approved' or 'rejected').
 * @returns {object} - An object containing a message and success status.
 * @throws {Error} - If any required fields are missing, the status is invalid, the user is not an admin, or the report is not found or not handled.
 */
export const handleReport = async (id, handledBy, status) => {
  if (!id || !handledBy || !status) {
    throw new Error('Missing required fields');
  }

  if (!['approved', 'rejected'].includes(status)) {
    throw new Error('Invalid status');
  }

  // Only admin can handle reports
  if (handledBy.collection.modelName !== 'AdminUser') {
    throw new Error('Only admin can handle reports');
  }

  // Fetch the report record along with the post ID
  const report = await Report.findById(id).select('post').lean();

  if (!report) {
    throw new Error('Report not found');
  }

  // Update the report status and get the updated document
  const updatedReport = await Report.findByIdAndUpdate(
    id,
    { status, handledBy, handledAt: new Date() },
    { new: true }
  ).lean();

  if (!updatedReport) {
    throw new Error('Report not handled');
  }

  // If status is approved, deactivate the post
  if (status === 'approved' && report.post) {
    await PostService.deactivatePost(report.post._id);

    await Report.updateMany(
      { post: report.post._id },
      { status: 'approved', handledBy, handledAt: new Date() }
    );
  }

  return { message: `Report ${status}`, success: true };
};
