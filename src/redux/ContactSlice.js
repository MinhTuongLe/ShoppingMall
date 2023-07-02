import { createSlice } from "@reduxjs/toolkit";

const ContactSlice = createSlice({
  name: "contact",
  initialState: {
    previousContactURL: "",
  },
  reducers: {
    saveContactURL(state, action) {
      state.previousContactURL = action.payload;
    },
  },
});

export const {
  saveContactURL
} = ContactSlice.actions;
export default ContactSlice.reducer;
