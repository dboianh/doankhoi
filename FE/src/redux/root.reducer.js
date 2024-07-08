import { combineReducers } from '@reduxjs/toolkit'
import authSlice from './controllers/login/authSlice'
import appSlice from './controllers/app/appSlice'
import userSlice from './controllers/user/userSlice'

const rootReducer = combineReducers({
    app: appSlice,
    login: authSlice,
    user: userSlice
})

export default rootReducer