import { type AdminUser } from './admin-user';
import { type Post } from './post';
import { type User } from './user';

export interface Report {
  _id: string;
  description: string;
  post: Post;
  user: User;
  status: string;
  handledBy: AdminUser | null;
  handledAt: Date | null;
  createdAt: Date;
}
