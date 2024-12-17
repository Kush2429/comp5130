import AdminUserRouter from './admin-user-routes.js';
import UserRouter from './user-routes.js';
import PostRouter from './post-routes.js';
import ReportRouter from './report-routes.js';
import PaymentSubscriptionRouter from './payment-subscription-routes.js';
import DashboardRouter from './dashboard-routes.js';

/**
 * Initializes the routes for the application.
 * @param {Object} app - The Express application object.
 */
const ininializeRoutes = (app) => {
  app.use('/users', UserRouter);
  app.use('/admin-users', AdminUserRouter);
  app.use('/posts', PostRouter);
  app.use('/reports', ReportRouter);
  app.use('/payments', PaymentSubscriptionRouter);
  app.use('/dashboard', DashboardRouter);
};

export default ininializeRoutes;
