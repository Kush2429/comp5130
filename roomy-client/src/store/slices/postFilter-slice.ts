import { createSlice } from "@reduxjs/toolkit";
 
export interface FilterInitialState {
  priceMax: number;
  priceMin: number;
  startDateRange: string;
  bathCount: number;
  bedCount: number;
  city: string;
}
const initialState: FilterInitialState = {
  priceMax: 99999999,
  priceMin: 0,
  startDateRange: "",
  bathCount: 0,
  bedCount: 0,
  city: "",
};
 
const postFilterSlice = createSlice({
  name: "postFilter",
  initialState,
  reducers: {
    setPriceMax: (state, action) => {
      state.priceMax = action.payload;
    },
    setPriceMin: (state, action) => {
      state.priceMin = action.payload;
    },
    setStartDateRange: (state, action) => {
      state.startDateRange = action.payload;
    },
    setBathCount: (state, action) => {
      state.bathCount = action.payload;
    },
    setBedCount: (state, action) => {
      state.bedCount = action.payload;
    },
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setAllValues: (state, action) => {
      state.priceMax = action.payload.priceMax;
      state.priceMin = action.payload.priceMin;
      state.startDateRange = action.payload.startDateRange;
      state.bathCount = action.payload.bathCount;
      state.bedCount = action.payload.bedCount;
      state.city = action.payload.city;
    },
  },
});
 
export const { setPriceMax, setPriceMin, setStartDateRange, setBathCount, setBedCount, setAllValues } =
  postFilterSlice.actions;
export default postFilterSlice.reducer;