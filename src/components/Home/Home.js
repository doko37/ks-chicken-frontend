import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'
import chicken from '../../Images/chicken.jpg'
import chips from '../../Images/chips.JPG'
import cola from '../../Images/cola.PNG'
import lunch from '../../Images/lunchsummary.jpg'
import '../../App.css'

const Body = styled.div`
    width: 100%;
    height: auto;
    background-color: #252425;
    z-index: 10;
    position: relative;
`

const Bottom = styled.div`
    height: auto;
    padding-top: 1rem;
    padding-bottom: 1rem;
    margin: auto;
    background-color: #252425;
    
    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const TitleCtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    margin: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 300;
    text-align: center;
    font-size: ${props => props.top ? '28px' : '22px'};
    border-top: 4px white double;
    border-bottom: 4px white double;
    width: fit-content;
    transform: rotate(-3deg);

    @media(min-width: 700px) {
        font-size: ${props => props.top ? '40px' : '30px'};
        margin-top: 1rem;
    }
`

const DescCtn = styled.div`
    margin: 0 0.5rem;
`

const Description = styled.h2`
    color: white;
    font-weight: 300;
    font-size: 20px;
    text-align: center;

    @media(min-width: 700px) {
        font-size: 28px;
    }
`

const MenuCtn = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: fit-content;
    margin: auto;
    justify-content: center;

    @media(min-width: 700px) {
        margin: 0 20.5rem;
    }
`

const Button = styled.div`
    display: flex;
    height: 11rem;
    width: 11rem;
    margin: 0.5rem;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    overflow: hidden;

    @media(min-width: 700px) {
        height: 16rem;
        width: 16rem;
        border-radius: 2rem;
    }
`

const Image = styled.img`
    height: 100%;
    width: auto;
    border-radius: 1rem;
    transition: all 0.5s;

    @media(min-width: 700px) {
        border-radius: 2rem;
    }

    &:hover {
        transform: scale(1.1);
    }
`

const ButtonTxt = styled.a`
    color: white;
    font-size: 24px;
    font-weight: 300;
    position: absolute;
    text-decoration: none;
    width: 100%;
    height: 100%;
    border-radius: 1rem;
    background-color: rgba(0,0,0,0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: auto;

    &:active {
        background-color: rgba(0,0,0,0.1);
    }

    @media(min-width: 700px) {
        border-radius: 2rem;
    }
`

export default function Home() {
    return (
        <Body className='Italic'>
            <Slider />
            <Bottom>
                <TitleCtn>
                    <Title top>The Best Korean Fried Chicken in Auckland!</Title>
                </TitleCtn>
                <DescCtn>
                    <Description className='Normal'>
                        KS Chicken is a family owned Korean Fried Chicken restaurant that opened in 2015. We make delicious and authentic Korean-style Fried Chicken with various different marinations for both lunch and dinner.
                    </Description>
                </DescCtn>
                <TitleCtn>
                    <Title>Our Menu</Title>
                </TitleCtn>
                <MenuCtn>
                    <Button>
                        <Image src={chicken}/>
                        <ButtonTxt href="./menu">CHICKEN</ButtonTxt>
                    </Button>
                    <Button>
                        <Image src={chips}/>
                        <ButtonTxt href='./menu#sides'>SIDES</ButtonTxt>
                    </Button>
                    <Button>
                        <Image src={cola}/>
                        <ButtonTxt href="/menu">DRINKS</ButtonTxt>
                    </Button>
                    <Button>
                        <Image src={lunch}/>
                        <ButtonTxt href="/lunch-bar">LUNCH BAR</ButtonTxt>
                    </Button>
                </MenuCtn>
            </Bottom>
        </Body>
    )
}