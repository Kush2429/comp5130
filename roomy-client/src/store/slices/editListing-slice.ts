import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { set } from "date-fns";

type InitialState = {
  propertyId: string;
  price: number;
  bathCount: number;
  bedCount: number;
  movinDate: Date;
};

const initialState: InitialState = {
  propertyId: "",
  price: 0,
  bathCount: 0,
  bedCount: 0,
  movinDate: new Date(),
};

const editListingSlice = createSlice({
  name: "editListing",
  initialState,
  reducers: {
    setPropertyId: (state, action: PayloadAction<string>) => {
      state.propertyId = action.payload;
    },
    setPrice: (state, action: PayloadAction<number>) => {
      state.price = action.payload;
    },
    setBathCount: (state, action: PayloadAction<number>) => {
      state.bathCount = action.payload;
    },
    setBedCount: (state, action: PayloadAction<number>) => {
      state.bedCount = action.payload;
    },
    setMovinDate: (state, action: PayloadAction<Date>) => {
      state.movinDate = action.payload;
    },
    setAll: (state, action: PayloadAction<InitialState>) => {
      state.bathCount = action.payload.bathCount;
      state.bedCount = action.payload.bedCount;
      state.movinDate = action.payload.movinDate;
      state.price = action.payload.price;
      state.propertyId = action.payload.propertyId;
    },
  },
});

export const { setPropertyId, setPrice, setBathCount, setBedCount, setMovinDate, setAll } =
  editListingSlice.actions;

export default editListingSlice.reducer;
