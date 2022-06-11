import React from 'react'
import styled from 'styled-components'
import '../../App.css'

const Body = styled.div`
    width: 100%;
    height: 300px;
    background-color: #1e1e1e;
    color: white;
    left: ${props => props.cartState ? `-${window.innerWidth}px` : '0px'};
    transition: left 0.25s ease;
    position: relative;

    @media (min-width: 700px) {
        left: 0;
    }
`

export default function Footer(props) {
  return (
    <Body className='Italic' cartState={props.cartState}>Footer [TODO]</Body>
  )
}
