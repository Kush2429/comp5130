import { AdminUser } from './admin-user';

export interface Post {
  _id: string;
  title: string;
  description: string;
  active: boolean;
  photos: { url: string; _id: string }[];
  utilities: string[];
  amenities: string[];
  user: {
    _id: string;
    email: string;
    name: string;
  };
  approved: boolean;
  createdAt: string;
  startDateRange: string;
  price: number;
  bedCount: number;
  bathCount: number;
  streetAddress: string;
  unitNo: string;
  city: string;
  stateCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  approvedAt: string;
  approvedBy: AdminUser;
  __v: number;
}
