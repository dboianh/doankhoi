import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userID: "",
    username: "",
    roleID: "",
    roleName: ""
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        getInfo(state, actions) {
            state.userID = actions.payload.userID;
            state.username = actions.payload.username;
            state.roleID = actions.payload.roleID;
            state.roleName = actions.payload.roleName;

        },
    }
})
export const { getInfo } = authSlice.actions
export default authSlice.reducer