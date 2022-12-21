import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Home from '../Home/Home'
import Menu from '../Menu/Menu';
import Order from '../OrderPage/Order'
import ContactUs from '../ContactUs/ContactUs'
import NavBar from '../NavBar';
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import Footer from './Footer';
import Checkout from '../Checkout/Checkout'
import moment from 'moment'
import LunchBar from '../LunchBar/LunchBar';
import '../../App.css'

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: block;
`

export default function Layout() {
    const [cartState, setCartState] = useState(false)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const [numItems, setNumItems] = useState(0)

    useEffect(() => {
        const cart = localStorage.getItem('cart')
        const total = localStorage.getItem('total')
        const numItems = localStorage.getItem('numItems')
        try {
            if (cart) {
                setCart(JSON.parse(cart))
                setTotal(JSON.parse(total))
                setNumItems(JSON.parse(numItems))
            }
        } catch {
            console.log('cart empty')
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('total', JSON.stringify(total))
        localStorage.setItem('numItems', JSON.stringify(numItems))
    })

    function updateCart(cart, total, numItems) {
        setCart(cart)
        setTotal(total)
        setNumItems(numItems)
    }

    function toggleCart() {
        setCartState(!cartState)
    }

    function checkout(info) {
        const time = moment().format('YYYY MMMM Do, h:mm a')
        axios.post("http://localhost:3001/submitOrder", { fName: info.fName, lName: info.lName, phoneNo: info.phoneNo, email: info.email, time: time, cart: cart }).then((response) => {
            console.log(response)
        }).catch(error => { console.log(error) })

        setTimeout(() => { window.location.reload(false) }, 1000)
    }

    return (
        <Container>
            <NavBar cartState={cartState} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/lunch-bar" element={<LunchBar />} />
                <Route path="/order" element={<Order toggleCart={toggleCart} updateCart={(cart, total, numItems) => updateCart(cart, total, numItems)} />} />
                <Route path="/contact-us" element={<ContactUs />} />
                <Route path="/checkout" element={<Checkout cart={cart} total={total} numItems={numItems} checkout={info => checkout(info)} />} />
            </Routes>
            <Footer cartState={cartState} />
        </Container>
    )
}
