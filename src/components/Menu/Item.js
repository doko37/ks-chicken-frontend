import React from 'react'
import styled from 'styled-components'
import { AddCircleOutline as Add } from '@material-ui/icons'

const Container = styled.div`
    width: auto;
    height: 120px;
    margin: 0 1em 1em 1em;
    display: flex;
    position: relative;
    border-radius: 0.25rem;
    overflow: hidden;

    @media(min-width: 700px) {
        height: 170px;
    }
`

const ImageContainer = styled.div`
    width: auto;
    height: 100%;
    overflow: hidden;
    border-radius: 1rem;
`

const Image = styled.img`
    height: 100%;
    border-radius: 1rem;

    transition: all 0.5s;

    &:hover {
        transform: scale(1.05);
    }
`

const Title = styled.h3`
    font-size: 20px;
    font-weight: 300;
    margin: 0.5rem;
    color: ${props => props.type === "lunch" ? 'black' : 'white'};
    text-align: left;
`

const Desc = styled.div`
    text-align: start;
    color: lightgray;
    margin: 0.5rem;
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
            <div>
                <Title type={props.type}>{props.title}</Title>
                {props.type === "chicken" ? 
                <div>
                    {props.itemKey === "onion" || props.itemKey === "snowy" ? <Desc>PER HALF - ${props.halfprice}</Desc> :
                    <div>
                        <Desc>HALF - ${props.halfprice}</Desc>
                        <Desc>FULL - ${props.fullprice}</Desc>
                    </div>
                    }
                </div> : null}
                {props.type === "sides" ?
                <div>
                    {props.itemKey === "chips" ? <div>
                        <Desc>MEDIUM - $5</Desc>
                        <Desc>LARGE - $7</Desc>
                    </div> : <Desc>{props.price}</Desc>}
                </div> : null}
            </div>
            {/* <AddContainer lunch={props.type === "lunch"}>
                <AddLabel>Add to cart</AddLabel>
                <Add style={{
                    opacity: '70%',
                    fontSize: '30px',
                    marginLeft: '0.25rem',
                }}/>
            </AddContainer> */}
        </Container>
    )
}
