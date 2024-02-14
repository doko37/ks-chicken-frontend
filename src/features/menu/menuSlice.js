import { createSlice } from "@reduxjs/toolkit";
import publicRequest from '../../api/requestMethod'
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    chicken: {
        items: [],
        isLoading: true
    },
    sides: {
        items: [],
        isLoading: true
    },
    closed: false
}

export const getChickenItems = createAsyncThunk('menu/getChicken', async (_, thunkAPI) => {
    try {
        const chicken = await publicRequest.get("/items/chicken")
        return chicken.data
    } catch (err) {
        return thunkAPI.rejectWithValue("Menu request failed.")
    }
})

export const getSideItems = createAsyncThunk('menu/getSides', async (_, thunkAPI) => {
    try {
        const sides = await publicRequest.get("/items/sides")
        return sides.data
    } catch (err) {
        return thunkAPI.rejectWithValue("Menu request failed.")
    }
})


const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setClosed: (state, { payload }) => {
            state.closed = payload.closed
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChickenItems.pending, (state) => {
                state.chicken.isLoading = true
            })
            .addCase(getChickenItems.fulfilled, (state, action) => {
                state.chicken.items = action.payload
                state.chicken.isLoading = false
            })
            .addCase(getChickenItems.rejected, (state) => {
                state.chicken.isLoading = false
            })
            .addCase(getSideItems.pending, (state) => {
                state.sides.isLoading = true
            })
            .addCase(getSideItems.fulfilled, (state, action) => {
                state.sides.items = action.payload
                state.sides.isLoading = false
            })
            .addCase(getSideItems.rejected, (state) => {
                state.sides.isLoading = false
            })
    }
})

export const { setClosed } = menuSlice.actions
export default menuSlice.reducer;