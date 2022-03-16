import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.svg'
import { Menu } from '@material-ui/icons'
import OrderFooter from './OrderPage/OrderFooter'

const Container = styled.div`
    display: block;
    position: relative;
    left: ${props => props.cartState ? `-${window.innerWidth}px` : '0px'};
    transition: left 0.25s ease;
    z-index: 0;

    @media (min-width: 700px) {
        left: 0;
    }
`

const Bar = styled.div`
    height: 80px;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;

    @media(min-width: 700px) {
        height: 80px;
    }
`

const SubBar = styled.div`
    position: relative;
    background-color: #efefefef;
    height: ${props => props.dropBarState ? '130px' : '0px'};
    width: auto;
    text-align: left;
    padding-left: 1em;
    transition: height 0.5s ease;
    z-index: 0;

    @media(min-width: 700px) {
        display: none;
    }
`

const ContentContainer = styled.div`
    height: 100%;
    display: flex;
    background-color: transparent;
    justify-content: space-between;
    align-items: center;
    width: 100%;

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const Filler = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 1em;
    flex: 1;
    position: relative;
`

const NavContainer = styled.div`
    display: block;
    height: 100%;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: left;
    margin-left: 1em;
    flex: 1;

    @media(min-width: 700px) {
        margin-left: 2em;
    }
`

const NavItems = styled.a`
    color: ${props => props.mobile ? 'black' : 'white'};
    cursor: pointer;
    margin-left: ${props => props.mobile ? '0' : '1em'};
    text-decoration: none;
    font-size: 15px;
    display: ${props => props.mState ? '' : 'none'};

    @media(min-width: 700px) {
        font-size: 20px;
    }
` 

const Logo = styled.img`
    height: 60%;
    margin-left: 0;
    cursor: pointer;

    @media(min-width: 700px) {
        height: 80%;
        margin-left: 1em;
    }
`

const LogoLink = styled.a`
    width: 170px;

    @media(min-width: 700px) {
        width: 200px;
    }
`

const MItem = styled.p`
    margin: 0;
    padding-top: 16px;
    display: ${props => props.dropBarState ? '' : 'none'};
`

const MenuContainer = styled.div`
    transform: ${props => props.dropBarState ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.5s ease;
    height: 30px;
    width: 30px;
`

const OrderButtonContainer = styled.div`
    flex: 1;
    margin-right: 1em;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
`

const OrderButton = styled.div`
    height: 30px;
    width: 60px;
    background-color: #cf8334;
    font-size: 10px;
    border-radius: 1rem;

    @media (min-width: 700px) {
        height: 40px;
        width: 90px;
        font-size: 15px;
        border-radius: 2rem;
        transition: background-color 0.5s ease;
    }

    &:hover {
        background-color: #ffa241;
    }
`

const OrderLink = styled.a`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    height: 100%;
    width: 100%;
    color: white;
`

export default function NavBar(props) {
    const [dropBarState, setDropBarState] = useState(false)
    const [mState, setMState] = useState(window.innerWidth < 700 ? true : false)

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 700) {
                setMState(true)
            } else {
                setMState(false)
            } 
        }

        window.addEventListener('resize', handleResize)
    })

    function toggleDropBar() {
        setDropBarState(!dropBarState)
    }

    return (
        <Container cartState={props.cartState}>
            <Bar>
                {mState ? <ContentContainer>
                    <NavContainer>
                        <MenuContainer dropBarState={dropBarState}>
                            <Menu onClick={toggleDropBar} style={{
                                color: 'white',
                                fontSize: '30px'
                            }}/>
                        </MenuContainer>
                    </NavContainer>
                    <LogoLink href="/">
                        <Logo src={logo} alt="Logo"/>
                    </LogoLink>
                    <OrderButtonContainer>
                        <OrderButton>
                            <OrderLink href="/order">Order Now</OrderLink>
                        </OrderButton>
                    </OrderButtonContainer>
                </ContentContainer> : 
                <ContentContainer>
                    <LogoLink href="/">
                        <Logo src={logo} alt="Logo"/>
                    </LogoLink>
                    <NavContainer>
                        <NavItems href="/menu" mState={!mState}>MENU</NavItems>
                        <NavItems href="/contact-us" mState={!mState}>CONTACT US</NavItems>
                    </NavContainer>
                    <OrderButtonContainer>
                        <OrderButton>
                            <OrderLink href="/order">Order Now</OrderLink>
                        </OrderButton>
                    </OrderButtonContainer>
                </ContentContainer>}
            </Bar>
            <SubBar dropBarState={dropBarState}>
                <MItem dropBarState={dropBarState}>
                    <NavItems href="/menu" mState={mState} mobile={true}>Menu</NavItems>
                </MItem>
                <MItem dropBarState={dropBarState}>
                    <NavItems href="/order" mState={mState} mobile={true}>Order</NavItems>
                </MItem>
                <MItem dropBarState={dropBarState}>
                    <NavItems href="/contact-us" mState={mState} mobile={true}>Contact Us</NavItems>
                </MItem>
            </SubBar>
        </Container>
    )
}
