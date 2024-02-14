import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import publicRequest from "../../api/requestMethod";

const initialState = {
    userId: null,
    userToken: null,
    sessionInfo: {
        email: null,
        paid: false,
        pickupTime: null
    },
    cart: {
        items: [],
        total: 0,
        numItems: 0,
        numHalfs: 0,
        overload: 0,
        isLoading: true
    }
}

export const getCart = createAsyncThunk('cart/getCart', async (_, thunkAPI) => {
    const state = thunkAPI.getState()
    try {
        const { cart } = await publicRequest.get("/user/" + state.user.userId, { headers: { token: "Bearer " + state.user.userToken } }).then(res => res.data)
        return cart
    } catch (err) {
        return thunkAPI.rejectWithValue("Session does not exist or has expired")
    }
})

export const updateCart = createAsyncThunk('users/updateCart' , async (_, { getState }) => {
    const state = getState()
    const { res } = await publicRequest.put("/user/updateCart/" + state.user.userId, { 
        cart: { 
            items: state.user.cart.items,
            total: state.user.cart.total,
            numItems: state.user.cart.numItems,
            numHalfs: state.user.cart.numHalfs
        } }, { headers: { token: "Bearer " + state.user.userToken } })
    return res
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => {
            state.userId = null
            state.userToken = null
            state.sessionInfo = {
                email: null,
                paid: false,
                pickupTime: null
            }
            state.cart = {
                items: [],
                total: 0,
                numItems: 0,
                numHalfs: 0,
                isLoading: false
            }
        },
        resetCart: (state) => {
            state.cart = {
                items: [],
                total: 0,
                numItems: 0,
                numHalfs: 0,
                isLoading: false
            }
        },
        setUser: (state, { payload }) => {
            let user = payload.user
            state.userId = user.userId
            state.userToken = user.userToken
            state.email = user.email
            state.sessionInfo = user.sessionInfo
            state.cart = user.cart
        },
        setCart: (state, { payload }) => {
            state.cart = payload.cart
        },
        setCartAmount: (state, { payload }) => {
            state.cart.total = payload.amount
        },
        setEmail: (state, { payload }) => {
            state.sessionInfo.email = payload.email
        },
        setPaymentStatus: (state, { payload }) => {
            state.sessionInfo.paid = payload.paid
        },
        setPickupTime: (state, { payload }) => {
            state.sessionInfo.pickupTime = payload.time
        },
        addItemToCart: (state, { payload }) => {
            let item = payload.item
            if(item.type === "sides" && (item.key !== "chips" && item.key !== "sauce")) {
                const indx = state.cart.items.findIndex(i => i.key.includes(item.key))
                if(indx !== -1) {
                    state.cart.items[indx].quantity += item.quantity
                    state.cart.total += (item.price * item.quantity)
                    return
                }
            }
            item.key = item.key + "_" + state.cart.items.length
            state.cart.items.push(item)
            state.cart.total += (item.price * item.quantity)
            state.cart.numItems += 1
            if(item.type === "chicken") {
                state.cart.numHalfs += (item.size === "half" ? 1 : 2) * item.quantity
            }
        },
        removeItemFromCart: (state, { payload }) => {
            const tempItem = payload.item
            const itemIndex = state.cart.items.findIndex(i => i.key === tempItem.key)
            state.cart.items.splice(itemIndex, 1)
            state.cart.total -= (tempItem.price * tempItem.quantity)
            state.cart.numItems -= 1
            if(tempItem.type === "chicken") {
                state.cart.numHalfs -= (tempItem.size === "half" ? 1 : 2) * tempItem.quantity
            }
        },
        editItemInCart: (state, { payload }) => {
            let item = payload.item
            const indx = state.cart.items.findIndex(i => i.key === item.key);

            let items = [...state.cart.items];
            let tempItem = { ...items[indx] };
            let prevPrice = tempItem.price * tempItem.quantity;

            items[indx] = item;
            state.cart.items = items
            state.cart.total += ((item.price * item.quantity) - prevPrice)
            if(item.type === "chicken") {
                state.cart.numHalfs += ((item.size === "half" ? 1 : 2) * item.quantity) - ((tempItem.size === "half" ? 1 : 2) * tempItem.quantity)
            }
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(updateCart.pending, (state) => {
            state.cart.isLoading = true
        })
        .addCase(updateCart.fulfilled, (state, action) => {
            console.log("update cart fulfilled")
            state.cart.isLoading = false
        }) 
        .addCase(updateCart.rejected, (state, action) => {
            console.log("update cart rejected")
            state.userId = null
            state.userToken = null
            state.sessionInfo = {
                email: null,
                paid: false,
                pickupTime: null
            }
            state.cart = {
                items: [],
                total: 0,
                numItems: 0,
                numHalfs: 0,
                isLoading: false
            }

            alert("Your session has expired");
        })
        .addCase(getCart.pending, (state) => {
            state.cart.isLoading = true
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.cart.items = action.payload.items
            state.cart.numItems = action.payload.numItems
            state.cart.total = action.payload.total
            state.cart.isLoading = false
        })
        .addCase(getCart.rejected, (state, action) => {
            state.cart.isLoading = false
        })
    }
})

export const { resetUser, resetCart, setUser, setCart, setCartAmount, setEmail, setPaymentStatus, setPickupTime, addItemToCart, removeItemFromCart, editItemInCart } = userSlice.actions

export default userSlice.reducer;