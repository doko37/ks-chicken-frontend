import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../Home/Home'
import Menu from '../Menu/Menu';
import ContactUs from '../ContactUs/ContactUs'
import NavBar from '../NavBar';
import { Routes, Route } from 'react-router-dom'
import Footer from './Footer';
import moment from 'moment-timezone'
import LunchBar from '../LunchBar/LunchBar';
import '../../App.css'
import './Layout.css'
import Cart from '../Cart/Cart';
import publicRequest from '../../api/requestMethod'
import StoreSelector from '../Cart/StoreSelector';
import Backdrop from '../Menu/Drawer/Backdrop';
import { setEmail, resetUser, setUser, setPickupTime, setCartAmount } from '../../features/user/userSlice';
import { setClosed } from '../../features/menu/menuSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkout from '../Checkout/Checkout';
import Success from '../Success/Success';
import Loader from 'react-spinners/FadeLoader'
import { store } from '../../store'

const Container = styled.div`
    width: 100%;
    display: block;
`

const LoadScreen = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: ${props => props.active ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    background-color: rgb(200, 200, 200, 0.2);
    z-index: 300;
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
    const [timeReady, setTimeReady] = useState(false)
    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY)
    const appearance = {
        theme: 'night'
    }

    const options = {
        clientSecret,
        appearance
    }

    const dispatch = useDispatch()

    const setAvailableTimes = async () => {
        const _times = await publicRequest.get('/times', { params: { date: session.sessionInfo.pickupTime } })
        const _dates = await publicRequest.get('/dates')

        let i = 0
        while (_times.data[i].available === false) {
            i++;
        }

        setAsapTime({ ...asapTime, offset: i })
        dispatch(setPickupTime({ time: moment(_dates.data[0]).add(_times.data[i].time).format('YYYY-MM-DD HH:mm') }))
        setTimeReady(true)
    }

    const updateDiscountAndOverload = async (date = null) => {
        console.log("updateDiscountAndOverload")
        let marinated = 0
        let nonMarinated = 0
        let discount = 0
        let state = store.getState()
        let cart = state.user.cart.items
        let currentTime = state.user.sessionInfo.pickupTime
        let numHalfs = state.user.cart.numHalfs

        for (let i in cart) {
            if (cart[i].type === "chicken" && cart[i].size === "half") {
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

        setDiscount(discount)

        setTimes([])
        setTimeReady(false)
        const _times = await publicRequest.get('/times', { params: { date: (date ? date : currentTime ? currentTime : undefined) } })
        let i = 0
        while (_times.data[i].available === false) {
            i++;
        }

        if (numHalfs > 4) {
            let overload = Math.floor(numHalfs / 5)

            let lastUnavailableIndx = i - 1
            console.log(overload)
            for (let j = 0; j < _times.data.length; j++) {
                console.log("loop: " + _times.data[j].time)
                if (_times.data[j].available === false) {
                    //console.log("lastUnavailbleIndex: " + lastUnavailableIndx)
                    lastUnavailableIndx = j
                    continue
                }

                if (lastUnavailableIndx >= (j - overload)) {
                    //console.log("overload: " + overload + " j - overload: " + (j - overload) + " lastUnavailableIndex: " + lastUnavailableIndx)
                    //console.log("making unavailable: " + _times.data[j].time)
                    _times.data[j].available = false
                }
            }
        }

        let timeIndx = 0
        while (_times.data[timeIndx].available === false) {
            console.log(_times.data[timeIndx])
            timeIndx++
        }

        console.log(_times.data[timeIndx])
        console.log(state.user.sessionInfo.pickupTime)
        if (currentTime) {
            let selectedTime = _times.data.find(i => i.time === currentTime.split(' ')[1])
            if (selectedTime) {
                if (selectedTime.available === false) {
                    dispatch(setPickupTime({ time: moment((date ? date : currentTime)).startOf('d').add(_times.data[timeIndx].time).format('YYYY-MM-DD HH:mm') }))
                } else {
                }
            } else {
                dispatch(setPickupTime({ time: moment((date ? date : currentTime)).startOf('d').add(_times.data[timeIndx].time).format('YYYY-MM-DD HH:mm') }))
            }
        }

        setAsapTime({ ...asapTime, offset: i })
        setTimes(_times.data)
        setTimeReady(true)
    }

    useEffect(() => {
        let time
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

                        if (!currentUrl.includes("success")) {
                            localStorage.setItem('order', null)
                        }

                        dispatch(setUser({ user: user }))
                    } catch (err) {
                        if (!currentUrl.includes("success")) {
                            alert("Your session as expired.")
                            await setAvailableTimes()
                        }
                        dispatch(resetUser())
                    }
                } else {
                    console.log("no userId")
                    setAvailableTimes()
                }
            } catch (err) {
                setAvailableTimes()
            }
        }

        const updateInfo = async () => {
            await updateSession()
            const { closed } = (await publicRequest.get('/dates/storeHours/today')).data
            if (closed && process.env.NODE_ENV === 'production') {
                dispatch(setClosed({ closed: true }))
                dispatch(resetUser())
                return
            }
            const _dates = await publicRequest.get('/dates')
            setDates(_dates.data)
            let now = moment.tz('Pacific/Auckland')
            if ((now.hour() >= 11 || (now.hour() === 10 && now.minute() >= 50)) && (now.hour() < 20 || (now.hour() === 19 && now.minute() < 50))) {
                await updateDiscountAndOverload()
                let intervalId = setInterval(() => {
                    let now = moment.tz('Pacific/Auckland')
                    if (now.hour() > 20 || (now.hour() === 19 && now.minute() >= 50)) {
                        clearInterval(intervalId)
                        if (!alert('We are closed for today. Sorry!')) { window.location.reload() }
                    } else {
                        updateDiscountAndOverload()
                    }

                }, 60000);
            } else {
                await updateDiscountAndOverload()
            }

            setTimeReady(true)
        }

        const resetTimer = () => {
            clearTimeout(time)
            time = setTimeout(updateSession, 200000)
        }

        updateInfo()
        window.addEventListener('mousemove', resetTimer, false)
        window.addEventListener('scroll', resetTimer, false)
    }, [])

    useEffect(() => {
        localStorage.setItem('session', JSON.stringify(session))
    }, [session])

    useEffect(() => {
        if (session.userId !== null) {
            updateDiscountAndOverload()
        }
    }, [session.cart])

    function togglessState() {
        setssState(!ssState)
    }

    async function checkout(info) {
        // Get the user's cart from the database, also checks if the user's session has expired
        try {
            const data = await publicRequest.get("/user/" + session.userId, { headers: { token: "Bearer " + session.userToken } })

            const cart = data.data.cart.items

            const overload = await publicRequest.post("/order/numHalfs", {
                pickupTime: session.sessionInfo.pickupTime
            })

            if (overload.data.numHalfs >= 4) {
                console.log("order time not available")
                setTimeAvailable(false)
                updateDiscountAndOverload()
                return
            }

            dispatch(setEmail({ email: info.email }))

            // Call API to create a new payment intent
            await publicRequest.post("/stripe/create-payment-intent/" + session.userId, {
                fn: info.fn,
                ln: info.ln,
                email: info.email,
                phno: info.phno,
                cart: cart,
                userId: session.userId,
                pickupDate: session.sessionInfo.pickupTime.split(' ')[0],
                pickupTime: session.sessionInfo.pickupTime.split(' ')[1]
            }, { headers: { token: "Bearer " + session.userToken } }).then((data) => {
                dispatch(setCartAmount({ amount: (data.data.amount / 100) }))
                const order = {
                    userId: data.data.userId,
                    email: data.data.email,
                    pickupDate: data.data.pickupDate,
                    pickupTime: data.data.pickupTime,
                    orderNo: moment(session.sessionInfo.pickupTime).format('MMDD') + session.userId.substring(session.userId.length - 4)
                }
                localStorage.setItem('order', JSON.stringify(order))
                setClientSecret(data.data.clientSecret)
            })
        } catch (e) {
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
                isLoading: true
            }
        }

        dispatch(setUser({ user: user }))
        localStorage.setItem('order', null)
        togglessState()
    }

    return (
        <Container drawerState={drawerState} className='Italic'>
            {clientSecret ?
                <Elements options={options} stripe={stripePromise}>
                    <Checkout clientSecret={clientSecret} />
                </Elements> :
                <div className='ctn'>
                    <LoadScreen active={!timeReady && ((window.location.href.includes("cart") && session.cart.items.length > 0))}>
                        <Loader
                            color="#FFFFFF"
                            loading={!timeReady && ((window.location.href.includes("cart") && session.cart.items.length > 0))}
                            size={50}
                        />
                    </LoadScreen>
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
                        <Route path="/success" element={<Success />} />
                    </Routes>
                    {/* <Callout /> */}
                    <Footer />
                    <Backdrop active={ssState || drawerState || !timeAvailable} toggleDrawer={ssState ? togglessState : () => toggleDrawer(null, false)} />
                    <StoreSelector
                        ssState={ssState}
                        togglessState={togglessState}
                        dates={dates}
                        times={times}
                        startOrder={startOrder}
                        asap={asapTime}
                        dateChanged={date => updateDiscountAndOverload(date)}
                    />
                </div>}
        </Container>
    )
}
