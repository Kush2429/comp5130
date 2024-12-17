import * as UserService from './user-service.js';
import * as PostService from './post-service.js';
import * as ReportService from './report-service.js';
import { getSubscriptions, getStripeBalance } from '../utils/stripeUtils.js';

export const getDashboardData = async () => {
  const users = await UserService.getAllUsers();

  // Get the current date and the date 60 days ago
  const currentDate = new Date();
  const dateSixtyDaysAgo = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Query to get users created in the last 30 days
  const usersCreatedLast30Days = await UserService.getUsersCreatedBetween(
    new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000),
    currentDate
  );

  // Query to get users created between 30 and 60 days ago
  const usersPrevious30Days = await UserService.getUsersCreatedBetween(
    dateSixtyDaysAgo,
    new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
  );

  const subscribedUsers = users.filter((user) => user.subscriptionStatus === 'active');
  const subscribedUsersCount = subscribedUsers.length;
  const usersCount = users.length;
  const usersCreatedLast30DaysCount = usersCreatedLast30Days.length;

  let increaseOrDecreasePercentage = 0;
  if (usersPrevious30Days.length > 0) {
    const percentageDiff =
      ((usersCreatedLast30DaysCount - usersPrevious30Days.length) /
        usersPrevious30Days.length) *
      100;
    increaseOrDecreasePercentage = Math.abs(percentageDiff).toFixed(1);
  }

  // Posts data
  const posts = await PostService.getAllPosts();
  const postCreatedLast30Days = posts.filter(
    (post) => post.createdAt > new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
  );
  const postPrevious30Days = posts.filter((post) => {
    const date30DaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const date60DaysAgo = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);

    return post.createdAt > date60DaysAgo && post.createdAt < date30DaysAgo;
  });
  let increaseOrDecreasePercentagePosts = 0;
  if (postPrevious30Days.length > 0) {
    const percentageDiffPosts =
      ((postCreatedLast30Days.length - postPrevious30Days.length) /
        postPrevious30Days.length) *
      100;
    increaseOrDecreasePercentagePosts = Math.abs(percentageDiffPosts).toFixed(1);
  }
  const pendingPosts = await PostService.getAllPosts({ approved: false });

  // Reports data
  const reports = await ReportService.getAllReports();
  const pendingReports = await ReportService.getAllReports({ status: 'pending' });
  const reportsCreatedLast30Days = reports.filter(
    (report) =>
      report.createdAt > new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000)
  );
  const reportsPrevious30Days = reports.filter((report) => {
    const date30DaysAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000);
    const date60DaysAgo = new Date(currentDate.getTime() - 60 * 24 * 60 * 60 * 1000);

    return report.createdAt > date60DaysAgo && report.createdAt < date30DaysAgo;
  });
  let increaseOrDecreasePercentageReports = 0;
  if (reportsPrevious30Days.length > 0) {
    const percentageDiffReports =
      ((reportsCreatedLast30Days.length - reportsPrevious30Days.length) /
        reportsPrevious30Days.length) *
      100;
    increaseOrDecreasePercentageReports = Math.abs(percentageDiffReports).toFixed(1);
  }

  // Payment data
  const paymentSubscriptions = await getSubscriptions();
  const stripeBalance = await getStripeBalance();
  const totalPendingBalance = stripeBalance.pending?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalPendingBalanceUsd = (totalPendingBalance / 100).toFixed(2);
  const totalAvailableBalance = stripeBalance.available?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalAvailableBalanceUsd = (totalAvailableBalance / 100).toFixed(2);

  const postsYearByYear = [
    {
      name: 'This year',
      data: posts
        .filter((post) => {
          return (
            post.createdAt >= new Date(new Date().getFullYear(), 0, 1) &&
            post.createdAt < new Date(new Date().getFullYear(), 11, 31)
          );
        })
        .reduce((acc, curr) => {
          acc[curr.createdAt.getMonth()] = (acc[curr.createdAt.getMonth()] || 0) + 1;
          return acc;
        }, new Array(12).fill(0)),
    },
    {
      name: 'Last year',
      data: posts
        .filter((post) => {
          return (
            post.createdAt >= new Date(new Date().getFullYear() - 1, 0, 1) &&
            post.createdAt < new Date(new Date().getFullYear() - 1, 11, 31)
          );
        })
        .reduce((acc, curr) => {
          acc[curr.createdAt.getMonth()] = (acc[curr.createdAt.getMonth()] || 0) + 1;
          return acc;
        }, new Array(12).fill(0)),
    },
  ];

  return {
    usersCount,
    subscribedUsersCount,
    usersCreatedLast30DaysCount,
    trend: usersCreatedLast30DaysCount > usersPrevious30Days.length ? 'up' : 'down',
    increaseOrDecreasePercentage,
    postsCount: posts.length,
    postsCreatedLast30DaysCount: postCreatedLast30Days.length,
    increaseOrDecreasePercentagePosts,
    trendPosts: postCreatedLast30Days.length > postPrevious30Days.length ? 'up' : 'down',
    pendingPostsCount: pendingPosts.length,
    reportsCount: reports.length,
    pendingReportsCount: pendingReports.length,
    reportsCreatedLast30DaysCount: reportsCreatedLast30Days.length,
    increaseOrDecreasePercentageReports,
    trendReports:
      reportsCreatedLast30Days.length > reportsPrevious30Days.length ? 'up' : 'down',
    paymentSubscriptionsCount: paymentSubscriptions.data.length,
    totalAvailableBalance: totalAvailableBalanceUsd,
    totalPendingBalance: totalPendingBalanceUsd,
    postsYearByYear,
  };
};
