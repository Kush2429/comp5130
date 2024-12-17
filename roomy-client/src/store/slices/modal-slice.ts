import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isModalOpen: boolean;
};
const initialState: InitialState = {
  isModalOpen: true,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      console.log("closeModal");
      state.isModalOpen = false;
    },
    setIsModalOpen(state, action: PayloadAction<boolean>) {
      state.isModalOpen = action.payload;
      console.log("isModalOpen", state.isModalOpen);
    },
  },
});
export const { openModal, closeModal, setIsModalOpen } = modalSlice.actions;

export default modalSlice.reducer;
