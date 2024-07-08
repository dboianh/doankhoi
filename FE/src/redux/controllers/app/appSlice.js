import { createSlice } from '@reduxjs/toolkit'

const initialAppState = {
    currentMenu: "1",
    refresh: false
}

const appSlice = createSlice({
    name: "app",
    initialState: initialAppState,
    reducers: {
        setRefresh(state) {
            state.refresh = state.refresh ? false : true 
        },
        setCurrentMenuHeader(state, actions) {
            state.currentMenu = actions.payload
        }
    }
})

export const { setRefresh, setCurrentMenuHeader } = appSlice.actions;

export default appSlice.reducer