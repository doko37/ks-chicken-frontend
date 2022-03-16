import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: auto;
    height: auto;
    margin: ${props => props.checkout ? '0 1rem' : '0'};
    margin-bottom: 0.5rem;
    background-color: white;
    box-shadow: 0 0 1px 0px gray;
    border-radius: 0.125rem;
    position: relative;
    z-index: 1;
    cursor: ${props => props.checkout ? 'default' : 'pointer'};

    &:hover {
      box-shadow: ${props => props.checkout ? '0 0 1px 0px gray' : '0 0 1px 1px gray'};
    }

    &:active {
      background-color: ${props => props.checkout ? 'white' : '#efefef'};
    }

    &:nth-child(1) {
      margin-top: ${props => props.checkout ? '4px' : '0'};
    }
`

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Description = styled.div`
  text-align: left;
  margin: 0 0 0 38px;
`

const Title = styled.p`
  font-weight: 600;
  font-size: small;
  margin: 0.5rem;
`

const DetailHeader = styled.p`
  font-size: small;
  margin: 0;
  font-weight: 600;
`

const Details = styled.p`
  font-size: small;
  margin: 0;
`

const Left = styled.div`
  margin-left: 0.5rem;
  display: flex;
  align-items: center;
`

const Quantity = styled.p`
  border: 1px solid black;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.125rem;
  margin: 0.5rem 0;
`

const Price = styled.div`
  margin-right: 0.5rem;
`

const Bottom = styled.div`
  padding-bottom: 0.5rem;
  display: ${props => props.show ? 'block' : 'none'};
`

export default function CartItem(props) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <Container onClick={props.checkout ? null : props.editItem} checkout={props.checkout}>
      <Top>
        <Left>
          <Quantity>{props.quantity}</Quantity>
          <Title>{props.title}</Title>
        </Left>
        <Price>${props.price * props.quantity}</Price>
      </Top>
      <Bottom show={props.details}>
        <Description>
          {props.size ? <div>
              <DetailHeader>Size:</DetailHeader>
              <Details>{capitalizeFirstLetter(props.size)}</Details>
            </div> : null}
          <div style={{display: `${props.chicken ? 'block' : 'none'}`}}>
            <DetailHeader>Chicken:</DetailHeader>
            {props.chicken ? <Details>-{props.chicken.title}</Details> : null}
            <DetailHeader>Cut:</DetailHeader>
            {props.chicken ? <Details>-{capitalizeFirstLetter(props.cut)}</Details> : null}
          </div>
          <div style={{display: `${props.powderToppings ? 'block' : 'none'}`}}>
            <DetailHeader>Toppings:</DetailHeader>
            {props.chickenToppings && props.chickenToppings.sesame ? <Details>-Sesame</Details> : null}
            {props.chickenToppings && props.chickenToppings.peanuts ? <Details>-Peanuts</Details> : null}
            {props.chickenToppings && props.chickenToppings.parsley ? <Details>-Parsley</Details> : null}
            {props.powderToppings && props.powderToppings.snowy ? <Details>-Snowy ($2 extra)</Details> : null}
            {props.powderToppings && props.powderToppings.onion ? <Details>-Onion ($2 extra)</Details> : null}
          </div>
          <div style={{display: `${props.chicken ? 'block' : 'none'}`}}>
            <DetailHeader>Sides:</DetailHeader>
            {props.sides && props.sides.side1 ? <Details>-{capitalizeFirstLetter(props.sides.side1)}</Details> : null}
            {props.sides && props.sides.side2 ? <Details>-{capitalizeFirstLetter(props.sides.side2)}</Details> : null}
          </div>
          <div style={{display: `${props.sauce ? 'block' : 'none'}`}}>
            <DetailHeader>Option:</DetailHeader>
            <Details>-{props.sauce ? capitalizeFirstLetter(props.sauce) : null}</Details>
          </div>
        </Description>
      </Bottom>
    </Container>
  )
}
