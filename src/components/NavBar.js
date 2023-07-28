import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.svg'
import { Menu } from '@material-ui/icons'
import '../App.css'
import { ShoppingCart } from '@material-ui/icons'
import { Badge } from '@material-ui/core'

const Container = styled.div`
    display: block;
    position: relative;
    transition: left 0.25s ease;
    z-index: 0;

    @media (min-width: 700px) {
        left: 0;
    }
`

const Bar = styled.div`
    height: 80px;
    background-color: #201e1f;
    display: flex;
    justify-content: center;

    @media(min-width: 700px) {
        height: 80px;
    }
`

const SubBar = styled.div`
    position: relative;
    background-color: #292829;
    height: ${props => props.dropBarState ? '173px' : '0px'};
    width: auto;
    text-align: left;
    transition: height 0.5s ease;
    display: block;

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
    color: white;
    margin-left: ${props => props.mobile ? '0' : '1rem'};
    width: auto;
    text-decoration: none;
    font-size: 16px;
    display: ${props => props.mState ? '' : 'none'};
    padding: 0.75rem 0 0.75rem 1rem;
    display: block;
    font-weight: 300;
    cursor: pointer;

    &:active {
        background-color: lightgray;
    }

    @media(min-width: 700px) {
        font-size: 25px;
        font-weight: 300;
        width: auto;

        &:active {
            background-color: transparent;
        }
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

    @media(min-width: 700px) {
        flex: none;
    }
`

const OrderButton = styled.div`
    height: 26px;
    width: 50px;
    background-color: #cf8334;
    font-size: 10px;
    border-radius: 1rem;

    @media (min-width: 700px) {
        height: 35px;
        width: 70px;
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
    font-weight: 300;
    font-size: 12.5px;

    @media(min-width: 700px) {
        font-size: 19px;
    }
`

export default function NavBar(props) {
    const [dropBarState, setDropBarState] = useState(false)
    const [mState, setMState] = useState(window.innerWidth < 700 ? true : false)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 700) {
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
        <Container className='Italic'>
            <Bar>
                {mState ? <ContentContainer>
                    <NavContainer>
                        <MenuContainer dropBarState={dropBarState}>
                            <Menu onClick={toggleDropBar} style={{
                                color: 'white',
                                fontSize: '30px'
                            }} />
                        </MenuContainer>
                    </NavContainer>
                    <LogoLink href="/">
                        <Logo src={logo} alt="Logo" />
                    </LogoLink>
                    <OrderButtonContainer>
                        <OrderButton>
                            <OrderLink href="/cart">
                                <Badge badgeContent={props.cartLen} color="primary">
                                    <ShoppingCart style={{
                                        fontSize: '20px'
                                    }} />
                                </Badge>
                            </OrderLink>
                        </OrderButton>
                    </OrderButtonContainer>
                </ContentContainer> :
                    <ContentContainer>
                        <LogoLink href="/">
                            <Logo src={logo} alt="Logo" />
                        </LogoLink>
                        <NavContainer>
                            <NavItems href="/menu" mState={!mState}>MENU</NavItems>
                            <NavItems href="/lunch-bar" mState={!mState}>LUNCH BAR</NavItems>
                            <NavItems href="/contact-us" mState={!mState}>CONTACT US</NavItems>
                        </NavContainer>
                        <OrderButtonContainer>
                            <OrderButton>
                                <OrderLink href="/cart">
                                    <Badge badgeContent={props.cartLen} color="primary">
                                        <ShoppingCart style={{
                                            fontSize: '25px'
                                        }} />
                                    </Badge>
                                </OrderLink>
                            </OrderButton>
                        </OrderButtonContainer>
                    </ContentContainer>}
            </Bar>
            <SubBar dropBarState={dropBarState}>
                <NavItems href="/menu" mState={mState} mobile={true}>MENU</NavItems>
                <NavItems href="/lunch-bar" mState={mState} mobile={true}>LUNCH BAR</NavItems>
                <NavItems href="/cart" mState={mState} mobile={true}>CART</NavItems>
                <NavItems href="/contact-us" mState={mState} mobile={true}>CONTACT US</NavItems>
            </SubBar>
        </Container>
    )
}
