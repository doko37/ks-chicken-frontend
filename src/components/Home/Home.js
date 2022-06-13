import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'
import chicken from '../../Images/chicken.jpg'
import chips from '../../Images/chips.JPG'
import cola from '../../Images/cola.PNG'
import lunch from '../../Images/lunchsummary.jpg'
import Map from '../ContactUs/Map'
import hero from './hero.jpg'
import './Home.css'

const Body = styled.div`
    width: 100%;
    height: auto;
    background-color: #252425;
    z-index: 10;
    position: relative;
    padding-top: 0;

    @media(min-width: 1168px) {
        padding-top: 1rem;
    }
`

const Bottom = styled.div`
    height: auto;
<<<<<<< HEAD
    padding-bottom: 1rem;
    margin: auto;
    background-color: #252425;
=======
    display: block;
    margin: 0 4px;
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    width: auto;
    
    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const TitleCtn = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    position: relative;
`

const HeroTitleCtn = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 5;
    background-image: linear-gradient(180deg, rgb(0,0,0,0.8), rgb(0,0,0,0));
    padding-bottom: 1rem;
    border-radius: 0;
    position: absolute;
    top: 0;

    @media(min-width: 1168px) {
        border-radius: 2rem 2rem 0 0;
    }
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
    transform: rotate(-2deg);

    @media(min-width: 700px) {
        font-size: ${props => props.top ? '40px' : '30px'};
        margin-top: 1rem;
    }
`

const DescCtn = styled.div`
    margin: 0 0.5rem;
    z-index: 5;
    position: relative;
<<<<<<< HEAD
`

const Description = styled.h2`
    color: white;
    font-weight: 300;
    font-size: 20px;
    text-align: center;
    z-index: 5;

    @media(min-width: 700px) {
        font-size: 28px;
=======
    border-radius: 0.5em;
    height: 200px;
    margin-bottom: 0.5rem;

    @media(min-width: 700px) {
        display: grid;
        height: 200px;
        grid-template-columns: 1fr;
        margin: 1em 0;
        box-shadow: 0 0 4px 0 gray;
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    }
`

const MenuCtn = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: fit-content;
    margin: auto;
    justify-content: center;
`

const Button = styled.div`
    display: flex;
    height: 11rem;
    width: 11rem;
    margin: 0.5rem;
    position: relative;
    justify-content: center;
    align-items: center;
<<<<<<< HEAD
    border-radius: 1rem;
    overflow: hidden;

    @media(min-width: 700px) {
        height: 16rem;
        width: 16rem;
        border-radius: 2rem;
=======
    background-color: rgb(0,0,0,0.25);
    width: 100%;
    height: 100%;
    z-index: 10;
    border-radius: 0.5rem;

    @media(min-width: 700px) {
        position: absolute;
        background-color: black;
        opacity: 60%;
        width: 50%;
        left: 25%;
        height: 50%
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    }
`

const Image = styled.img`
    height: 100%;
    width: auto;
    border-radius: 1rem;
    transition: all 0.5s;

<<<<<<< HEAD
    @media(min-width: 700px) {
        border-radius: 2rem;
=======
    &:hover {
        opacity: 80%;
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
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

<<<<<<< HEAD
    &:active {
        background-color: rgba(0,0,0,0.1);
    }

    @media(min-width: 700px) {
        border-radius: 2rem;
        font-size: 30px;
    }
`

const Hero = styled.img`
=======
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
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: 0;

    @media(min-width: 1168px) {
        border-radius: 2rem;
    }
`

const Top = styled.div`
    height: auto;
    position: relative;
    width: 100%;
    border-radius: 0;

    @media(min-width: 1168px) {
        width: 1168px;
        margin: auto;
        height: 613.188px;
        border-radius: 2rem;
        box-shadow: 0 0 4px 0 gray;
    }
`

export default function Home() {
    return (
        <Body className='Italic'>
            {/* <Slider /> */}
            <Top>
                <Hero src={hero}/>
                <HeroTitleCtn top>
                    <Title top>The Best Korean Fried Chicken in Auckland!</Title>
                </HeroTitleCtn>
            </Top>
            <Bottom>
<<<<<<< HEAD
                <DescCtn>
                    <Description className='Normal'>
                        KS Chicken is a family owned Korean Fried Chicken restaurant that opened in 2015. We make delicious and authentic Korean-style Fried Chicken with various different marinations for both lunch and dinner.
                    </Description>
                </DescCtn>
                <TitleCtn>
                    <Title>Our Menu</Title>
                </TitleCtn>
                <MenuCtn>
                    <Button id='Cover'>
                        <Image src={chicken} id='Image'/>
                        <ButtonTxt href="./menu">CHICKEN</ButtonTxt>
                    </Button>
                    <Button id='Cover'>
                        <Image src={chips} id='Image'/>
                        <ButtonTxt href='./menu#sides'>SIDES</ButtonTxt>
                    </Button>
                    <Button id='Cover'>
                        <Image src={cola} id='Image'/>
                        <ButtonTxt href="/menu">DRINKS</ButtonTxt>
                    </Button>
                    <Button id='Cover'>
                        <Image src={lunch} id='Image'/>
                        <ButtonTxt href="/lunch-bar">LUNCH BAR</ButtonTxt>
                    </Button>
                </MenuCtn>
                <TitleCtn>
                    <Title>Where to find us</Title>
                </TitleCtn>
                <DescCtn>
                    <Description className='Normal'>
                        We are located in 33B Triton Drive, Rosedale in Auckland. Click <a href="/contact-us" style={{color: 'white'}}>here</a> for more details.
                    </Description>
                </DescCtn>
=======
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
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
            </Bottom>
        </Body>
    )
}