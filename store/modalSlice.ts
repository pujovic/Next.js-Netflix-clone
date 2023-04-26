import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Movie } from "@/typings";

interface ModalState {
  showModal: boolean;
  movie: Movie | null;
  play: boolean;
}

const initialState: ModalState = {
  showModal: false,
  movie: null,
  play: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalMovie: (state, action: PayloadAction<Movie | null>) => {
      state.movie = action.payload;
    },
    openModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = true;
      state.play = action.payload;
    },
    closeModal: (state) => {
      state.play = false;
      state.showModal = false;
      state.movie = null;
    },
  },
});

export const { openModal, closeModal, setModalMovie } = modalSlice.actions;
export const showModal = (state: RootState) => state.modal.showModal;
export const movie = (state: RootState) => state.modal.movie;
export const play = (state: RootState) => state.modal.play;
export default modalSlice.reducer;
