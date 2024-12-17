import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product, productListApi } from "../services/productList-service";

type ProductState = {
  productDetails: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
};

const initialState: ProductState = {
  productDetails: [],
  status: "idle",
};

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProducts: (_state, { payload }) => {
      return payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(productListApi.endpoints.getProducts.matchFulfilled, (state, action) => {
      state.productDetails = action.payload;
      state.status = "succeeded";
    });
  },
});

export default productSlice.reducer;
