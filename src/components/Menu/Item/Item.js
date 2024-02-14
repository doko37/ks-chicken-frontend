import React from 'react'
import styled from 'styled-components'
import chili from './chili.png'
import { AddBox } from '@material-ui/icons'
import './Item.css'

const Container = styled.div`
    width: auto;
    height: fit-content;
    margin: 0 1rem 2rem 1rem;
    display: flex;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s;
    padding: ${props => props.type === 'drinks' ? '1rem' : '0'};

    &:hover {
        background-color: ${props => props.type === 'lunch' ? 'none' : 'rgba(0,0,0,0.4)'};
    }

    @media(min-width: 700px) {
        height: fit-content;
    }
`

const ImageContainer = styled.div`
    width: auto;
    height: 120px;
    overflow: hidden;
    border-radius: 1rem;

    @media(min-width: 700px) {
        height: 160px;
    }
`

const Image = styled.img`
    height: 100%;
    border-radius: 1rem;
    overflow: hidden;

    transition: all 0.5s;
`

const TitleCtn = styled.div`
    display: flex;
    align-items: center;
`

export const Title = styled.h3`
    font-size: 20px;
    font-weight: 300;
    margin: 0.5rem;
    color: ${props => props.type === "lunch" ? 'black' : 'white'};
    text-align: left;

    @media(min-width: 700px) {
        margin-top: ${props => props.cartItem ? '1rem' : '0.5rem'};
    }
`

const Chili = styled.img`
    width: 13px;
    height: 13px;
`

export const Desc = styled.div`
    text-align: start;
    color: lightgray;
    margin: 0.5rem;
`

export default function Item(props) {
    return (
        <Container className='Ctn' onClick={props.toggleDrawer} type={props.type}>
            <AddBox style={{ color: 'white', position: 'absolute', bottom: '0', right: '0', margin: '0.5rem', display: props.type === 'lunch' ? 'none' : 'block' }} />
            <ImageContainer className='SubCtn' style={{display: props.img ? 'block' : 'none'}}>
                <Image src={props.img} className='Img' />
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
                        {props.itemKey === "onion" || props.itemKey === "snowy" ? <Desc>PER HALF - ${props.halfprice}</Desc> : props.itemKey === "halfandhalf" ?
                            <Desc>FROM - ${props.fullprice.toFixed(2)}</Desc> :
                            <div>
                                <Desc>HALF - ${props.halfprice.toFixed(2)}</Desc>
                                <Desc>FULL - ${props.fullprice.toFixed(2)}</Desc>
                            </div>
                        }
                    </div> : null}
                {props.type === "sides" ?
                    <div>
                        {props.itemKey === "chips" ? <div>
                            <Desc>MEDIUM - $7.00</Desc>
                            <Desc>LARGE - $9.00</Desc>
                        </div> : props.itemKey === "cheeseballs" ? <Desc>${props.price.toFixed(2)} FOR FOUR PIECES</Desc> : <Desc>${props.price.toFixed(2)} PER SERVING</Desc>}
                    </div> : null}
                {props.type === "drinks" ? 
                    <div>
                        <Desc>${props.price.toFixed(2)} EACH</Desc>
                    </div> : null
                }
            </div>
        </Container>
    )
}
