import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Address } from "../services/address-service";
import { loadState, removeState, saveState } from "@/utils/addListing-local";
import { openModal } from "./modal-slice";

export enum FacilitiesEnum {
  Heat = "Heat",
  Water = "Water",
  Electricity = "Electricity",
  Gas = "Gas",
}
type StepInfo = number;

export type BasicInfo = {
  title: string;
  phoneNumber: string;
  streetAddress: Address;
  moveInDate: string;
};

type PhotosInfo = {
  photos: string[];
};

type RoomDetails = {
  rent: number;
  bath: number;
  bed: number;
  facilities: string[];
  laundry: boolean;
};

type InitialState = {
  isModalOpen: boolean;
  step: StepInfo;
  basicInfo: BasicInfo;
  photosInfo: PhotosInfo;
  roomDetails: RoomDetails;
};
const initialState: InitialState = loadState("addListingState") || {
  isModalOpen: false,
  step: 0,
  basicInfo: {
    title: "",
    phoneNumber: "",
    streetAddress: {
      streetAddress: "",
      unitNo: "",
      city: "",
      stateCode: "",
      zipCode: "",
      latitude: 0,
      longitude: 0,
    },
    moveInDate: "",
  },
  photosInfo: {
    photos: [],
  },
  roomDetails: {
    rent: 0,
    bath: 0,
    bed: 0,
    facilities: [],
    laundry: false,
  },
};
const addListingSlice = createSlice({
  name: "addListing",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<StepInfo>) => {
      state.step = action.payload;
      saveState("addListingState", state);
    },
    setBasicInfo: (state, action: PayloadAction<BasicInfo>) => {
      state.basicInfo = action.payload;
      saveState("addListingState", state);
    },
    setPhotosInfo: (state, action: PayloadAction<PhotosInfo>) => {
      state.photosInfo = action.payload;
      console.log(state.photosInfo.photos, "photos info from slice");
    },
    addPhotoInfo: (state, action: PayloadAction<string>) => {
      state.photosInfo.photos.push(action.payload);
      console.log(state.photosInfo.photos, "photos info from slice");
      saveState("addListingState", state);
    },

    setRoomDetails: (state, action: PayloadAction<RoomDetails>) => {
      state.roomDetails = action.payload;
      saveState("addListingState", state);
    },
    //set RoomDetails individually to update the state
    setRentInfo(state, action: PayloadAction<number>) {
      state.roomDetails.rent = action.payload;
      saveState("addListingState", state);
    },
    setBathInfo(state, action: PayloadAction<number>) {
      state.roomDetails.bath = action.payload;
      saveState("addListingState", state);
    },
    setBedInfo(state, action: PayloadAction<number>) {
      state.roomDetails.bed = action.payload;
      saveState("addListingState", state);
    },
    setFacilities(state, action: PayloadAction<string[]>) {
      state.roomDetails.facilities = action.payload;
      saveState("addListingState", state);
    },
    setLaundry(state, action: PayloadAction<boolean>) {
      state.roomDetails.laundry = action.payload;
      saveState("addListingState", state);
    },
    setAddress(state, action: PayloadAction<Address>) {
      state.basicInfo.streetAddress = action.payload;
      saveState("addListingState", state);
    },
    setCityName(state, action: PayloadAction<string>) {
      state.basicInfo.streetAddress.city = action.payload;
      console.log(state.basicInfo.streetAddress.city, "city name from slice");
      // saveState("addListingState", state);
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
    },
    openModalOnClick(state) {
      state.isModalOpen = true;
    },
    closeModalOnClick(state) {
      state.isModalOpen = false;
    },
    resetSlice(_state) {
      removeState("addListingState");
      // return initialState;
    },
  },
});

export const {
  setStep,
  setBasicInfo,
  setPhotosInfo,
  addPhotoInfo,
  setRoomDetails,
  setAddress,
  setRentInfo,
  setBathInfo,
  setBedInfo,
  setFacilities,
  setLaundry,
  resetSlice,
  setCityName,
  setIsModalOpen,
  openModalOnClick,
  closeModalOnClick,
} = addListingSlice.actions;

export default addListingSlice.reducer;
