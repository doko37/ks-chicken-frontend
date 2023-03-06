import React from 'react'
import styled from 'styled-components'

const Ctn = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.6);
    display: ${props => props.active ? 'block' : 'none'};
`

export default function Backdrop(props) {
  return (
    <Ctn active={props.active} onClick={props.toggleDrawer}/>
  )
}
