export interface AdminUser {
  _id: string;
  name?: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;

  [key: string]: unknown;
}
