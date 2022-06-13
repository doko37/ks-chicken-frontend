import React, { useState } from 'react';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import CartItem from './CartItem';
import CheckoutBtn from './CheckoutBtn';
import Location from './Location';
import Time from './Time';
import RestaurantFinder, { Divider } from '../RestaurantFinder/RestaurantFinder';

const Container = styled.div`
    width: ${props => props.cartState ? '100%' : '0'};
    height: 100%;
    background-color: white;
    top: 0;
    right: 0;
    position: fixed;
    z-index: 51;
    transition: width 0.25s ease;
    background-color: #efefef;

    @media(min-width: 700px) {
        width: ${props => props.cartState ? '450px' : '0'};
        box-shadow: 0 0 4px 0px gray;
    } 
`

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
`

const InnerContainer = styled.div`
    width: 100%;
    height: auto;
    max-height: ${window.innerHeight - 110}px;
    overflow-y: auto;
    display: ${props => props.cartState ? '' : 'none'};
`

const ExitBtnContainer = styled.div`
    position: relative;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    right: 0;
    transform: ${props => props.cartState ? 'rotate(180)' : 'rotate(0)'};
    transition: transform 0.5s ease;
`

const ItemContainer = styled.div`
    padding: 1rem;
    background-color: white;
    margin-top: 0.25rem;
`

const TotalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-items: center;
    margin: 0 1rem;
`

const Total = styled.p`
    margin: 1rem 0;
`

const Filler = styled.div`
    background-color: white;
    height: 100%;
    overflow-y: hidden;
`

export default function Cart(props) {
    const [resSelected, setResSelected] = useState(false)
    const [finderState, setFinderState] = useState(false)

    function toggleFinder() {
        setFinderState(!finderState)
    }

  return (
    <Container cartState={props.cartState}>
        <RestaurantFinder set={finderState} toggleFinder={toggleFinder}/>
        <InnerContainer cartState={props.cartState}>
            <Header>
                {/* <div style={{
                    width: '56px'
                }}/> */}
                <h3 style={{
                    margin: '1rem 0',
                    textAlign: 'left',
                    marginLeft: '1rem'
                }}>Your Order</h3>
                <ExitBtnContainer onClick={props.toggleCart}>
                    <Close style={{cursor: 'pointer'}}/>
                </ExitBtnContainer>
            </Header>
            <Time set={resSelected} findRestaurant={toggleFinder}/>
            <ItemContainer>
                <p style={{margin: '0 1rem 1rem 0', textAlign: 'left', fontWeight: '600'}}>Your Cart</p>
                {props.cart.length < 1 ? <p style={{fontSize: 'small', textAlign: 'left'}}>Your cart is empty</p> : null}
                {props.cart.map(cartItem => {
                        return (
                            <CartItem 
                                title={cartItem.title}
                                img={cartItem.img}
                                size={cartItem.size}
                                quantity={cartItem.quantity}
                                price={cartItem.price}
                                details={cartItem.details}
                                chicken={cartItem.chicken}
                                powderToppings={cartItem.powderToppings}
                                chickenToppings={cartItem.chickenToppings}
                                sauce={cartItem.sauce}
                                cut={cartItem.cut}
                                sides={cartItem.sides}
                                editItem={() => props.editItem(cartItem)}
                                key={cartItem.key}
                            />
                        )
                })}
            </ItemContainer>
        </InnerContainer>
        <CheckoutBtn checkout={props.checkout} cartState={props.cartState} resSelected={resSelected}>
            <TotalContainer>
                <Total style={{fontWeight: 600}}>Total: ${props.total}</Total>
            </TotalContainer>
        </CheckoutBtn>
    </Container>
  )
}
