import { LoginReq, LoginRes, RegisterReq, RegisterRes } from "@/models/login/login";
import { apiSlice } from "../baseApiSlice";
import User from "@/models/user-model";
import { getAuthToken } from "@/lib/cookies";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginRes, LoginReq>({
      query: (user) => ({
        url: "/users/login",
        method: "POST",
        body: user,
      }),
    }),
    register: build.mutation<RegisterRes, any>({
      query: (note) => ({
        url: "/users/register",
        method: "POST",
        body: note,
      }),
    }),
    updateUser: build.mutation({
      query: (id: number) => ({
        url: `/users/deletenote/${id}`,
        method: "DELETE",
      }),
    }),
    deleteUser: build.mutation({
      query: (id: number) => ({
        url: `/users/deletenote/${id}`,
        method: "DELETE",
      }),
    }),
    getUserContext: build.query<User, { skip?: boolean }>({
      query: (options = {}) => ({
        url: "/users/context",
        headers: {
          Authorization: getAuthToken(),
        },
        skip: options.skip,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserContextQuery,
} = authApi;
