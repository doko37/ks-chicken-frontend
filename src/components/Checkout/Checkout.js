import React, { useState } from 'react'
import styled from 'styled-components'
import { KeyboardArrowDown as DownArrow } from '@material-ui/icons'
import CartItem from '../OrderPage/Cart/CartItem'

const Body = styled.div`
  width: auto;
  position: relative;
  z-index: 10;
`

const Form = styled.form`
  display: block;
  width: auto;
  margin: 0;
  margin-left: 1rem;
  margin-bottom: 1rem;
  position: relative;
  z-index: 10;
  overflow-x: hidden;
`

const InputCtn = styled.div`
  display: block;
  justify-content: left;
  width: auto;
  margin: 0.5rem 2rem 0 0;
  position: relative;
`

const Input = styled.input`
  width: 100%;
  justify-self: left;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid black;
`

const Label = styled.p`
  margin: 0;
  width: 100%;
  text-align: left;
  font-size: 14px;
`

const OrderCtn = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 10;
`

const OrderWrapper = styled.div`
  border-radius: 0.5rem;
  margin: 0 1rem;
  box-shadow: 0 0 2px 0 gray;
  height: ${props => props.dropDownState ? 'auto' : '42px'};
  max-height: ${props => props.dropDownState ? '400px' : '42px'};
  transition: max-height 0.25s ease-in-out;
  padding-bottom: 0.5rem;
  overflow: hidden;
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
`

const OrderDetail = styled.div`
  width: auto;
  height: 40px;
  display: flex;
  align-items: center;
  margin: 0 1rem;
`

const ArrowContainer = styled.div`
  transform: ${props => props.dropDownState ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.25s ease;
  height: 24px;
  width: 24px;
`

const CheckoutBtn = styled.input`
  width: 100%;
  background-color: #cf8334;
  height: 40px;
  color: white;
  margin: 1rem;
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

export default function Checkout(props) {
  const [dropDownState, setDropDownState] = useState(false)

  const [info, setInfo] = useState({
    custName: "",
    phoneNo: "",
    email: ""
  })

  function handleChange(event) {
    const target = event.target

    if(target.name === "custName") {
      setInfo({...info, custName: target.value})
    } else if(target.name === "phoneNo") {
      setInfo({...info, phoneNo: target.value})
    } else {
      setInfo({...info, email: target.value})
    }
  }

  function toggleDropDown() {
    setDropDownState(!dropDownState)
  }

  function checkout() {
    console.log(props.cart)
  }

  return (
    <Body>
      <OrderCtn>
        <p style={{textAlign: 'left', marginLeft: '1rem', marginBottom: '0.5rem'}}>Your Order</p>
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
      <Form>
        <InputCtn>
          <Label>Name</Label>
          <Input type="text" name="custName" value={info.custName} onChange={handleChange}/>
        </InputCtn>
        <InputCtn>
          <Label>Phone Number</Label>
          <Input type="number" inputMode='tel' name="phoneNo" value={info.phoneNo} onChange={handleChange}/>
        </InputCtn>
        <InputCtn>
          <Label>Email</Label>
          <Input type="email" inputMode='email' name="email" value={info.email} onChange={handleChange}/>
        </InputCtn>
      </Form>
    </Body>
  )
}
