import { createSlice } from "@reduxjs/toolkit";
import { deleteUser } from "./../../../../api/controllers/user.controller";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.loading = true), (state.error = null);
    },

    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      console.log(action.payload);
      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateSuccess,
  updateStart,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} = userSlice.actions;
export default userSlice.reducer;
