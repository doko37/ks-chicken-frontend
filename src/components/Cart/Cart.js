import React, { useState, useEffect } from 'react'
import moment from 'moment'
import styled from 'styled-components'
import CartItem from './CartItem'
import '../../App.css'
import Backdrop from '../Menu/Drawer/Backdrop'
import Drawer from '../Menu/Drawer/Drawer'
import Checkout from './Checkout'
import StoreSelector from './StoreSelector'
import api from '../../api/requestMethod'

const Body = styled.div`
  background-color: #252425;
  z-index: 50;
  padding: 1rem 0;
  position: relative;
  min-height: ${window.innerHeight - 320}px;
`

const Title = styled.h1`
  font-weight: 300;
  color: white;
  margin: 0 1rem;
  text-align: left;
`

const Wrapper = styled.div`
  width: auto;

  @media(min-width: 1200px) {
    width: 1200px;
    margin: 0 auto;
  }
`

const Ctn = styled.div`
  width: auto;
  display: block;

  @media(min-width: 800px) {
    width: auto;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }

  @media(min-width: 1200px) {
    display: grid;
    width: 1200px;
    margin: 0 auto;
    grid-template-columns: 2fr 1fr;
  }
`

const CartCtn = styled.div`

`

const Notice = styled.div`
  width: auto;
  height: auto;
  background-color: #1D1C1D;
  border-radius: 1rem;
  padding: 2rem 0;
  position: relative;
  margin: 1rem;
  align-items: left;
`

const Text = styled.h3`
  font-weight: 300;
  font-size: 36px;
  color: white;
  text-align: left;
  margin: 0;
  padding: 20px;
  position: relative;
  //transform: rotate(-5deg);

  @media(min-width: 700px) {
    font-size: 48px;
  } 
`

const StartButton = styled.button`
  position: relative;
  margin: 1rem;
  border-radius: 3rem;
  background-color: #cf8334;
  color: white;
  padding: 1rem 0;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;

  @media(min-width: 700px) {
    font-size: 2rem;
  }

  &:hover {
    box-shadow: 
  }

  &:active {
    background-color: #a56829;
  }
`

export default function Cart(props) {
  return (
    <Body className='Italic'>
      <Wrapper>
        <Title>YOUR CART</Title>
        {props.cart.length > 0 ?
          <>
            <Ctn>
              <CartCtn>
                {props.numItems > 0 ? props.cart.map(item => {
                  return (
                    <CartItem
                      item={item}
                      img={item.img}
                      key={item.key}
                      toggleDrawer={() => props.toggleDrawer(item)}
                      removeItem={() => props.removeItem(item)}
                    />
                  )
                }) : <p>Your cart is empty</p>}
                <Backdrop active={props.drawerState} toggleDrawer={() => props.toggleDrawer(null)} />
                <Drawer
                  active={props.drawerState}
                  item={props.item}
                  toggleDrawer={() => props.toggleDrawer(null)}
                  editState={props.editState}
                  addItem={item => props.editItem(item)}
                  chickenItems={props.chickenItems}
                  sideItems={props.sideItems}
                  token={props.token}
                />
              </CartCtn>
              <Checkout
                cart={props.cart}
                total={props.total}
                togglessState={props.togglessState}
                checkout={(custInfo) => props.checkout(custInfo)}
                dates={props.dates}
                times={props.times}
                pickupInfo={props.pickupInfo}
                discount={props.discount}
              />
            </Ctn>
          </>
          :
          <Ctn style={{ display: 'block' }}>
            <Notice>
              <Text>YOUR CART IS EMPTY. START AN ORDER?</Text>
              <div style={{ display: 'flex', justifyContent: 'start' }}>
                <StartButton className='Italic'><a href="/menu" style={{ textDecoration: 'none', color: 'white', padding: '1rem 2rem', position: 'relative' }}>GO TO MENU</a></StartButton>
              </div>
            </Notice>
          </Ctn>
        }
      </Wrapper>
    </Body>
  )
}
