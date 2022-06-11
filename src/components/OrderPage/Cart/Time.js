import React from 'react'
import styled from 'styled-components'
import { Warning, PinDrop } from '@material-ui/icons'

const Body = styled.div`
  background-color: white;
  padding-bottom: 0.5rem;
`

const Ctn = styled.div`
    display: flex;
    align-items: center;
    justify-content: left;
    padding-left: 1rem;
    border-radius: 0.25rem;
    background-color: ${props => props.set ? 'white' : '#ffc9c9'};
    max-height: 50px;
    margin: ${props => props.bottom ? '0.5rem' : 0};
    margin-bottom: 0;
`

export default function Time(props) {
  return (
    <Body>
      <Ctn set={true}>
        <PinDrop style={{color: 'orange'}}/>
        <p onClick={props.findRestaurant} style={{color: 'orange', textDecoration: 'underline', marginLeft: '0.5rem', cursor: 'pointer'}}>Find a restaurant</p>
      </Ctn>
      <Ctn set={props.set} bottom>
          <Warning style={{color: '#a65050'}}/>
          <p style={{color: '#a65050', marginLeft: '0.5rem'}}>No restaurant selected</p>
      </Ctn>
    </Body>
  )
}
