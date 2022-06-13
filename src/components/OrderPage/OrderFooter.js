import React from 'react';
import styled from 'styled-components';
import { ShoppingBasketOutlined as Basket } from '@material-ui/icons'
import { Badge } from '@material-ui/core'

const Container = styled.div`
    width: 100%;
    height: 65px;
    background-color: #cf8334;
    color: white;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: ${props => props.numItems > 0 ? '0px' : '-65px'};
    transition: bottom 0.5s ease;
    z-index: 40;

    @media(min-width: 700px) {
        bottom: 0;
        right: 0;
        display: absolute;
        height: 80px;
        width: 160px;
        border-radius: 3rem;
        margin: 1rem;
        margin-right: 2rem;
        cursor: pointer;
    }

    &:hover {
        box-shadow: 0 0 4px 1px gray;
    }

    &:active {
        background-color: #f7a249;
    }
`

const CounterContainer = styled.div`
    width: auto;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin-left: 1rem;
`

export default function OrderFooter(props) {
    return (
        <Container onClick={props.toggleCart} numItems={props.numItems}>
            <CounterContainer>View Order</CounterContainer>
            <Badge badgeContent={props.numItems} style={{
                marginRight: '1rem'
            }}>
                <Basket style={{
                    fontSize: '25px'
                }}/>
            </Badge>
        </Container>
    )
}

