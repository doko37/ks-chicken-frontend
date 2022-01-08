import React from 'react'
import styled from 'styled-components'
import logo from '../Images/logo.svg'

const Bar = styled.div`
    height: 70px;
    background-color: #1e1e1e;
    display: flex;
    justify-content: center;
`

const Container = styled.div`
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

const Right = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    margin-right: 1em;
`

const NavItems = styled.a`
    color: white;
    cursor: pointer;
    margin-left: 1em;
    text-decoration: none;
`

const Logo = styled.img`
    height: 60%;
    margin-left: 1em;
    cursor: pointer;

    @media(min-width: 700px) {
        height: 70%;
    }
`

export default function NavBar() {
    return (
        <Bar>
            <Container>
                <a href="/" style={{
                    width: '150px'
                }}>
                    <Logo src={logo} alt="Logo"/>
                </a>
                <Right>
                    <NavItems href="/menu">MENU</NavItems>
                    <NavItems href="/contact-us">CONTACT US</NavItems>
                </Right>
            </Container>
        </Bar>
    )
}
