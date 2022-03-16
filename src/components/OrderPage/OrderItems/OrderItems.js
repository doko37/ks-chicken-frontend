import React from 'react';
import styled from 'styled-components';
import OrderItem from './OrderItem/OrderItem';
import { Sides, OrderChicken } from '../../Data'
import coke from '../../../Images/cokecan.jpg'

const Container = styled.div`
    z-index: 10;
    padding-top: 1rem;

    @media (min-width: 1200px) {
        width: 1200px;
        margin: 0 auto;
    }
`

const Header = styled.p`
    margin: ${props => props.top ? '0 1rem 1rem 1rem' : '1rem'};
    border-bottom: 4px dotted black;
    font-weight: 600;
    text-align: left;
    font-size: 22px;

    @media (min-width: 1200px) {
        font-size: 26px;
        margin: ${props => props.top ? '0 0.5rem 0.5rem 0.5rem' : '0.5rem'};
    }
`

const ItemContainer = styled.div`
    display: block;

    @media (min-width: 700px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
`

export default function OrderItems(props) {
    return (
        <Container>
            <Header top>CHICKEN</Header>
            <ItemContainer>
                {OrderChicken.map(item => {
                    return <OrderItem img={item.img} title={item.title} details={item.details} key={item.key} priceLabel={item.priceLabel} selectItem={() => props.itemSelected(item)}/>
                })}
            </ItemContainer>
            <Header>SIDES</Header>
            <ItemContainer>
                {Sides.map(item => {
                    return <OrderItem img={item.img} title={item.title} details={item.details} key={item.key} priceLabel={item.priceLabel} price={item.price} selectItem={() => props.itemSelected(item)}/>
                })}
            </ItemContainer>
            <Header>DRINKS</Header>
            <ItemContainer>
                <OrderItem img={coke} title="Coke 355ml" priceLabel="$2" key="drink"/>
            </ItemContainer>
        </Container>
    )
}
