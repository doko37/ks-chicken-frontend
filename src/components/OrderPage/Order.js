import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import OrderFooter from './OrderFooter';
import OrderItems from './OrderItems/OrderItems';
import Cart from './Cart/Cart'
import Backdrop from './Backdrop';
import ItemBox from './ItemBox/ItemBox';

const Body = styled.div`
    width: 100%;
    left: ${props => props.cartState ? `-${window.innerWidth}px` : '0'};
    transition: left 0.25s ease;
    background-color: #efefef;
    z-index: 10;
    position: relative;
    min-height: ${props => props.cartState ? '0' : window.innerHeight - 80}px;
    //box-shadow: 0px -4px 4px -4px gray;
    box-shadow: 0 0px 4px 0 gray;
    overflow-y: hidden;

    @media (min-width: 700px) {
        left: 0;
        box-shadow: none;
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

    return (
        <Body cartState={cartState} style={{backgroundColor: 'white'}}>
            <Cart cartState={cartState} cart={cart} toggleCart={toggleCart} total={total} selectItem={item => itemSelected(item)} editItem={item => editItemSelected(item)}/>
            <Backdrop cartState={cartState} toggleCart={toggleCart} cart/>
            <Backdrop cartState={itemSelectedState} toggleCart={() => setItemSelectedState(false)}/>
            <OrderItems addItem={newItem => addItem(newItem)} itemSelected={selectedItem => itemSelected(selectedItem)}/>
            <OrderFooter numItems={numItems} toggleCart={toggleCart}/>
            <ItemBox selectedItem={selectedItem} 
                    close={() => setItemSelectedState(false)} 
                    itemSelectedState={itemSelectedState} 
                    addItem={newItem => addItem(newItem)} 
                    editState={editState}
                    editItem={item => editItem(item)}
                    removeItem={item => removeItem(item)}
            />
        </Body>
    )
}
