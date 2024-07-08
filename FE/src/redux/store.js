import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import rootReducer from './root.reducer'
import { useCallback } from 'react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

//Khai báo initial state redux
const initialState = {}

const persistConfig = {
    key: "root",
    storage,
    // blacklist: ['app'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

//Khởi tạo Reducer và Middleware của redux toolkit
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}).concat(
        
    ),
    preloadedState: initialState,
});


export function useSelectorRoot(fn) {
    return useSelector(fn);
  }
  

  export const useDispatchRoot = () => {
    const dispatch = useDispatch();
    const funcMemo = useCallback(
        (event) => {
            dispatch(event);
        },
        [dispatch]
    );
    return funcMemo;
};
