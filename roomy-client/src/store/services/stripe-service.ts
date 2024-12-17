import { AUTH_TOKEN_USER } from "@/test";
import { apiSlice } from "../baseApiSlice";

const AUTH_TOKEN = AUTH_TOKEN_USER;

interface SubscriptionStatus {
  active: boolean;
}

const striptApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCheckoutSession: build.mutation<any, void>({
      query: () => ({
        url: "payments/create-stripe-session-subscription",
        method: "POST",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
    }),
    getActiveSubscription: build.query<SubscriptionStatus, void>({
      query: () => ({
        url: "payments/get-active-subscription",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: any) => {
        const active: SubscriptionStatus = {
          active: response.success,
        };
        return active;
      },
    }),
  }),
});

export const {
  useCreateCheckoutSessionMutation,
  useGetActiveSubscriptionQuery,
  useLazyGetActiveSubscriptionQuery,
} = striptApi;
