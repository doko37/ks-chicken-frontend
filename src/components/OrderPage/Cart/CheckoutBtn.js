import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 110px;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 6px 0px gray;
    position: absolute;
    bottom: 0;
    display: block;
`

const ButtonCtn = styled.div`
    margin: 0 1rem;
    background-color: #cf8334;
    height: 45px;
    width: auto;
    border: none;
    color: white;
    border-radius: 0.25rem;
    font-size: 17px;
    font-weight: 600;
    position: relative;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 2px 1px gray;
    }

    &:active {
        background-color: #f0983c;
    }
`

const CheckoutLink = styled.a`
    color: white;
    text-decoration: none;
    position: relative;
    align-self: center;
    display: ${props => props.cartState ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export default function CheckoutBtn(props) {
  return (
    <Container>
        {props.children}
        <ButtonCtn>
            <CheckoutLink cartState={props.cartState} href="/checkout">Go to checkout</CheckoutLink>
        </ButtonCtn>
    </Container>
  )
}
