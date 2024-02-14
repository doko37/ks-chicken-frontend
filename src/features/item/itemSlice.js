import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import publicRequest from '../../api/requestMethod'

const initialState = {
    name: '',
    size: 'half',
    cut: 'whole',
    toppings: {
      sesame: false,
      peanuts: false,
      parsley: false,
      snowy: false,
      onion: false
    },
    sides: {
      side1: 'radish',
      side2: 'nosides'
    },
    quantity: 1,
    img: null,
    price: 0,
    type: '',
    key: ''
}

export const updatePrice = createAsyncThunk('/items/updatePrice' , async (_, { getState }) => {
    const state = getState()
    const res = await publicRequest.get("/items/updatePrice", { item: state }, { headers: { token: "Bearer " + state.user.userToken } })
    console.log(res)
})

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {
        resetItem: (state) => {
            state = null
        },
        setItem: (state, { payload }) => {
            state = payload
        },
    }
})

export const { resetItem, setItem } = itemSlice.actions

export default itemSlice.reducer;