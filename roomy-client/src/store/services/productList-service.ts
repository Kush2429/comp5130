import { apiSlice } from "../baseApiSlice";

export interface Product {
  _id: number;
  title: string;
  description: string;
  user: string;
}

export const productListApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query<Product[], void>({
      query: () => ({
        url: "/posts/all-posts",
      }),
    }),
  }),
});

export const { useGetProductsQuery } = productListApi;
