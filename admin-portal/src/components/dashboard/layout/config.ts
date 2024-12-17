import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'customers', title: 'Customers', href: paths.dashboard.customers, icon: 'users' },
  { key: 'posts', title: 'Posts', href: paths.dashboard.posts, icon: 'note' },
  { key: 'reports', title: 'Flagged Posts', href: paths.dashboard.reports, icon: 'flag' },
  { key: 'account', title: 'Account', href: paths.dashboard.account, icon: 'user' },
] satisfies NavItemConfig[];
