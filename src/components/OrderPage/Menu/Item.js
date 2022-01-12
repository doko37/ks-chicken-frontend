import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: auto;
    height: 120px;
    margin: 0 1em 1em 1em;
    box-shadow: 0 0 4px 0 gray;
    background-color: white;
    display: flex;
    position: relative;
    border-radius: 0.5em;

    @media(min-width: 700px) {
        height: 170px;
    }
`

const Image = styled.img`
    height: 100%;
    border-radius: 0.5em 0 0 0.5em;
`

const Title = styled.h3`
    font-size: 15px;
    margin: 0;
    color: black;
`

const Desc = styled.div`
    text-align: start;
    margin: 0.5em;
`

const Price = styled.p`
    color: black;
`

export default function Item(props) {
    return (
        <Container>
            <Image src={props.img}/>
            <Desc>
                <Title>{props.title}</Title>
                {props.chicken ? 
                <div>
                    <Price>{props.lunch ? "" : "Half: $"}{props.halfprice}</Price>
                    <Price>{props.lunch ? "" : "Full: $"}{props.fullprice}</Price>
                </div> :
                <Price>{props.price}</Price>
                }
            </Desc>
        </Container>
    )
}
