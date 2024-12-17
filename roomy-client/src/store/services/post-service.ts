import { getAuthToken } from "@/lib/cookies";
import { apiSlice } from "../baseApiSlice";
import { FilterInitialState } from "../slices/postFilter-slice";
import { AUTH_TOKEN_USER } from "@/test";

const AUTH_TOKEN = AUTH_TOKEN_USER;

export interface Post {
  title: string;
  phoneNumber: string;
  streetAddress: string;
  unitNo: string;
  city: string;
  stateCode: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  startDateRange: Date;
  price: number;
  bedCount: number;
  bathCount: number;
  utilities?: string[];
}
interface CompletePostDetails extends Post {
  _id: string;
  active: boolean;
  photos: Photo[];
}
interface UserPosts extends CompletePostDetails {
  approved: boolean;
}
interface Photo {
  url: string;
  _id: string;
}

export interface UpdatePostRequest {
  id: string;
  startDateRange: string;
  price: number;
  bedCount: number;
  bathCount: number;
}

export const postApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<CompletePostDetails[], FilterInitialState>({
      query: (filterDetails) => ({
        url: "/posts",
        headers: {
          Authorization: getAuthToken(),
        },
        params: {
          city: filterDetails.city,
          bathCount: filterDetails.bathCount,
          bedCount: filterDetails.bedCount,
          priceMax: filterDetails.priceMax,
          priceMin: filterDetails.priceMin,
          startDateRange: filterDetails.startDateRange,
        },
      }),
      transformResponse: (response: any) => {
        const data = "data";
        return response.map((post: any) => ({
          _id: post._id,
          title: post.title,
          phoneNumber: post.phoneNumber,
          streetAddress: post.streetAddress,
          unitNo: post.unitNo,
          city: post.city,
          stateCode: post.stateCode,
          zipCode: post.zipCode,
          latitude: post.latitude,
          longitude: post.longitude,
          startDateRange: new Date(post.startDateRange),
          price: post.price,
          bedCount: post.bedCount,
          bathCount: post.bathCount,
          active: post.active,
          photos: post.photos,
        })) as CompletePostDetails[];
      },
    }),
    createPost: build.mutation<any, FormData>({
      query: (body) => ({
        url: "/posts/create",
        method: "POST",
        body,
        headers: {
          Authorization: AUTH_TOKEN,
        },
        formdata: true,
      }),
    }),
    getPostById: build.query<CompletePostDetails, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: any) => {
        console.log(response, "response");
        return {
          _id: response._id,
          title: response.title,
          phoneNumber: response.phoneNumber,
          streetAddress: response.streetAddress,
          unitNo: response.unitNo,
          city: response.city,
          stateCode: response.stateCode,
          zipCode: response.zipCode,
          latitude: response.latitude,
          longitude: response.longitude,
          startDateRange: new Date(response.startDateRange),
          price: response.price,
          bedCount: response.bedCount,
          bathCount: response.bathCount,
          active: response.active,
          photos: response.photos,
          utilities: response.utilities,
        } as CompletePostDetails;
      },
    }),
    getMyPosts: build.query<UserPosts[], void>({
      query: () => ({
        url: "/posts/user-posts",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      transformResponse: (response: any) => {
        return response.map((post: any) => ({
          _id: post._id,
          title: post.title,
          phoneNumber: post.phoneNumber,
          streetAddress: post.streetAddress,
          unitNo: post.unitNo,
          city: post.city,
          stateCode: post.stateCode,
          zipCode: post.zipCode,
          latitude: post.latitude,
          longitude: post.longitude,
          startDateRange: new Date(post.startDateRange),
          price: post.price,
          bedCount: post.bedCount,
          bathCount: post.bathCount,
          active: post.active,
          photos: post.photos,
          approved: post.approved,
        })) as UserPosts[];
      },
      providesTags: ["Post"],
    }),
    deletePost: build.mutation<any, string>({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      invalidatesTags: ["Post"],
    }),
    updatePost: build.mutation<any, UpdatePostRequest>({
      query: (body) => ({
        url: `/posts/${body.id}`,
        method: "PUT",
        body: {
          startDateRange: body.startDateRange,
          price: body.price,
          bedCount: body.bedCount,
          bathCount: body.bathCount,
        },
        headers: {
          Authorization: AUTH_TOKEN,
        },
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} = postApi;
