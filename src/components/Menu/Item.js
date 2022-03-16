import React from 'react'
import styled from 'styled-components'
import { AddCircleOutline as Add } from '@material-ui/icons'

const Container = styled.div`
    width: auto;
    height: 120px;
    margin: 0 1em 1em 1em;
    background-color: white;
    display: flex;
    position: relative;
    border-radius: 0.5em;
    overflow: hidden;
    box-shadow: 0 0 3px 0 gray;

    @media(min-width: 700px) {
        height: 170px;
    }
`

const ImageContainer = styled.div`
    width: auto;
    height: 100%;
    overflow: hidden;
    border-radius: 0.5em 0 0 0.5em;
`

const Image = styled.img`
    height: 100%;
    border-radius: 0.5em 0 0 0.5em;

    transition: all 0.5s;

    &:hover {
        transform: scale(1.05);
    }
`

const Title = styled.h3`
    font-size: 15px;
    margin: 0.5rem;
    color: black;
`

const Desc = styled.div`
    text-align: start;
    margin: 0.5em;
`

const AddContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    margin: 0.5rem;
    display: ${props => props.lunch ? 'none' : 'flex'};
    align-items: center;
`
const AddLabel = styled.p`
    font-size: 14px;
    margin: 0;
`

// const Price = styled.p`
//     color: black;
// `

export default function Item(props) {
    return (
        <Container>
            <ImageContainer>
                <Image src={props.img}/>
            </ImageContainer>
            <Title>{props.title}</Title>
            {/* <AddContainer lunch={props.type === "lunch"}>
                <AddLabel>Add to cart</AddLabel>
                <Add style={{
                    opacity: '70%',
                    fontSize: '30px',
                    marginLeft: '0.25em',
                }}/>
            </AddContainer> */}
        </Container>
    )
}
