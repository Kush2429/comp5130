import { AUTH_TOKEN_USER } from "@/test";
import { apiSlice } from "../baseApiSlice";

const AUTH_TOKEN = AUTH_TOKEN_USER;

export interface User {
  _id: string;
  email: string;
  name: string;
  phone: string;
}
export interface UpdateUserReq {
  name: string;
  phone: string;
}

export const userApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, void>({
      query: () => ({
        url: "/users/context",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: User) => {
        const resTrans: User = {
          _id: response._id,
          email: response.email,
          name: response.name,
          phone: response.phone,
        };
        return resTrans;
      },
    }),
    updateUser: build.mutation<any, UpdateUserReq>({
      query: (body) => ({
        url: "/users/update",
        method: "PUT",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
