import { AUTH_TOKEN_USER } from "@/test";
import { apiSlice } from "../baseApiSlice";

const AUTH_TOKEN = AUTH_TOKEN_USER;

export interface CreateReportRequest {
  description: string;
  postId: string;
}

export const reportApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createReport: build.mutation<any, CreateReportRequest>({
      query: (body) => ({
        url: "/reports/create",
        method: "POST",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
  }),
});

export const { useCreateReportMutation } = reportApi;
