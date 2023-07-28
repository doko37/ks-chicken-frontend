import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../Home/Home'
import Menu from '../Menu/Menu';
import ContactUs from '../ContactUs/ContactUs'
import NavBar from '../NavBar';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer';
import moment from 'moment'
import LunchBar from '../LunchBar/LunchBar';
import '../../App.css'
import './Layout.css'
import Cart from '../Cart/Cart';
import publicRequest from '../../api/requestMethod'
import { ImageList } from '@material-ui/core';
import Callout from './Callout';
import StoreSelector from '../Cart/StoreSelector';
import Backdrop from '../Menu/Drawer/Backdrop';
import { getCart, setEmail } from '../../features/user/userSlice';
import { resetUser, setUser } from '../../features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { getChickenItems, getSideItems } from '../../features/menu/menuSlice';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from '../Checkout/Checkout';
import Success from '../Success/Success';

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

export default function Layout() {
    const session = useSelector((store) => store.user)
    const [ssState, setssState] = useState(false)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const [numItems, setNumItems] = useState(0)
    const [item, setItem] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [editState, setEditState] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [dates, setDates] = useState([])
    const [times, setTimes] = useState([])
    const [pickupInfo, setPickupInfo] = useState({
        date: '',
        time: ''
    })
    const [clientSecret, setClientSecret] = useState("")
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    const appearance = {
        theme: 'night'
    }

    const options = {
        clientSecret,
        appearance
    }

    const dispatch = useDispatch()

    useEffect(() => {
        const cart = localStorage.getItem('cart')
        const total = localStorage.getItem('total')
        const numItems = localStorage.getItem('numItems')
        const userToken = localStorage.getItem('userToken')
        const userId = localStorage.getItem('userId')
        const time = localStorage.getItem('time')
        const date = localStorage.getItem('date')
        try {
            if (cart) {
                setCart(JSON.parse(cart))
                setTotal(JSON.parse(total))
                setNumItems(JSON.parse(numItems))
                dispatch(setUser({
                    userId: JSON.parse(userId), 
                    userToken: JSON.parse(userToken),
                    cart: {
                        items: JSON.parse(cart),
                        total: JSON.parse(total),
                        numItems: JSON.parse(numItems),
                        isLoading: false
                    }
                }))
                //setSession({ userId: JSON.parse(userId), userToken: JSON.parse(userToken) })
                setPickupInfo({date: date, time: time})
            }
        } catch {
            console.log('cart empty')
        }
    }, [])

    useEffect(() => {
        const getCart = async () => {
            const currentUrl = window.location.href
            if (session.userId !== null && !currentUrl.includes("success")) {
                try {
                    const user = await publicRequest.get("/user/" + session.userId, { headers: { token: "Bearer " + session.userToken } })
                    setCart(user.data.cart.items)
                    setTotal(user.data.cart.total)
                } catch (err) {
                    setCart([])
                    setTotal(0)
                    setNumItems(0)
                    dispatch(resetUser())
                }
            } else {
                setCart([])
                setTotal(0)
                setNumItems(0)
            }
        }

        getCart()
    }, [session])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('total', JSON.stringify(total))
        localStorage.setItem('numItems', JSON.stringify(numItems))
        localStorage.setItem('time', JSON.stringify(pickupInfo.time))
        localStorage.setItem('date', JSON.stringify(pickupInfo.date))
    })

    useEffect(() => {
        localStorage.setItem('userToken', JSON.stringify(session.userToken))
        localStorage.setItem('userId', JSON.stringify(session.userId))
    }, [session])

    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const _times = await publicRequest.get('/times')
                setTimes(_times.data)

                const _dates = await publicRequest.get('/dates')
                setDates(_dates.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchTimes()
        setInterval(() => {
            fetchTimes()
        }, 60000);
    }, [])

    useEffect(() => {
        const defaultDate = moment().set({
            'month': moment(dates[0]).month(), 
            'day': moment(dates[0]).day(), 
            'hour': moment(times[0]).hour(), 
            'minute': moment(times[0]).minute()
        }).valueOf()

        const setDate = pickupInfo.date === '' ? 0 : moment().set({
            'month': moment(pickupInfo.date).month(), 
            'day': moment(pickupInfo.date).day(), 
            'hour': moment(pickupInfo.time).hour(), 
            'minute': moment(pickupInfo.time).minute()
        }).valueOf()

        if(setDate < defaultDate) {
            setPickupInfo({date: dates[0], time: times[0]})
        }
    }, [dates])

    useEffect(() => {
        let marinated = 0
        let nonMarinated = 0
        let discount = 0

        for (let i in cart) {
            if (cart[i].chickenType === "marinated") marinated += 1
            else if (cart[i].chickenType === "non_marinated") nonMarinated += 1
        }

        let mariLeftOver = marinated % 2;
        let nonMariLeftOver = nonMarinated % 2;

        if (marinated >= 2) {
            discount += ((marinated - mariLeftOver) / 2) * 3
        }

        if (nonMarinated >= 2) {
            discount += ((nonMarinated - nonMariLeftOver) / 2) * 1
        }

        if (mariLeftOver === 1 && nonMariLeftOver === 1) {
            discount += 2
        }

        setDiscount(discount)
    }, [total])

    function changeTime(time) {
        setPickupInfo({ ...pickupInfo, time: time })
    }

    function changeDate(date) {
        setPickupInfo({ ...pickupInfo, date: date })
    }

    function togglessState() {
        setssState(!ssState)
    }

    async function checkout(info) {
        // Get the user's cart from the database, also checks if the user's session has expired
        try {
            const data = await publicRequest.get("/user/" + session.userId, { headers: { token: "Bearer " + session.userToken } })
    
            const cart = data.data.cart.items

            dispatch(setEmail({email: info.email}))

            // Call API to create a new payment intent
            await axios.post("http://localhost:3001/api/stripe/create-payment-intent/" + session.userId, {
                fn: info.fn,
                ln: info.ln,
                email: info.email,
                phno: info.phno,
                cart: cart, 
                userId: session.userId, 
                date: pickupInfo.date,
                time: pickupInfo.time,
            }, { headers: { token: "Bearer " + session.userToken } }).then((data) => {
                setClientSecret(data.data.clientSecret) 
            })
        } catch(e) { 
            console.error("2")
            dispatch(resetUser())
            alert("your session has expired.")
        }
    }

    function addItem(item) {
        item.key = item.key + "_" + cart.length
        setCart([...cart, item])
        setTotal(total + item.price)

        updateCart([...cart, item], (total + item.price))
    }

    function toggleDrawer(item, edit = false, addToCart = false) {
        setItem(item)
        setEditState(edit)
        setDrawerState(!drawerState)
        // addItem(item)
        // console.log(cart.find(i => i.key === item.key))
        // if (cart.find(i => i.key === item.key) !== undefined && !addToCart) {
        //     removeItem(item)
        // }
    }

    function editItem(item) {
        const indx = cart.findIndex(i => i.key === item.key);

        let items = [...cart];
        let tempItem = { ...items[indx] };
        let prevPrice = tempItem.price;
        console.log(tempItem)

        items[indx] = item;
        setCart(items);
        setTotal(total + (item.price - prevPrice))
        updateCart(items, (total + (item.price - prevPrice)))
        toggleDrawer(null)
    }

    function removeItem(item) {
        const indx = cart.findIndex(i => i.key === item.key);

        cart.splice(indx, 1)
        setTotal(total - item.price)
        updateCart(cart, (total - item.price))
    }

    const updateCart = async (cart, total) => {
        try {
            await publicRequest.put("/user/updateCart/" + session.userId, { cart: { items: cart, total: total } }, { headers: { token: "Bearer " + session.userToken } })
        } catch (err) {
            console.error("3")
            setCart([])
            setTotal(0)
            setNumItems(0)
            dispatch(resetUser())
            //setSession({ userId: null, userToken: null })
            alert("your session has expired.")
        }
    }

    const startOrder = async () => {
        const data = await axios.post("http://localhost:3001/api/auth/createGuest")
        dispatch(setUser({
            userId: data.data._id, 
            userToken: data.data.accessToken,
            cart: {
                items: [],
                total: 0,
                numItems: 0,
                isLoading: false
            }
        }))

        togglessState()
    }

    return (
        <Container drawerState={drawerState} className='Italic'>
                { clientSecret ? 
                <Elements options={options} stripe={stripePromise}>
                    <Checkout clientSecret={clientSecret} total={((total - discount)/(1 - 0.029) + 0.31).toFixed(2)}/>
                </Elements> : 
                <div className='ctn'>
                <NavBar cartLen={cart.length} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu 
                        addItem={item => addItem(item)}
                        drawerState={drawerState}
                        toggleDrawer={item => toggleDrawer(item)}
                        editState={editState}
                        togglessState={togglessState}
                        userToken={session.userToken}
                    />} />
                    <Route path="/lunch-bar" element={<LunchBar />} />
                    <Route path="/cart" element={<Cart
                        item={item}
                        toggleDrawer={item => toggleDrawer(item, true)}
                        drawerState={drawerState}
                        editState={editState}
                        editItem={item => editItem(item)}
                        removeItem={item => removeItem(item)}
                        checkout={custInfo => checkout(custInfo)}
                        dates={dates}
                        times={times}
                        pickupInfo={pickupInfo}
                        ssState={ssState}
                        changeTime={changeTime}
                        changeDate={changeDate}
                        userToken={session.userToken}
                        togglessState={togglessState}
                        discount={discount}
                    />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/success" element={<Success pickupInfo={pickupInfo}/>}/>
                </Routes>
                {/* <Callout /> */}
                <Footer />
                <Backdrop active={ssState} toggleDrawer={togglessState} />
                <StoreSelector
                    ssState={ssState}
                    togglessState={togglessState}
                    dates={dates}
                    times={times}
                    setTime={time => changeTime(time)}
                    setDate={date => changeDate(date)}
                    pickupInfo={pickupInfo}
                    userToken={session.userToken}
                    startOrder={startOrder}
                />
            </div> }
        </Container>
    )
}
