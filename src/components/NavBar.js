import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.svg'
import { Menu } from '@material-ui/icons'
import { ShoppingBasketOutlined as Basket } from '@material-ui/icons'
import { Badge } from '@material-ui/core'

const Container = styled.div`
    display: block;
    z-index: 0;
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
    height: ${props => props.dropBarState ? '92px' : '0px'};
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

const BasketContainer = styled.div`
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

const OrderLabel = styled.p`
    position: absolute;
    color: white;
    background-color: #cf8334;
    border-radius: 0.25rem;
    height: 60px;
    width: 60px;
    font-size: 10px;
    right: 0.5px;
    top: 0px;
`

const MenuContainer = styled.div`
    transform: ${props => props.dropBarState ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: transform 0.5s ease;
    height: 30px;
    width: 30px;
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
        <Container>
            <Bar>
                {mState ? <ContentContainer>
                    <NavContainer>
                        <MenuContainer dropBarState={dropBarState}>
                            <Menu onClick={toggleDropBar} style={{
                                color: 'white',
                                fontSize: '30px',
                            }}/>
                        </MenuContainer>
                    </NavContainer>
                    <LogoLink href="/">
                        <Logo src={logo} alt="Logo"/>
                    </LogoLink>
                    <BasketContainer>
                        <OrderLabel>Online ordering coming soon</OrderLabel>
                    </BasketContainer>
                </ContentContainer> : 
                <ContentContainer>
                    <LogoLink href="/">
                        <Logo src={logo} alt="Logo"/>
                    </LogoLink>
                    <NavContainer>
                        <NavItems href="/menu" mState={!mState}>MENU</NavItems>
                        <NavItems href="/contact-us" mState={!mState}>CONTACT US</NavItems>
                    </NavContainer>
                    <BasketContainer>
                        <OrderLabel>Online ordering coming soon</OrderLabel>
                    </BasketContainer>
                </ContentContainer>}
            </Bar>
            <SubBar dropBarState={dropBarState}>
                <MItem dropBarState={dropBarState}>
                    <NavItems href="/menu" mState={mState} mobile={true}>MENU</NavItems>
                </MItem>
                <MItem dropBarState={dropBarState}>
                    <NavItems href="/contact-us" mState={mState} mobile={true}>CONTACT US</NavItems>
                </MItem>
            </SubBar>
        </Container>
    )
}
