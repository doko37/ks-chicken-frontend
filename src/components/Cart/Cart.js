import React, { useState } from 'react'
import styled from 'styled-components'
import CartItem from './CartItem'
import '../../App.css'
import Drawer from '../Menu/Drawer/Drawer'
import CheckoutPanel from './CheckoutPanel'
import { KeyboardArrowDown as Down } from '@material-ui/icons'
import { MobileState } from '../hooks/MobileState'
import { useSelector, useDispatch } from 'react-redux'
import { updateCart, removeItemFromCart, editItemInCart } from '../../features/user/userSlice'
import { Body as CheckoutPanelBody } from './CheckoutPanel'
import { Button as DrawerButton } from '../Menu/Drawer/Drawer'
import Modal from '../Modal/Modal'
import { AlertModal } from './AlertModal'
import chickenIcon from '../../Images/YOU-GOOD-CHICKEN.png'

const Body = styled.div`
  background-color: #252425;
  //z-index: 50;
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

const TitleCtn = styled.div`
  display: flex;
  align-items: center;
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
  display: ${props => props.cartDisplay ? 'block' : 'none'};
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
  font-size: 24px;
  color: white;
  text-align: left;
  margin: 0;
  padding: 20px;
  position: relative;
  //transform: rotate(-5deg);

  @media(min-width: 700px) {
    font-size: 28px;
  } 
`

const StartButton = styled.button`
  position: relative;
  margin: 1rem;
  border-radius: 1.5rem;
  background-color: #cf8334;
  color: white;
  padding: 1rem 0;
  font-size: 1.25rem;
  border: none;
  cursor: pointer;

  @media(min-width: 700px) {
    font-size: 2rem;
  }

  &:active {
    background-color: #a56829;
  }
`

const ButtonText = styled.a`
  text-decoration: none;
  color: white;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 1rem;

  @media(min-width: 700px) {
    font-size: 1.25rem;
  }
`

const ConfusedChicken = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1rem;
  height: 40%;
  
  @media(min-width: 700px) {
    height: 70%;
    top: 0;
    margin: auto;
    margin-right: 2rem;
  }
`

export default function Cart(props) {
  const [cartDisplay, setCartDisplay] = useState(true)
  const [modalMode, setModalMode] = useState("")
  const [modalState, setModalState] = useState(null)
  const mState = MobileState()
  const session = useSelector((store) => store.user)
  const closed = useSelector((store) => store.menu.closed)
  const cart = session.cart
  const dispatch = useDispatch()

  const toggleCartDisplay = () => {
    if (mState) {
      setCartDisplay(!cartDisplay)
    }
  }

  const removeItem = (item) => {
    dispatch(removeItemFromCart({ item: item }))
    dispatch(updateCart())
    setModalMode("remove")
    setModalState(item)
  }

  const editItem = (item) => {
    dispatch(editItemInCart({ item: item }))
    dispatch(updateCart())
    props.toggleDrawer(null)
    setModalMode("edit")
    setModalState(item)
  }

  return (
    <Body className='Italic'>
      <Wrapper>
        <Modal mode={modalMode} modalState={modalState} toggleModalState={() => setModalState(null)} />
        <TitleCtn onClick={toggleCartDisplay}>
          <Title>YOUR CART</Title>
          <Down style={{ color: 'white', transform: cartDisplay ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer', display: mState ? cart.items.length > 0 ? '' : 'none' : 'none' }} />
        </TitleCtn>
        {closed ?
          <Ctn style={{ display: 'block' }}>
            <Notice>
              <Text style={{ fontSize: mState ? '30px' : '48px' }}>ONLINE ORDERING IS CURRENTLY UNAVAILABLE <br />SORRY ABOUT THAT.</Text>
              <ConfusedChicken src={chickenIcon} alt="Confused Chicken" />
            </Notice>
          </Ctn> : cart.items.length > 0 ?
            <>
              <Ctn>
                <CartCtn cartDisplay={cartDisplay}>
                  {cart.items.length > 0 ? cart.items.map(item => {
                    return (
                      <CartItem
                        item={item}
                        img={item.img}
                        key={item.key}
                        toggleDrawer={() => props.toggleDrawer(item)}
                        removeItem={() => removeItem(item)}
                      />
                    )
                  }) : <p>Your cart is empty</p>}
                  <CheckoutPanelBody style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgb(0,0,0,0.2)', boxShadow: 'none' }}>
                    <Text style={{ fontFamily: 'coffee_rg' }}>Forgot something?</Text>
                    <DrawerButton style={{ width: 'fit-content', padding: '0.25rem 1rem' }}>
                      <ButtonText href="/menu" style={{ fontFamily: 'coffee_rg' }}>GO BACK TO MENU</ButtonText>
                    </DrawerButton>
                  </CheckoutPanelBody>
                  <Drawer
                    active={props.drawerState}
                    item={props.item}
                    toggleDrawer={() => props.toggleDrawer(null)}
                    editState={props.editState}
                    addItem={item => editItem(item)}
                    chickenItems={props.chickenItems}
                    sideItems={props.sideItems}
                    token={props.token}
                  />
                </CartCtn>
                <CheckoutPanel
                  cart={cart}
                  togglessState={props.togglessState}
                  checkout={(custInfo) => props.checkout(custInfo)}
                  dates={props.dates}
                  times={props.times}
                  pickupInfo={props.pickupInfo}
                  discount={props.discount}
                />
              </Ctn>
              <AlertModal toggleTimeAvailable={props.toggleTimeAvailable} timeAvailable={props.timeAvailable} />
            </>
            :
            <Ctn style={{ display: 'block' }}>
              <Notice>
                <Text style={{ fontSize: mState ? '38px' : '48px' }}>YOUR CART IS EMPTY. <br />START AN ORDER?</Text>
                <div style={{ display: 'flex', justifyContent: 'start' }}>
                  <StartButton className='Normal'><a href="/menu" style={{ textDecoration: 'none', color: 'white', padding: '1rem 2rem', position: 'relative' }}>GO TO MENU</a></StartButton>
                </div>
                <ConfusedChicken src={chickenIcon} alt="Confused Chicken" />
              </Notice>
            </Ctn>
        }
      </Wrapper>
    </Body>
  )
}
