import React from 'react';
import styled from 'styled-components';

const BackDrop = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 50%;
    z-index: ${props => props.cart ? '50' : '100'};
    display: ${props => props.cartState ? 'absolute' : 'none'};
`

export default function Backdrop(props) {
  return (
      <BackDrop cartState={props.cartState} onClick={props.toggleCart} cart={props.cart}/>
  )
}
