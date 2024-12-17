export interface User {
  _id: string;
  name: string;
  email: string;
  firstName?: string;
  lastName?: string;

  [key: string]: unknown;
}
