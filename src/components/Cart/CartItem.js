import React, { useState } from 'react'
import styled from 'styled-components'
import { Desc, Title } from '../Menu/Item/Item'
import { KeyboardArrowDown as Down } from '@material-ui/icons'

const Body = styled.div`
    border-radius: 1rem;
    background-color: rgba(0,0,0,0.2);
    margin: 1rem;
    min-height: 180px;
    display: block;

    @media(min-width: 900px) {
      display: flex;
      justify-content: space-between;
    }
`

const TopCtn = styled.div`
    min-height: 120px;
    display: flex;
    justify-content: start;
`

const ImgCtn = styled.div`
  margin: 0.5rem;
  margin-right: 0.5rem;

  @media(min-width: 700px) {
    margin: 1rem;
  }
`

const Image = styled.img`
  border-radius: 1rem;
  height: 104px;
  
  @media(min-width: 700px) {
    height: 150px;
  }

  @media(min-width: 1000px) {
    height: 200px;
  }
`

const BottomCtn = styled.div`
  height: 60px;
  margin: 0 0.5rem;
  border-top: 2px white dashed;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media(min-width: 900px) {
    height: auto;
    border-top: none;
    display: grid;
    margin: 0 1rem;
  }
`

const Text = styled.p`
  width: fit-content;
  height: fit-content;
  text-align: right;
  margin: 1rem 0;
  font-size: 20px;
  align-self: center;

  @media(min-width: 700px) {
    font-size: ${props => props.price ? '26px' : '20px'};
    align-self: ${props => props.price ? 'start' : 'end'};
  }
`

export default function CartItem(props) {
  const [dState, setDState] = useState(false)

  function toggleDetails() {
    setDState(!dState)
  }

  return (
    <Body>
      <TopCtn>
        <ImgCtn>
          <Image src={props.img} />
        </ImgCtn>
        <div>
          <Title cartItem>{props.item.name.toUpperCase()} x {props.item.quantity}</Title>
          <div onClick={toggleDetails} style={{ display: 'flex', alignItems: 'center' }}>
            <Desc style={{ margin: '0 4px 0 8px', fontSize: '18px', cursor: 'pointer' }}>DETAILS</Desc>
            <Down style={{ color: 'lightgray', transform: dState ? 'rotate(180deg)' : 'rotate(0deg)', cursor: 'pointer' }} />
          </div>
          {dState ? props.item.type === "chicken" || props.item.key.includes("chips") ? <div>
            <Desc>{props.item.size.toUpperCase()}</Desc>
            {props.item.toppings.snowy ? <Desc>SNOWY CHEESE TOPPING + ${props.item.type === "chicken" ? props.item.size === "half" ? '2.00' : '4.00' : '2.00'}</Desc> : null}
            {props.item.toppings.onion ? <Desc>ONION SEASONING TOPPING + $2.00</Desc> : null}
            {props.item.type === "chicken" ? <div>
              <Desc>{props.item.cut.toUpperCase()}</Desc>
              <Desc>SIDES: {props.item.sides.side1.toUpperCase()}{props.item.sides.side2 === "nosides" ? null : ", " + props.item.sides.side2.toUpperCase()}</Desc>
            </div> : null}
          </div> : null : null}
        </div>
      </TopCtn>
      <BottomCtn>
        <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'end', alignSelf: 'end' }}>
          <Text onClick={props.removeItem} style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>REMOVE</Text>
          <Text onClick={props.toggleDrawer} style={{ color: 'white', textDecoration: 'underline', cursor: 'pointer', marginLeft: '1rem' }}>EDIT</Text>
        </div>
        <Text price style={{ color: 'white', gridRowStart: '-1', justifySelf: 'end' }}>${props.item.price.toFixed(2)}</Text>
      </BottomCtn>
    </Body>
  )
}


