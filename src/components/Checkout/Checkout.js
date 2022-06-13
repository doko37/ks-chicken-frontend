import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { AccessTime, KeyboardArrowDown as DownArrow, PinDrop } from '@material-ui/icons'
import { TextField } from '@material-ui/core'
import CartItem from '../OrderPage/Cart/CartItem'
import CheckoutBtn from './CheckoutBtn'
import { MobileState } from '../hooks/MobileState'

const Body = styled.div`
  width: auto;
  z-index: 10;
  position: relative;
  background-color: white;
  box-shadow: 0 0 4px 0 gray;
  padding-bottom: 1rem;

  @media(min-width: 700px) {
    width: 1200px;
    margin: auto;
    box-shadow: none;
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
`

const Form = styled.form`
  display: block;
  width: auto;
  margin: 0;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 2rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  position: relative;
  z-index: 10;
  background-color: #efefef;
  margin: 0.5rem;

  @media (min-width: 700px) {
    margin: 0;
    margin-bottom: 1rem;
  }
`

const OrderInfoCtn = styled.div`
  display: block;
  width: auto;
  background-color: #efefef;
  padding-left: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  padding-right: 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem;

  @media (min-width: 700px) {
    margin: 1rem 0;
  }
`

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

const OrderCtn = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding: 0.25rem 0;
  z-index: 10;
  background-color: white;

  @media (min-width: 700px) {
    margin-top: 1rem;
    padding: 0;
  }
`

const OrderWrapper = styled.div`
  border-radius: 0.5rem;
  margin: 0 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 0 4px 0 gray;
  height: ${props => props.dropDownState ? 'auto' : '42px'};
  max-height: ${props => props.dropDownState ? '400px' : '42px'};
  transition: max-height 0.25s ease-in-out;
  padding-bottom: 0.5rem;
  background-color: white;
  overflow: hidden;

  @media(min-width: 700px) {
    max-height: none;
    height: auto;
    margin-right: 0;
  }
`

const OrderLabel = styled.div`
  width: auto;
  height: 50px;
  margin: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Seperator = styled.div`
  width: auto;
  margin: 0 1rem;
  padding: 4px 0;
  border-top: 1px solid gray;
  box-shadow: 0 0 4px 4px white;
  position: relative;
  z-index: 10;
  height: 0px;
  display: ${props => props.dropDownState ? 'block' : 'none'};

  @media (min-width: 700px) {
    display: block;
  }
`

const OrderTitle = styled.div`
  display: flex;
  align-items: center;
`

const OrderText = styled.p`
  margin-right: ${props => props.left ? '0.5rem' : '0'};
  margin-left: ${props => props.left ? '0' : '0.5rem'};
`

const OrderDetails = styled.div`
  width: auto;
  overflow-y: auto;
  border-top: none;
  display: ${props => props.dropDownState ? 'block' : 'none'};
  border-top: none;
  max-height: 340px;
  position: relative;
  z-index: 1;

  @media (min-width: 700px) {
    max-height: none;
    display: block;
  }
`

const ArrowContainer = styled.div`
  transform: ${props => props.dropDownState ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.25s ease;
  height: 24px;
  width: 24px;
  cursor: pointer;

  @media (min-width: 700px) {
    display: none;
  }
`

const Edit = styled.p`
  font-size: small;
  color: purple;
  text-align: right;
  margin: 1rem;
  cursor: pointer;
  
  &:active {
    text-decoration: underline;
  }
`

const Header = styled.p`
  text-align: left;
  font-size: 16px;
  margin-top: 0.5rem;
  margin-bottom: 0;
  font-weight: 600;
`

export default function Checkout(props) {
  const [dropDownState, setDropDownState] = useState(false)
  const form = useRef(null)
  const mState = MobileState()

  const [info, setInfo] = useState({
    fName: "",
    lName: "",
    phoneNo: "",
    email: ""
  })

  const [error, setError] = useState({
    fName: false,
    lName: false,
    phoneNo: false,
    email: false
  })

  function handleChange(event) {
    const target = event.target

    if(target.id === "fName") {
      setInfo({...info, fName: target.value})
      if(target.value.length < 1) error.fName = true
      else error.fName = false
    } else if(target.id === "lName") {
      setInfo({...info, lName: target.value})
      if(target.value.length < 1) error.lName = true
      else error.lName = false
    } else if(target.id === "phoneNo") {
      const hasLetter = /[a-zA-Z]/g
      if(!hasLetter.test(target.value)) {
        setInfo({...info, phoneNo: target.value})
        if(target.value.length < 9) error.phoneNo = true
        else error.phoneNo = false
      }
    } else {
      setInfo({...info, email: target.value})
      if(target.value.length < 10) error.email = true
      else error.email = false
    }
  }

  function toggleDropDown() {
    setDropDownState(!dropDownState)
  }

  function inputCheck() {
    if(info.fName.length < 1) error.fName = true
    if(info.lName.length < 1) error.lName = true
    if(info.phoneNo.length < 9) error.phoneNo = true
    if(info.email.length < 10) error.email = true

    if(error.fName === true || error.lName === true || error.phoneNo === true || error.email === true) {
      setError({...error})
    } else {
      props.checkout(info)
    }
  }

  return (
    <div>
      {mState ? <Body>
        {/* <p style={{padding: '1rem', margin: '0', textAlign: 'left', fontWeight: '600', backgroundColor: '#efefef'}}>CHECKOUT</p> */}
        <OrderCtn>
        <Header style={{margin: '1rem'}}>Your Cart</Header>
        <OrderWrapper dropDownState={dropDownState}>
          <OrderLabel dropDownState={dropDownState}>
            <OrderTitle>
              <OrderText left>{props.numItems} Item{props.numItems === 1 ? '' : 's'}</OrderText>
              <p>|</p>
              <OrderText>${props.total}</OrderText>
            </OrderTitle>
            <ArrowContainer dropDownState={dropDownState}>
              <DownArrow onClick={toggleDropDown}/>
            </ArrowContainer>
          </OrderLabel>
          <Seperator dropDownState={dropDownState}/>
          <OrderDetails dropDownState={dropDownState}>
            {props.cart.map(item => {
                return <CartItem 
                  title={item.title}
                  img={item.img}
                  size={item.size}
                  quantity={item.quantity}
                  price={item.price}
                  details={item.details}
                  chicken={item.chicken}
                  powderToppings={item.powderToppings}
                  chickenToppings={item.chickenToppings}
                  sauce={item.sauce}
                  cut={item.cut}
                  sides={item.sides}
                  editItem={() => props.editItem(item)}
                  key={item.key}
                  checkout
                />
            })}
            <a href="/order"><Edit>Edit order</Edit></a>
          </OrderDetails>
        </OrderWrapper>
      </OrderCtn>
      <OrderInfoCtn>
              <Header>Order Information</Header>
              <OrderInfo>
                <AccessTime />
                <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%'}}>5th April, 3:15PM</p>
              </OrderInfo>
              <OrderInfo>
                <PinDrop />
                <div>
                  <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%', textAlign: 'left', marginBottom: '0.25rem'}}>Rosedale Store</p>
                  <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%', textAlign: 'left'}}>33b Triton Drive, Rosedale, Auckland, NZ</p>
                </div>
              </OrderInfo>
        </OrderInfoCtn>
      <div>
        <Form ref={form}>
        <Header>Contact Information</Header>
        <TextField fullWidth id="fName" label="First name" variant="standard" required value={info.fName} onChange={handleChange} helperText={error.fName ? "Please enter a first name" : ""} error={error.fName} style={{margin: '0.5rem 0'}}/>
        <TextField fullWidth id="lName" label="Last name" variant="standard" required value={info.lName} onChange={handleChange} helperText={error.lName ? "Please enter a  last name" : ""} error={error.lName} style={{margin: '0.5rem 0'}}/>
        <TextField fullWidth id="phoneNo" label="Phone number" variant="standard" required value={info.phoneNo} onChange={handleChange} helperText={error.phoneNo ? "Please enter a valid phone number" : ""} error={error.phoneNo} style={{margin: '0.5rem 0'}}/>
        <TextField fullWidth id="email" label="Email address" variant="standard" required value={info.email} onChange={handleChange} helperText={error.email ? "Please enter a valid email address" : ""} error={error.email} style={{margin: '0.5rem 0'}}/>
        <CheckoutBtn checkout={inputCheck}/>
      </Form>
      </div>
        </Body> : <div>
        <h2 style={{textAlign: 'left', width: '1200px', margin: '1rem auto 0 auto', borderBottom: '1px solid black'}}>CHECKOUT</h2>
        <Body>
        <div style={{position: 'sticky', height: 'auto'}}>
          <OrderInfoCtn>
              <Header>Order Information</Header>
              <OrderInfo>
                <AccessTime />
                <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%'}}>5th April, 3:15PM</p>
              </OrderInfo>
              <OrderInfo>
                <PinDrop />
                <div>
                  <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%', textAlign: 'left', marginBottom: '0.25rem'}}>Rosedale Store</p>
                  <p style={{margin: '0 0 0 0.5rem', fontSize: '14px', height: '100%', textAlign: 'left'}}>33b Triton Drive, Rosedale, Auckland, NZ</p>
                </div>
              </OrderInfo>
          </OrderInfoCtn>
          <Form ref={form}>
          <Header>Contact Information</Header>
          <TextField fullWidth id="fName" label="First name" variant="standard" required value={info.fName} onChange={handleChange} helperText={error.fName ? "Please enter a first name" : ""} error={error.fName} style={{margin: '0.5rem 0'}}/>
          <TextField fullWidth id="lName" label="Last name" variant="standard" required value={info.lName} onChange={handleChange} helperText={error.lName ? "Please enter a  last name" : ""} error={error.lName} style={{margin: '0.5rem 0'}}/>
          <TextField fullWidth id="phoneNo" label="Phone number" variant="standard" required value={info.phoneNo} onChange={handleChange} helperText={error.phoneNo ? "Please enter a valid phone number" : ""} error={error.phoneNo} style={{margin: '0.5rem 0'}}/>
          <TextField fullWidth id="email" label="Email address" variant="standard" required value={info.email} onChange={handleChange} helperText={error.email ? "Please enter a valid email address" : ""} error={error.email} style={{margin: '0.5rem 0'}}/>
          <CheckoutBtn checkout={inputCheck}/>
          </Form>
        </div>
        <OrderCtn>
          <OrderWrapper dropDownState={dropDownState}>
            <Header style={{margin: '1rem 0 0 1rem'}}>Your Cart</Header>
            <OrderLabel dropDownState={dropDownState}>
              <OrderTitle>
                <OrderText left>{props.numItems} Item{props.numItems === 1 ? '' : 's'}</OrderText>
                <p>|</p>
                <OrderText>${props.total}</OrderText>
              </OrderTitle>
              <ArrowContainer dropDownState={dropDownState}>
                <DownArrow onClick={toggleDropDown}/>
              </ArrowContainer>
            </OrderLabel>
            <Seperator dropDownState={dropDownState}/>
            <OrderDetails dropDownState={dropDownState}>
              {props.cart.map(item => {
                  return <CartItem 
                    title={item.title}
                    img={item.img}
                    size={item.size}
                    quantity={item.quantity}
                    price={item.price}
                    details={item.details}
                    chicken={item.chicken}
                    powderToppings={item.powderToppings}
                    chickenToppings={item.chickenToppings}
                    sauce={item.sauce}
                    cut={item.cut}
                    sides={item.sides}
                    editItem={() => props.editItem(item)}
                    key={item.key}
                    checkout
                  />
              })}
              <a href="/order"><Edit>Edit order</Edit></a>
            </OrderDetails>
          </OrderWrapper>
        </OrderCtn>
        </Body>
        </div>}
    </div>
  )
}