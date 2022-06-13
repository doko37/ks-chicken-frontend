import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 150px;
    margin: 1rem;
    background-color: white;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    justify-content: right;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    @media (min-width: 700px) {
        margin: 1rem;
        height: 180px;
    }
`

const Image = styled.img`
    position: absolute;
    top: 0;
    height: 150px;
    width: 100%;
    object-fit: cover;
    border-radius: 2rem;
    height: 100%;
    z-index: 1;
    transition: transform 0.5s ease;

    &:hover {
        transform: scale(1.1);
    }
`

const SideText = styled.div`
    text-align: right;
    border-radius: 0 0.25rem 0.25rem 0;
    display: flex;
    align-items: center;
    height: 100%;
    z-index: 10;
    color: white;
    background: linear-gradient(to left, rgba(0,0,0,0.8), rgba(0,0,0,0));

    &:active {
        background: linear-gradient(to left, rgba(0,0,0,0.4), rgba(0,0,0,0))
    }
`

const Title = styled.p`
    margin: 0 1rem;
    font-size: 18px;
`

const Price = styled.p`
    margin: 1rem 1rem 0 1rem;
    font-size: 14px;
    display: ${props => props.price ? '' : 'none'};
`

export default function OrderItem(props) {
  return (
    <Container onClick={props.selectItem}>
        <Image src={props.img}/>
        <SideText>
            <div>
                <Title>{props.title}</Title>
                <Price price={props.priceLabel}>{props.priceLabel}</Price>
            </div>
        </SideText>
    </Container>
  )
}
