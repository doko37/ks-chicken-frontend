import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 110px;
    width: 100%;
    background-color: white;
    box-shadow: 0 0 4px 0 gray;
    position: absolute;
    bottom: 0;
    display: block;
    z-index: 10;
`

const ButtonCtn = styled.div`
    margin: 0 1rem;
    background-color: ${props => props.resSelected ? '#cf8334' : 'lightgray'};
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
        box-shadow: ${props => props.resSelected ? '0 0 4px 0px gray' : 'none'};
    }

    &:active {
        background-color: ${props => props.resSelected ? '#f0983c' : 'lightgray'};
    }
`

const CheckoutLink = styled.a`
    color: white;
    text-decoration: none;
    position: relative;
    align-self: center;
    display: ${props => props.resSelected ? props => props.cartState ? 'flex' : 'none' : 'none'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

const DeadLink = styled.p`
    color: white;
    margin: 0;
    text-decoration: none;
    position: relative;
    align-self: center;
    display: ${props => props.resSelected ? 'none' : props => props.cartState ? 'flex' : 'none'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`

export default function CheckoutBtn(props) {
  return (
    <Container>
        {props.children}
        <ButtonCtn resSelected={props.resSelected}>
            <CheckoutLink cartState={props.cartState} resSelected={props.resSelected} href="/checkout">Go to checkout</CheckoutLink>
            <DeadLink cartState={props.cartState} resSelected={props.resSelected}>Go to checkout</DeadLink>
        </ButtonCtn>
    </Container>
  )
}
