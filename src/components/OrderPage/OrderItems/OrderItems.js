import React from 'react';
import styled from 'styled-components';
import OrderItem from './OrderItem/OrderItem';
import { Sides, OrderChicken } from '../../Data'
import coke from '../../../Images/cokecan.jpg'
import '../../../App.css'

const Container = styled.div`
    z-index: 10;
    background-color: white;

    @media (min-width: 1200px) {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 1rem;
    }
`

const SectionCtn = styled.div`
    background-color: ${props => props.odd ? '#e6e6e6' : '#efefef'};
    padding: 0.5rem 0;

    @media (min-width: 700px) {
        background-color: white;
    }
`

const Header = styled.p`
    //margin: ${props => props.top ? '0 0.5rem 0.5rem 0.5rem' : '0rem 0.5rem 0.5rem 0.5rem'};
    margin: 0.5rem;
    margin-top: 0;
    padding-top: ${props => props.top ? '0.25rem' : '0'};
    border-bottom: 1px solid black;
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
        <Container className='Italic'>
            <SectionCtn odd>
                <Header top>CHICKEN</Header>
                <ItemContainer>
                    {OrderChicken.map(item => {
                        return <OrderItem img={item.img} title={item.title} details={item.details} key={item.key} priceLabel={item.priceLabel} selectItem={() => props.itemSelected(item)}/>
                    })}
                </ItemContainer>
            </SectionCtn>
            <SectionCtn>
                <Header>SIDES</Header>
                <ItemContainer>
                    {Sides.map(item => {
                        return <OrderItem img={item.img} title={item.title} details={item.details} key={item.key} priceLabel={item.priceLabel} price={item.price} selectItem={() => props.itemSelected(item)}/>
                    })}
                </ItemContainer>
            </SectionCtn>
            <SectionCtn odd>
                <Header>DRINKS</Header>
                <ItemContainer odd>
                    <OrderItem img={coke} title="Coke 355ml" priceLabel="$2" key="drink"/>
                </ItemContainer>
            </SectionCtn>
        </Container>
    )
}
