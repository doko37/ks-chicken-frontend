import React from 'react'
import styled from 'styled-components'
import chili from './chili.png'
import { AddBox } from '@material-ui/icons'
import './Item.css'

const Container = styled.div`
    width: auto;
    height: 120px;
    margin: 0 1rem 2rem 1rem;
    display: flex;
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s;

    &:hover {
        background-color: ${props => props.type === 'lunch' ? 'none' : 'rgba(0,0,0,0.4)'};
    }

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
            <ImageContainer className='SubCtn'>
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
                            <Desc>MEDIUM - $6.00</Desc>
                            <Desc>LARGE - $8.00</Desc>
                        </div> : <Desc>${props.price} PER SERVING</Desc>}
                    </div> : null}
            </div>
        </Container>
    )
}
