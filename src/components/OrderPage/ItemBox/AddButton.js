import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: auto;
    height: 60px;
    color: white;
    background-color: #cf8334;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    border-radius: 0.5rem;
    cursor: pointer;

    &:active {
        background-color: #f0983c;
    }
`

export default function AddButton(props) {
  return (
    <Container onClick={props.addItem}>
        {props.children}
    </Container>
  )
}
