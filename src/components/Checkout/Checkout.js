import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
  CardElement
} from "@stripe/react-stripe-js";
import KSLogo from '../../Images/logo.svg'
import StripeLogo from './stripeLogo.png'
import { useDispatch, useSelector } from 'react-redux';
import { resetCart, setPaymentStatus } from '../../features/user/userSlice';

const FormCtn = styled.div`
  width: fit-content;
  margin: auto;
  position: absolute;
  height: fit-content;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 1px 4px 0px black;
  background-color: #1c1c1c;
`

const PayButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  height: 3rem;
  border: 1px solid gray;
  border-radius: 0.5rem;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    box-shadow: inset 0 0 4px 2px black;
  }
`

const ButtonText = styled.span`
  color: white;
  font-size: 16px;
  font-weight: 600;
`

const Logo = styled.img`
  width: 100%;
  height: 40px;
  margin-bottom: 1rem;
`

const StripeLogoCtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  margin-bottom: 2rem;
`

const Stripelogo = styled.img`
  height: 40px;
`

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [message, setMessage]= useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const total = useSelector((store) => store.user.cart.total)

  useEffect(() => {
    if(!stripe) return

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    )

    if(!clientSecret) return

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch(paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded")
          break;
        case "processing":
          setMessage("Your payment is processing")
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again")
          break;
        default:
          setMessage("Something went wrong")
          break;
      }
    })

  }, [stripe])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!stripe || !elements) return

    setIsLoading(true)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/success'
      }
    }).then(() => {
      dispatch(resetCart())
      dispatch(setPaymentStatus({paid: true}))
    })

    if(error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message)
    } else {
      setMessage("An unexpected error occurred")
    }

    setIsLoading(false)
  }

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <main style={{backgroundColor: '#252425', position: 'relative', width: '100vw', height: '100vh', margin: '0', padding: '0rem 0'}}>
      <div style={{height: 'fit-content'}}>
        <StripeLogoCtn>
          <span style={{color: 'white', height: '100%', fontSize: '16px'}}>Powered by </span>
          <Stripelogo src={StripeLogo} alt="Stripe Logo"/>
        </StripeLogoCtn>
        <FormCtn>
          <Logo src={KSLogo} alt="KS Logo"/>
          <form id="payment-form" onSubmit={handleSubmit} style={{position: 'relative'}}>
            <PaymentElement id="payment-element" options={paymentElementOptions} />
            <PayButton disabled={isLoading || !stripe || !elements} id="submit">
              <ButtonText id="button-text">
                {isLoading ? <div className='spinner' id="spinner"></div> : `$${total.toFixed(2)} Pay Now`}
              </ButtonText>
            </PayButton>
          </form>
          <p style={{color: 'white', fontFamily: 'sans-serif', marginBottom: '1rem', marginTop: '2rem', fontWeight: '600'}}>{message}</p>
          <p style={{textAlign: 'end', margin: '0'}}>
            <a href="/cart" style={{color: 'white', fontFamily: 'sans-serif', textDecoration: 'none'}}>Cancel</a>
          </p>
        </FormCtn>
      </div>
    </main>
  )
}
