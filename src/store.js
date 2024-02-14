import { configureStore } from "@reduxjs/toolkit"
import userReducer from './features/user/userSlice'
import menuReducer from './features/menu/menuSlice'
import itemReducer from "./features/item/itemSlice"

export const store = configureStore({
    reducer: {
        user: userReducer,
        menu: menuReducer,
        item: itemReducer
    },
})