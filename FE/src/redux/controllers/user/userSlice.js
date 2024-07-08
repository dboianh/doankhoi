import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userID: "",
    username: "",
    email: "",
    roleID: "",
   },
  reducers: {
    getInfoUser(state, actions) {
      state.userID = actions.payload.userID
      state.username = actions.payload.username
      state.email = actions.payload.email;
      state.roleID = actions.payload.roleID;
    },
  },
});

export const { getInfoUser } = userSlice.actions;

export default userSlice.reducer;
