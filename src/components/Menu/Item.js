import React from 'react'
import styled from 'styled-components'
import { AddCircleOutline as Add } from '@material-ui/icons'
import chili from './chili.png'

const Container = styled.div`
    width: auto;
    height: 120px;
    margin: 0 1rem 2rem 1rem;
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

const TitleCtn = styled.div`
    display: flex;
    align-items: center;
    position: relative;
`

const Title = styled.h3`
    font-size: 20px;
    font-weight: 300;
    margin: 0.5rem;
    color: ${props => props.type === "lunch" ? 'black' : 'white'};
    text-align: left;
`

const Chili = styled.img`
    width: 13.2px;
    height: 13.2px;
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

const NewLabel = styled.p`
    margin: 0;
    color: white;
    font-size: 20px;
    position: absolute;
    bottom: 0;
    right: 0;
    border-bottom: white 4px double;
    margin: 0.5rem 1rem;
    transform: rotate(-5deg);
`

// const Price = styled.p`
//     color: black;
// `

export default function Item(props) {
    return (
        <Container>
            <ImageContainer>
                <Image src={props.img} />
            </ImageContainer>
            <div>
                <TitleCtn>
                    <Title type={props.type}>{props.title}</Title>
                    {props.itemKey === "spicy" ? <Chili src={chili} /> : null}
                    {props.itemKey === "spicysoy" ?
                        <div>
                            <Chili src={chili} />
                            <Chili src={chili} />
                        </div> : null
                    }
                    {props.itemKey === "hotandspicy" ?
                        <div>
                            <Chili src={chili} />
                            <Chili src={chili} />
                            <Chili src={chili} />
                        </div> : null
                    }
                </TitleCtn>
                {props.type === "chicken" ?
                    <div>
                        {props.itemKey === "onion" || props.itemKey === "snowy" || props.itemKey === "quarter" ? <Desc>PER HALF - ${props.halfprice}</Desc> :
                            <div>
                                <Desc>HALF - ${props.halfprice}</Desc>
                                <Desc>FULL - ${props.fullprice}</Desc>
                            </div>
                        }
                    </div> : null}
                {props.type === "sides" ?
                    <div>
                        {props.itemKey === "chips" ? <div>
                            <Desc>MEDIUM - $6</Desc>
                            <Desc>LARGE - $8</Desc>
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
            { props.itemKey === "quarter" ? <NewLabel>New Item!</NewLabel> : null }
        </Container>
    )
}
