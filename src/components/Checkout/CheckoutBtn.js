import React from 'react'
import styled from 'styled-components'

const Ctn = styled.div`
    height: 40px;
    margin: 1rem;
`

const Btn = styled.button`
    background-color: #cf8334;
    color: white;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.5rem;
`

export default function CheckoutBtn(props) {
  return (
    <Ctn onClick={props.checkout}>
        <Btn>Checkout</Btn>
    </Ctn>
  )
}
