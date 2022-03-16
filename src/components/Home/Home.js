import chicken from '../../Images/chicken.jpg'
import chips from '../../Images/chips.JPG'
import lunch from '../../Images/lunchsummary.jpg'
import cola from '../../Images/cola.PNG'
import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'
import Info from './Info'

export const Header = styled.h2`
    color: black;
    text-align: start;
    border-bottom: 3px dotted black;
    font-weight: 600;
    margin: 0.5em;

    @media(min-width: 700px) {
        margin: 0.5em 1em;
    }
`

const MenuContainer = styled.div`
    align-items: center;
    height: auto;
    display: grid;
    grid-template-columns: 1fr;
    margin: 0 4px;
    width: auto;
    
    @media(min-width: 700px) {
        display: block;
        margin: 0 24px;
        margin-bottom: 2em;
    }
`

const Bottom = styled.div`
    width: auto;
    margin: auto;
    padding-bottom: 0.5em;
    display: block;

    @media(min-width: 700px) {
        display: flex;
    }

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const Body = styled.div`
    width: 100%;
    height: auto;
    background-color: #efefefef;
    z-index: 10;
    position: relative;
`

const ButtonContainer = styled.div`
    width: auto;
    margin: 0 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 0.5em;
    height: 200px;
    margin-bottom: 0.5rem;

    // @media(max-width: 699px) {
    //     &:nth-child(odd) {
    //         margin-right: -0.05px;
    //     }
    
    //     &:nth-child(even) {
    //         margin-left: -0.05px;
    //     }
    // }

    @media(min-width: 700px) {
        display: grid;
        height: 200px;
        grid-template-columns: 1fr;
        margin: 1em 0;
        box-shadow: 0 0 4px 0 gray;
    }
`

const LinkContainer = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0,0,0,0.25);
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 0.5em;

    @media(min-width: 700px) {
        position: absolute;
        background-color: black;
        opacity: 60%;
        width: 50%;
        left: 25%;
        height: 50%;
    }

    &:hover {
        opacity: 80%;
    }
`

const Button = styled.a`
    color: white;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    z-index: 5;
    text-decoration: none;

    @media(min-width: 700px) {
        color: white;
    }
`

const ImgConatiner = styled.div`
    height: 200px;
    width: auto;
    overflow: hidden;
    border-radius: 0.5rem;

    @media(min-width: 700px) {
        height: 200px;
        margin-bottom: 0px;
    }
`

const ButtonImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 0;
    transition: all .5s;

    &:hover {
        transform: scale(1.1);
    }
`

const Left = styled.div`
    flex: 2;
`

export default function Home() {
    return (
        <Body>
            <Slider />
            <Bottom>
                <Left>
                <Header>Our Menu</Header>
                <MenuContainer className='RaceFont'>
                    <ButtonContainer>
                        <LinkContainer>
                            <Button href="/menu">CHICKEN</Button>
                        </LinkContainer>
                        <a href="/menu" style={{
                            width: '100%'
                        }}> 
                            <ImgConatiner>
                                <ButtonImg src={chicken}/>
                            </ImgConatiner>
                        </a>
                    </ButtonContainer>
                    <ButtonContainer>
                        <LinkContainer>
                            <Button href="/menu#sides">SIDES</Button>
                        </LinkContainer>
                        <a href="/menu#sides" style={{
                            width: '100%'
                        }}>
                            <ImgConatiner>
                                <ButtonImg src={chips}/>
                            </ImgConatiner>
                        </a>
                    </ButtonContainer>
                    <ButtonContainer>
                        <LinkContainer>
                            <Button href="/menu#lunch">LUNCH</Button>
                        </LinkContainer>
                        <a href="/menu#lunch" style={{
                            width: '100%'
                        }}>
                            <ImgConatiner>
                                <ButtonImg src={lunch}/>
                            </ImgConatiner>
                        </a>
                    </ButtonContainer>
                    <ButtonContainer>
                        <LinkContainer>
                            <Button href="/menu">DRINKS</Button>
                        </LinkContainer>
                        <a href="/menu" style={{
                            width: '100%'
                        }}>
                            <ImgConatiner>
                                <ButtonImg src={cola}/>
                            </ImgConatiner> 
                        </a>
                    </ButtonContainer>
                </MenuContainer>
                </Left>
                <Info />
            </Bottom>
        </Body>
    )
}