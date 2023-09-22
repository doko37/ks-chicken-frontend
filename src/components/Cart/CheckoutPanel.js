import React, { useState } from 'react'
import styled from 'styled-components'
import { TextField, ThemeProvider, createTheme } from '@material-ui/core'
import { PinDrop, AccessTime } from '@material-ui/icons'
import './tf.css'
import '../../App.css'
import moment from 'moment'
import { useSelector } from 'react-redux'

export const Body = styled.div`
  position: relative;
  width: auto;
  margin: 1rem;
  border-radius: 1rem;
  background-color: rgba(0,0,0,0.3);
  box-shadow: 0 0 4px 0 black;
  height: fit-content;

  @media(min-width: 700px) {
    position: sticky;
    top: 16px;
    min-width: 368px;
  }
`

const Ctn = styled.div`
  margin: 0.5rem 1rem;
  overflow: hidden;
`

const Label = styled.p`
  color: white;
  text-align: left;
  font-size: 24px;
  margin: 0;
`

const SubCtn = styled.div`
  margin: 0.5rem 0;
  padding: 0.5rem;
  position: relative;
`

const Divider = styled.div`
  margin: 0;
  height: 0px;
  border-top: 2px solid #252425;
`

const FlexCtn = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

const Text = styled.p`
  color: ${props => props.sub ? 'gray' : 'white'};
  font-size: ${props => props.sub ? '16px' : '18px'};
  margin: 0;
  margin-left: ${props => props.item ? '0' : '0.5rem'};
  text-align: left;
`

const Change = styled.p`
  position: relative;
  margin: 0 auto;
  color: white;
  margin-left: 1rem;
  text-decoration: underline;
  cursor: pointer;

  @media(min-width: 700px) {
    margin-left: auto;
    margin-right: 0.5rem;
  }
`

const Button = styled.div`
  height: 50px;
  background-color: ${props => props.numHalfs > 10 ? '#808080' : '#cf8334'};
  border-radius: 1rem;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.5rem 0 1rem 0;
  font-size: 26px;
  cursor: pointer;

  &:active {
    background-color: ${props => props.numHalfs > 10 ? '#808080' : '#A56829'};
  }
`

const theme = createTheme({
  palette: {
    type: 'dark'
  },
  typography: {
    fontFamily: "coffee_rg"
  }
})

export default function CheckoutPanel(props) {
  const [custInfo, setCustInfo] = useState({
    fn: 'asd',
    ln: 'asd',
    email: 'kschicken.ltd@gmail.com',
    phno: '0215679123'
  })

  const [firstAttempt, setFirstAttempt] = useState(true)
  const cart = useSelector((store) => store.user.cart)
  const pickupTime = useSelector((store) => store.user.sessionInfo.pickupTime)

  function handleChange(event) {
    setCustInfo({ ...custInfo, [event.target.name]: event.target.value })
  }

  const checkout = () => {
    setFirstAttempt(false)
    if (custInfo.fn !== '' && custInfo.ln !== '' && custInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) && custInfo.phno.match(/^02[0-2,6-9]\d{6,8}$/)) {
      props.checkout(custInfo)
    }
  }

  return (
    <Body>
      <Ctn>
        <SubCtn>
          <Label>PICK UP INFORMATION</Label>
          <FlexCtn>
            <PinDrop style={{ color: 'white', fontSize: '26px' }} />
            <div>
              <Text>KS Chicken Rosedale</Text>
              <Text sub>33B Triton Drive, Rosedale, 0632</Text>
            </div>
          </FlexCtn>
          <FlexCtn style={{ marginBottom: '0' }}>
            <AccessTime style={{ color: 'white', fontSize: '26px' }} />
            <div>
              <Text>{moment(pickupTime).format('dddd, MMM Do, h:mm A')}</Text>
              <Text style={{ fontSize: '14px', color: 'darkred', display: moment().day() === 0 || (moment().hour() < 11 || moment().hour() > 20 || moment().hour() === 20 && moment().minute() > 15) ? '' : 'none' }}>We are currently closed. Order for another time?</Text>
            </div>
            <Change onClick={props.togglessState}>Change</Change>
          </FlexCtn>
        </SubCtn>
        <Divider />
        <SubCtn>
          <Label>CUSTOMER INFORMATION</Label>
          <ThemeProvider theme={theme}>
            <TextField
              label="First Name"
              name="fn"
              value={custInfo.fn}
              variant="standard"
              style={{ width: '100%', margin: '0.5rem 0 0.5rem 2px' }}
              onChange={handleChange}
              type="text"
              error={!firstAttempt && custInfo.fn === ''}
              required
            />
            <TextField
              label="Last Name"
              name="ln"
              value={custInfo.ln}
              variant="standard"
              style={{ width: '100%', margin: '0.5rem 0 0.5rem 2px' }}
              onChange={handleChange}
              type="text"
              error={!firstAttempt && custInfo.ln === ''}
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="standard"
              style={{ width: '100%', margin: '0.5rem 0 0.5rem 2px' }}
              value={custInfo.email}
              onChange={handleChange}
              type="email"
              error={!firstAttempt && !custInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)}
              required
            />
            <TextField
              label="Mobile Number"
              name="phno"
              variant="standard"
              style={{ width: '100%', margin: '0.5rem 0 0.5rem 2px' }}
              value={custInfo.phno}
              onChange={handleChange}
              type="number"
              error={!firstAttempt && !custInfo.phno.match(/^02[0-2,6-9]\d{6,8}$/)}
              required
            />
          </ThemeProvider>
        </SubCtn>
        <Divider />
        <SubCtn last>
          <Label>ORDER SUMMARY</Label>
          <div style={{ borderBottom: '2px dashed white' }}>
            {props.cart.items.map(item => {
              return (
                <FlexCtn key={item.key} style={{ justifyContent: 'space-between' }}>
                  <Text item>{item.quantity} x {item.name.toUpperCase()}</Text>
                  <Text>${(item.price * item.quantity).toFixed(2)}</Text>
                </FlexCtn>
              )
            })}
          </div>
          <Label style={{ fontSize: '18px', marginTop: '1rem', color: 'gray' }}>SUB TOTAL: ${cart.total.toFixed(2)}</Label>
          <Label style={{ fontSize: '18px', marginTop: '1rem', color: 'gray' }}>+ CARD CHARGE & SERVICE FEE: ${((((cart.total - props.discount) / (1 - 0.029)) - (cart.total - props.discount)) + 0.31).toFixed(2)}</Label>
          {props.discount === 0 ? null : <Label style={{ fontSize: '18px', marginTop: '1rem', color: 'gray' }}>- HALF AND HALF DISCOUNT: ${props.discount}</Label>}
          <Label style={{ fontSize: '20px', marginTop: '1rem' }}>TOTAL: ${(((cart.total - props.discount)/(1-0.029)) + 0.31).toFixed(2)}</Label>
        </SubCtn>
        <Button onClick={cart.numHalfs > 10 ? null : checkout} style={{fontFamily: 'coffee_rg'}} numHalfs={cart.numHalfs}>CHECKOUT</Button>
        <Text style={{ textAlign: 'center', fontFamily: 'coffee_rg_it', fontSize: '18px', margin: '1rem 0', color: 'gray', display: cart.numHalfs > 10 ? 'block' : 'none' }}>
          Online order limit is 5 fulls (or 10 halfs).
          <br/>
          If you would like to order more, please <a style={{margin: '0', width: 'fit-content', color: 'gray'}} href="/contact-us">call us.</a></Text>
      </Ctn>
    </Body>
  )
}
