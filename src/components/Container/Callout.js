import React from 'react'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import '../../App.css'

const Body = styled.div`
    height: 50px;
    width: ${window.innerWidth - 16}px;
    margin: 0.5rem;
    border-radius: 1rem;
    background-color: #131313;
    color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 100;
`

const Ctn = styled.div`
    margin: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export default function Callout() {
  return (
    <Body className='Normal'>
        <Ctn>
            <p>ITEM "HOT AND SPICY CHICKEN" REMOVED FROM CART</p>
            <Close style={{marginTop: '-2px'}}/>
        </Ctn>
    </Body>
  )
}
