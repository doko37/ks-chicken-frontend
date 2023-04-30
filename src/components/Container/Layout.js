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

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

export default function Layout() {
    const [ssState, setssState] = useState(false)
    const [cart, setCart] = useState([])
    const [chickenItems, setChickenItems] = useState([])
    const [sideItems, setSideItems] = useState([])
    const [total, setTotal] = useState(0.00)
    const [numItems, setNumItems] = useState(0)
    const [item, setItem] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [editState, setEditState] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [session, setSession] = useState({
        token: null,
        id: null
    })
    const [dates, setDates] = useState([])
    const [times, setTimes] = useState([])
    const [pickupInfo, setPickupInfo] = useState({
        date: '',
        time: ''
    })

    useEffect(() => {
        const cart = localStorage.getItem('cart')
        const total = localStorage.getItem('total')
        const numItems = localStorage.getItem('numItems')
        const token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        const time = localStorage.getItem('time')
        const date = localStorage.getItem('date')
        try {
            if (cart) {
                setCart(JSON.parse(cart))
                setTotal(JSON.parse(total))
                setNumItems(JSON.parse(numItems))
                setSession({ id: JSON.parse(id), token: JSON.parse(token) })
                setPickupInfo({date: date, time: time})
            }
        } catch {
            console.log('cart empty')
        }
    }, [])

    useEffect(() => {
        const getItems = async () => {
            try {
                const chicken = await publicRequest.get("/items/chicken")
                setChickenItems(chicken.data)

                const sides = await publicRequest.get("/items/sides")
                setSideItems(sides.data)
            } catch (err) { console.error(err) }
        }

        getItems()
    }, [])

    useEffect(() => {
        const getCart = async () => {
            if (session.id !== null) {
                try {
                    const user = await publicRequest.get("/user/" + session.id, { headers: { token: "Bearer " + session.token } })
                    setCart(user.data.cart.items)
                    setTotal(user.data.cart.total)
                } catch (err) {
                    setCart([])
                    setTotal(0)
                    setNumItems(0)
                    setSession({ id: null, token: null })
                    alert("your session has expired.")
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
        localStorage.setItem('token', JSON.stringify(session.token))
        localStorage.setItem('id', JSON.stringify(session.id))
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
        }, 1000);
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

        console.log(pickupInfo)

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

    function checkout(info) {
        //const time = moment().format('YYYY MMMM Do, h:mm a')
        axios.post("http://localhost:3001/submitOrder", { 
            user: { 
                fName: info.fn, 
                lName: info.ln, 
                phoneNo: info.phno, 
                email: info.email,
                cart: {
                    items: cart,
                    total: (total + (total * 0.03)).toFixed(2)
                }
            }, 
            date: moment(pickupInfo.date).format("YYYY MMMM Do"),
            time: moment(pickupInfo.time).format("h:mm a"),

         }).then((response) => {
            console.log(response)
        }).catch(error => { console.log(error) })

        setTimeout(() => { window.location.reload(false) }, 1000)
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
        console.log(item.price)
        console.log(prevPrice)
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
            await publicRequest.put("/user/updateCart/" + session.id, { cart: { items: cart, total: total } }, { headers: { token: "Bearer " + session.token } })
        } catch (err) {
            setCart([])
            setTotal(0)
            setNumItems(0)
            setSession({ id: null, token: null })
            alert("your session has expired.")
        }
    }

    const startOrder = async () => {
        const data = await axios.post("http://localhost:3001/api/auth/createGuest")
        setSession({ id: data.data._id, token: data.data.accessToken })
        togglessState()
    }

    return (
        <Container drawerState={drawerState} className='Italic'>
            <div className='ctn'>
                <NavBar cartLen={cart.length} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu 
                        addItem={item => addItem(item)}
                        drawerState={drawerState}
                        toggleDrawer={item => toggleDrawer(item)}
                        editState={editState}
                        chickenItems={chickenItems}
                        sideItems={sideItems}
                        togglessState={togglessState}
                        token={session.token}
                    />} />
                    <Route path="/lunch-bar" element={<LunchBar />} />
                    <Route path="/cart" element={<Cart
                        cart={cart}
                        item={item}
                        numItems={cart.length}
                        total={total}
                        toggleDrawer={item => toggleDrawer(item, true)}
                        drawerState={drawerState}
                        editState={editState}
                        editItem={item => editItem(item)}
                        removeItem={item => removeItem(item)}
                        checkout={custInfo => checkout(custInfo)}
                        chickenItems={chickenItems}
                        sideItems={sideItems}
                        dates={dates}
                        times={times}
                        pickupInfo={pickupInfo}
                        ssState={ssState}
                        changeTime={changeTime}
                        changeDate={changeDate}
                        token={session.token}
                        togglessState={togglessState}
                        discount={discount}
                    />} />
                    <Route path="/contact-us" element={<ContactUs />} />
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
                    token={session.token}
                    startOrder={startOrder}
                />
            </div>
        </Container>
    )
}
