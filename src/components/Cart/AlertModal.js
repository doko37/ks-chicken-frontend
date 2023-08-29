import React from 'react'
import styled from 'styled-components'
import { ErrorOutline } from '@material-ui/icons'
import '../../App.css'
import Backdrop from '../Menu/Drawer/Backdrop'

const Ctn = styled.div`
    background-color: #201e1f;
    position: fixed;
    top: ${props => props.active ? '0' : '100vh'};
    bottom: ${props => props.active ? '0' : '-100vh'};
    left: 0;
    right: 0;
    margin: auto;
    height: fit-content;
    width: fit-content;
    padding: 1rem;
    border-radius: 1rem;
    z-index: 150;
    color: white;
    font-family: 'coffee_rg';
    font-size: 18px;
    transition: all 0.5s cubic-bezier(0.43,-0.12, 0.5, 1.12);
    box-shadow: 0px 0px 4px 1px black;
`

const Btn = styled.button`
    background-color: #cf8334;
    padding: 0.5rem 1rem;
    text-decoration: none;
    border: none;
    color: white;
    border-radius: 1rem;
    font-family: 'coffee_rg';
    font-size: 18px;
    cursor: pointer;
`

export const AlertModal = (props) => {
  return (
    <>
        <Ctn active={props.timeAvailable}>
            <ErrorOutline style={{color: 'white', fontSize: '30px'}}/>
            <p>Your order time is no longer available, sorry about that.</p>
            <p>Please choose another time.</p>
            <Btn onClick={props.toggleTimeAvailable}>CLOSE</Btn>
        </Ctn>
        <Backdrop active={props.timeAvailable} toggleDrawer={props.toggleTimeAvailable}/>
    </>
  )
}
