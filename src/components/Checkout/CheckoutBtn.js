import React from 'react'
import styled from 'styled-components'

const Ctn = styled.div`
    height: 40px;
    position: relative;
`

const Btn = styled.button`
    background-color: #cf8334;
    color: white;
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0.25rem;
    margin: 1rem 0;
    cursor: pointer;
`

export default function CheckoutBtn(props) {
  return (
    <Ctn>
        <Btn type="button" onClick={props.checkout}>Continue to Payment</Btn>
    </Ctn>
  )
}
