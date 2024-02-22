import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  curentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      (state.loading = true), (state.error = null);
    },

    signInSuccess: (state, action) => {
      state.curentUser = action.payload;

      state.loading = false;
      state.error = null;
    },

    signInFailure: (state, aciton) => {
      state.loading = false;
      state.error = aciton.payload;
    },
  },
});

export const { singInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;
