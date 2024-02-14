import React from 'react'
import styled from 'styled-components'
//import Slider from './Slider'
import chicken from '../../Images/KSChicken_KoreanFC.jpg'
import chips from '../../Images/KSChicken_Chips.jpg'
import cola from '../../Images/cola.jpg'
import lunch from '../../Images/lunchsummary.jpg'
import hero from './KSChicken_Hero.jpg'
import './Home.css'
import '../Alert.css'
import { Report } from '@material-ui/icons'
import lights from './lights.png'
import promotionImg from './promotion.jpg'
import { MobileState } from '../hooks/MobileState'
import hoursMobile from './Images/hours_mobile.jpg'
import hoursDesktop from './Images/hours_desktop.jpg'
import dealMobile from './Images/deal_mobile.png'
import dealDesktop from './Images/deal_desktop.png'

const Body = styled.div`
    width: 100%;
    height: auto;
    background-color: #252425;
    z-index: 10;
    position: relative;
    padding-top: 0;
    //padding-top: 1rem;

    @media(min-width: 1168px) {
        padding-top: 1rem;
    }
`

const Bottom = styled.div`
    height: auto;
    padding-bottom: 1rem;
    margin: auto;
    background-color: #252425;
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

export const HeroTitleCtn = styled.div`
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

export const Title = styled.h1`
    margin: 0;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    color: white;
    font-weight: 300;
    text-align: center;
    font-size: ${props => props.top ? '26px' : '22px'};
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
`

const Description = styled.h2`
    color: white;
    font-weight: 300;
    font-size: 20px;
    text-align: center;
    z-index: 5;

    @media(min-width: 700px) {
        font-size: 28px;
    }
`

const MenuCtn = styled.div`
    /* display: grid;
    grid-template-columns: 1fr 1fr; */
    display: block;
    width: fit-content;
    margin: auto;
    justify-content: center;

    @media(min-width: 700px) {
        display: flex;
        width: auto;
        justify-content: space-around;
    }
`

const Button = styled.div`
    display: flex;
    width: auto;
    height: auto;
    margin: 1rem;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 2rem;
    overflow: hidden;

    @media(min-width: 700px) {
        height: 16rem;
        width: auto;
        border-radius: 2rem;
        margin: 0.5rem;
        flex: 1;
    }
`

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 2rem;
    transition: all 0.5s;
    object-fit: cover;

    @media(min-width: 700px) {
        border-radius: 2rem;
    }
`

const ButtonTxt = styled.a`
    color: white;
    font-size: 30px;
    font-weight: 300;
    position: absolute;
    text-decoration: none;
    width: 100%;
    height: 100%;
    border-radius: 2rem;
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
        font-size: 30px;
    }
`

const Hero = styled.img`
    position: relative;
    height: auto;
    width: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    z-index: 0;
    border-radius: 0;

    @media(min-width: 1168px) {
        border-radius: 2rem;
        height: 100%;
    }
`

const Top = styled.div`
    height: auto;
    position: relative;
    height: auto;
    width: 100%;
    border-radius: 0;

    @media(min-width: 1168px) {
        width: 1168px;
        margin: auto;
        height: 760px;
        border-radius: 2rem;
        box-shadow: 0 0 4px 0 gray;
    }
`

const NoticeCtn = styled.div`
    position: relative;
    width: auto;
    background-color: #cf8334;
    color: white;
    font-weight: 300;
    font-size: 16px;
    padding: 0.5rem 0;
    margin-bottom: 1rem;

    @media(min-width: 700px) {
        font-size: 20px;
        padding: 0.5rem 0;
        margin-top: -1rem;
    }
`

const NoticeTxt = styled.p`
    margin: 0.5rem;
`

const Lights = styled.div`
    background-image: url(${lights});
    background-repeat: repeat-x;
    background-size: cover;
    position: absolute;
    left: 0;
    top: -17px;
    height: 30px;
    width: 100%;
    display: block;
    z-index: 0;

    @media(min-width: 700px) {
        background-size: 35% 30px;
        top: -14px;
    }
    
    @media(min-width: 1920px) {
        background-size: 25% 30px;
    }
`

const BottomCtn = styled.div`
    display: block;

    @media(min-width: 700px) {
        display: grid;
        grid-template-columns: 1fr;
        margin: 0 3rem;
        max-height: 568px;
    }
`

const PromotionCtn = styled.div`
    width: auto;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    border-radius: 2rem;
    align-self: center;

    @media(min-width: 1168px) {
        height: auto;
        width: auto;
    }
`

const PromotionText = styled.p`
    position: absolute;
    top: -30px;
    right: -5px;
    color: white;
    font-size: 35px;
    margin: 0;
    padding-right: 1rem;
    padding-top: 2rem;
    padding-left: 55%;
    transform: rotate(7deg);
    background-image: linear-gradient(180deg, rgb(0,0,0,0.9), rgb(0,0,0,0));

    @media(min-width: 1000px) {
        font-size: 45px;
    }
`

export default function Home() {
    const mState = MobileState()

    return (
        <Body className='Italic'>
            {/* <Slider /> */}
            {/* <h1 style={{color: 'white', fontWeight: '300', fontSize: '42px'}}>KS Chicken</h1> */}
            <Top>
                <Hero src={hero} />
                <HeroTitleCtn top>
                    <Title top>The Best Korean Fried Chicken in Auckland!</Title>
                </HeroTitleCtn>
                {/* <Carousel infiniteLoop={true} autoPlay={true}>
                    <div>
                        <Hero src={mState ? hoursMobile : hoursDesktop} />
                    </div>
                    <div>
                        <Hero src={mState ? dealMobile : dealDesktop} />
                    </div>
                </Carousel> */}
            </Top>
            <Bottom>
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
                        <Image src={chicken} id='Image' />
                        <ButtonTxt href="./menu">CHICKEN</ButtonTxt>
                    </Button>
                    <Button id='Cover'>
                        <Image src={chips} id='Image' />
                        <ButtonTxt href='./menu#sides'>SIDES</ButtonTxt>
                    </Button>
                    {/* <Button id='Cover'>
                        <Image src={cola} id='Image' />
                        <ButtonTxt href="/menu">DRINKS</ButtonTxt>
                    </Button> */}
                    <Button id='Cover'>
                        <Image src={lunch} id='Image' />
                        <ButtonTxt href="/lunch-bar">LUNCH BAR</ButtonTxt>
                    </Button>
                </MenuCtn>
                <TitleCtn>
                    <Title>Where to find us</Title>
                </TitleCtn>
                <DescCtn>
                    <Description className='Normal'>
                        We are located in 33B Triton Drive, Rosedale in Auckland. Click <a href="/contact-us" style={{ color: 'white' }}>here</a> for more details.
                    </Description>
                </DescCtn>
            </Bottom>
        </Body>
    )
}