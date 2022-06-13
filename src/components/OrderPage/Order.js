import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import OrderFooter from './OrderFooter';
import OrderItems from './OrderItems/OrderItems';
import Cart from './Cart/Cart'
import Backdrop from './Backdrop';
import ItemBox from './ItemBox/ItemBox';
import '../../App.css'
import { MobileState } from '../hooks/MobileState';

const Body = styled.div`
    width: 100%;
    left: ${props => props.cartState ? `-${window.innerWidth}px` : '0'};
    transition: left 0.25s ease;
    z-index: 10;
    position: relative;
    min-height: ${props => props.cartState ? '0' : window.innerHeight - 80}px;
    overflow-y: hidden;
    background-color: #252425;

    @media (min-width: 700px) {
        left: 0;
        box-shadow: none;
    }
`

const Message = styled.div`
    font-weight: 300;
    font-size: ${props => props.main ? '30px' : '22px'};
    text-align: center;
    margin: 0 1rem;
    z-index: 10;

    @media(min-width: 700px) {
        font-size: ${props => props.main ? '40px' : '28px'};
    }
`

export default function OrderPage(props) {
    const [cartState, setCartState] = useState(false)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0.00)
    const [numItems, setNumItems] = useState(cart.length)
    const [itemSelectedState, setItemSelectedState] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const [editState, setEditState] = useState(false)

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart')))
        setTotal(JSON.parse(localStorage.getItem('total')))
        setNumItems(JSON.parse(localStorage.getItem('numItems')))
    }, [])

    useEffect(() => {
        props.updateCart(cart, total, numItems)
    })

    function toggleCart() {
        setCartState(!cartState)
        setEditState(!editState)
        props.toggleCart()
    }

    function itemSelected(item) {
        setItemSelectedState(!itemSelectedState)
        setSelectedItem(item)
    }

    function editItemSelected(item) {
        setSelectedItem(item)
        setItemSelectedState(!itemSelectedState)
    }

    function editItem(item) {
        setItemSelectedState(null)
        setSelectedItem(null)
        const existingItem = cart.find(i => i.key === item.prevKey)
        const newQuantity = item.quantity - existingItem.quantity
        setNumItems(numItems + newQuantity)
        setTotal(total + ((item.price * item.quantity) - (existingItem.price * existingItem.quantity)))
        if(existingItem.quantity !== item.quantity) localStorage.setItem('numItems', localStorage.getItem('numItems') + newQuantity)
        existingItem.quantity = item.quantity
        existingItem.powderToppings = item.powderToppings
        existingItem.chickenToppings = item.chickenToppings
        existingItem.sauce = item.sauce
        existingItem.size = item.size
        existingItem.key = item.key
        existingItem.chicken = item.chicken
        existingItem.price = item.price
        existingItem.cut = item.cut
        existingItem.sides = item.sides
    }

    function addItem(item) {
        setItemSelectedState(null)
        setSelectedItem(null)
        const existingItem = cart.find(i => i.key === item.key)
        if(existingItem) {
            const newQuantity = parseFloat(existingItem.quantity) + parseFloat(item.quantity)
            existingItem.quantity = newQuantity.toString()
        } else {
            setCart([...cart, item])
        }
        setNumItems(numItems + item.quantity)
        localStorage.setItem('numItems', localStorage.getItem('numItems') + item.quantity)
        setTotal(total + (item.price * item.quantity))
    }

    function removeItem(item) {
        setItemSelectedState(null)
        const existingItem = cart.find(i => i.key === item.key)
        if(existingItem) {
            const index = cart.findIndex(i => i.key === item.key)
            cart.splice(index,1)
        }
        setNumItems(numItems - existingItem.quantity)
        localStorage.setItem('numItems', localStorage.getItem('numItems') - item.quantity)
        setTotal(total - (existingItem.price * existingItem.quantity))
    }

    const mState = MobileState()

    return (
        // <Body cartState={cartState} className="Normal">
        //     <Cart cartState={cartState} cart={cart} toggleCart={toggleCart} total={total} selectItem={item => itemSelected(item)} editItem={item => editItemSelected(item)}/>
        //     <Backdrop cartState={cartState} toggleCart={toggleCart} cart/>
        //     <Backdrop cartState={itemSelectedState} toggleCart={() => setItemSelectedState(false)}/>
        //     <OrderItems addItem={newItem => addItem(newItem)} itemSelected={selectedItem => itemSelected(selectedItem)}/>
        //     <OrderFooter numItems={numItems} toggleCart={toggleCart}/>
        //     <ItemBox selectedItem={selectedItem} 
        //             close={() => setItemSelectedState(false)} 
        //             itemSelectedState={itemSelectedState} 
        //             addItem={newItem => addItem(newItem)} 
        //             editState={editState}
        //             editItem={item => editItem(item)}
        //             removeItem={item => removeItem(item)}
        //     />
        // </Body>
        <div className='Italic' style={{backgroundColor: '#252425', color: 'white', height: window.innerHeight - 80, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: '10', position: 'relative'}}>
            <div>
                <Message main>ONLINE ORDERING WILL BE COMING SOON!</Message>
                <Message>In the mean time, you can order by calling us on: <a href="tel:094761952" style={{color: 'white'}}>09-476 1952</a></Message>
            </div>
        </div>
    )
}
