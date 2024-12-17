interface User {
  email: string;
  name: string;
  password: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
}
export default User;
