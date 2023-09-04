import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../Home/Home'
import Menu from '../Menu/Menu';
import ContactUs from '../ContactUs/ContactUs'
import NavBar from '../NavBar';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer';
import moment from 'moment-timezone'
import LunchBar from '../LunchBar/LunchBar';
import '../../App.css'
import './Layout.css'
import Cart from '../Cart/Cart';
import publicRequest from '../../api/requestMethod'
import { ImageList } from '@material-ui/core';
import StoreSelector from '../Cart/StoreSelector';
import Backdrop from '../Menu/Drawer/Backdrop';
import { getCart, setEmail, setCart, resetUser, setUser, setPickupTime, setCartAmount, resetCart, setOverLoad } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux'
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
    const [item, setItem] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [editState, setEditState] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [dates, setDates] = useState([])
    const [times, setTimes] = useState([])
    const [clientSecret, setClientSecret] = useState("")
    const [asapTime, setAsapTime] = useState({
        offset: 0,
        overload: 0
    });
    const [timeAvailable, setTimeAvailable] = useState(true)
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    const appearance = {
        theme: 'night'
    }

    const options = {
        clientSecret,
        appearance
    }

    const dispatch = useDispatch()

    async function setAvailableTimes() {
        const _times = await publicRequest.get('/times', { params: { date: session.sessionInfo.pickupTime } })
        const _dates = await publicRequest.get('/dates')

        let i = 0
        while(_times.data[i].available === false) {
            i++;
        }

        setAsapTime({...asapTime, offset: i})
        dispatch(setPickupTime({time: moment(_dates.data[0]).add(_times.data[i].time).format('YYYY-MM-DD HH:mm')}))
    }

    const dateChange = async (date) => {
        if(session.sessionInfo.pickupTime !== null) {
            console.log("date changed")
            setTimes([])
            const _times = await publicRequest.get('/times', { params: { date } })
            let i = 0
            while(_times.data[i].available === false) {
                i++;
            }
            console.log(date)
            dispatch(setPickupTime({time: moment(date).startOf('d').add(_times.data[i].time).format('YYYY-MM-DD HH:mm')}))
            setAsapTime({...asapTime, offset: i})
            setTimes(_times.data)
        }
    }

    useEffect(() => {
        const fetchTimes = async () => {
            try {
                const session = JSON.parse(localStorage.getItem('session'))
                console.log(session.sessionInfo.pickupTime)
                const _times = await publicRequest.get('/times', { params: { date: session.sessionInfo.pickupTime } })
                let i = 0

                while(_times.data[i].available === false) {
                    i++;
                }

                setAsapTime({...asapTime, offset: i})

                const overload = session.cart.overload
                console.log(overload)

                while(i < (i + overload)) {
                    _times.data[i].available = false
                }

                setTimes(_times.data)

                const _dates = await publicRequest.get('/dates')
                setDates(_dates.data)


                const defaultDate = moment(_dates.data[0]).add(_times.data[i].time)

                const pickupTime = JSON.parse(localStorage.getItem('session')).sessionInfo.pickupTime
                if(pickupTime === null) return
                const setDate = moment(pickupTime)

                if(setDate.valueOf() < defaultDate.valueOf()) {
                    console.log("update date")
                    dispatch(setPickupTime({time: defaultDate.format('YYYY-MM-DD HH:mm')}))
                    setDate(_dates.data[0])
                }
            } catch (err) {
                console.log(err)
            }
        }

        const updateSession = async () => {
            const currentUrl = window.location.href
            const currSession = JSON.parse(localStorage.getItem('session'))
            try {
                if (currSession.userId !== null) {
                    try {
                        const res = await publicRequest.get("/user/" + currSession.userId, { headers: { token: "Bearer " + currSession.userToken } })
                        const cart = {
                            items: res.data.cart.items,
                            total: res.data.cart.total,
                            numItems: res.data.cart.numItems,
                            numHalfs: res.data.cart.numHalfs,
                            overload: currSession.cart.overload,
                            loading: false
                        }
    
                        let pickupTime = currSession.sessionInfo.pickupTime
    
                        const user = {
                            userId: currSession.userId,
                            userToken: currSession.userToken,
                            sessionInfo: {
                                email: currSession.sessionInfo.email,
                                paid: currSession.sessionInfo.paid,
                                pickupTime: pickupTime
                            },
                            cart: cart
                        }
    
                        if(!currentUrl.includes("success")) {
                            localStorage.setItem('order', null)
                        }
    
                        dispatch(setUser({user: user}))
                    } catch (err) {
                        if(!currentUrl.includes("success")) {
                            alert("Your session as expired.")
                            await setAvailableTimes()
                        }
                        dispatch(resetUser())
                    }
                } else {
                    setAvailableTimes()
                }
            } catch(err) {
                setAvailableTimes()
            }
        }
        fetchTimes()
        updateSession()
        if(moment.tz('Pacific/Auckland').hour() >= 11 && moment.tz('Pacific/Auckland').hour() < 20) {
            setInterval(() => {
                fetchTimes()
                console.log('hi')
            }, 60000);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('session', JSON.stringify(session))
    }, [session])
    
    useEffect(() => {
        let marinated = 0
        let nonMarinated = 0
        let discount = 0
        let cart = session.cart.items

        for (let i in cart) {
            if(cart[i].type === "chicken" && cart[i].size === "half") {
                if (cart[i].chickenType === "marinated") marinated += 1
                else if (cart[i].chickenType === "non_marinated") nonMarinated += 1
            }
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
        
        if(times.length > 0) {
            dispatch(setOverLoad({overload: Math.floor(session.cart.numHalfs / 5)}))
            for(let i = 0; i < asapTime.offset + Math.floor(session.cart.numHalfs / 5); i++) {
                console.log(times[i])
                times[i].available = false;
            }
        }

        setDiscount(discount)
    }, [session.cart])

    function togglessState() {
        setssState(!ssState)
    }

    async function checkout(info) {
        // Get the user's cart from the database, also checks if the user's session has expired
        try {
            // const timeAvailable = await publicRequest.post("/order/timeAvailable", {
            //     numHalfs: session.cart.numHalfs,
            //     pickupTime: session.sessionInfo.pickupTime
            // });

            // if(timeAvailable.data.leftover > 0) {
            //     let offset = Math.ceil(timeAvailable.data.leftover / 4)

            //     setTimeAvailable(false)
            //     return
            // }

            const data = await publicRequest.get("/user/" + session.userId, { headers: { token: "Bearer " + session.userToken } })
    
            const cart = data.data.cart.items

            dispatch(setEmail({email: info.email}))

            // Call API to create a new payment intent
            await publicRequest.post("/stripe/create-payment-intent/" + session.userId, {
                fn: info.fn,
                ln: info.ln,
                email: info.email,
                phno: info.phno,
                cart: cart, 
                userId: session.userId, 
                pickupTime: session.sessionInfo.pickupTime,
            }, { headers: { token: "Bearer " + session.userToken } }).then((data) => {
                dispatch(setCartAmount({amount: (data.data.amount / 100)}))
                const order = {
                    userId: data.data.userId,
                    email: data.data.email,
                    pickupTime: data.data.pickupTime,
                    orderNo: moment(session.sessionInfo.pickupTime).format('MMDD') + session.userId.substring(session.userId.length - 4)
                }
                console.log(order)
                localStorage.setItem('order', JSON.stringify(order))
                setClientSecret(data.data.clientSecret)
            })
        } catch(e) { 
            console.error(e)
            dispatch(resetUser())
            alert("your session has expired.")
            await setAvailableTimes()
        }
    }

    function toggleDrawer(item, edit = false, addToCart = false) {
        setItem(item)
        setEditState(edit)
        setDrawerState(!drawerState)
    }

    const startOrder = async () => {
        const data = await publicRequest.post("/auth/createGuest")

        let user = {
            userId: data.data._id, 
            userToken: data.data.accessToken,
            sessionInfo: {
                email: null,
                paid: false,
                pickupTime: session.sessionInfo.pickupTime
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

        dispatch(setUser({user: user}))
        localStorage.setItem('order', null)
        togglessState()
    }

    return (
        <Container drawerState={drawerState} className='Italic'>
                { clientSecret ? 
                <Elements options={options} stripe={stripePromise}>
                    <Checkout clientSecret={clientSecret} />
                </Elements> : 
                <div className='ctn'>
                <NavBar cartLen={session.cart.items.length} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu 
                        drawerState={drawerState}
                        toggleDrawer={item => toggleDrawer(item)}
                        editState={editState}
                        togglessState={togglessState}
                    />} />
                    <Route path="/lunch-bar" element={<LunchBar />} />
                    <Route path="/cart" element={<Cart
                        item={item}
                        toggleDrawer={item => toggleDrawer(item, true)}
                        toggleTimeAvailable={() => setTimeAvailable(true)}
                        timeAvailable={!timeAvailable}
                        drawerState={drawerState}
                        editState={editState}
                        checkout={custInfo => checkout(custInfo)}
                        dates={dates}
                        times={times}
                        ssState={ssState}
                        togglessState={togglessState}
                        discount={discount}
                    />} />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/success" element={<Success />}/>
                </Routes>
                {/* <Callout /> */}
                <Footer />
                <Backdrop active={ssState || drawerState} toggleDrawer={ssState ? togglessState : () => toggleDrawer(null, false)} />
                <StoreSelector
                    ssState={ssState}
                    togglessState={togglessState}
                    dates={dates}
                    times={times}
                    startOrder={startOrder}
                    asap={asapTime}
                    dateChanged={date => dateChange(date)}
                />
            </div> }
        </Container>
    )
}
