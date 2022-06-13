import React, { useState } from 'react';
import styled from 'styled-components';
import { Add, Remove } from '@material-ui/icons';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 50%;
    margin: 0.5rem auto;
    padding-top: 1rem;
`

const Button = styled.div`
    width: 50px;
    height: 50px;
    background-color: #1e1e1e;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    cursor: pointer;

    &:active {
        opacity: 50%;
    }
`

const Quantity = styled.div`
    width: 50px;
    height: 50px;
    background-color: gray;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    font-weight: 600;
    color: white;
`

export default function QuantityBox(props) {
    function handleButton(button) {
        if(button === "remove") {
            if(props.quantity > 1) {
                props.changeQuantity(props.quantity - 1)
            }
        } else {
            props.changeQuantity(props.quantity + 1)
        }
    }

    return (
        <Container>
            <Button onClick={() => handleButton("remove")}>
                <Remove style={{
                    color: 'white'
                }}/>
            </Button>
            <Quantity>{props.quantity}</Quantity>
            <Button onClick={() => handleButton("add")}>
                <Add style={{
                    color: 'white'
                }}/>
            </Button>
        </Container>
    )
}
