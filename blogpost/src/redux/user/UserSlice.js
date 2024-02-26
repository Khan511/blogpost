import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
