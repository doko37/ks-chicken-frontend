import React from 'react'
import styled from 'styled-components'
import '../../App.css'
import logo from './headerlogo.png'

const Body = styled.div`
  width: 100%;
  height: 250px;
  background-color: #1c1c1c;
  color: white;
  transition: left 0.25s ease;
  z-index: 10;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Ctn = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 1rem;
  display: flex;
  align-items: center;


  @media(min-width: 1200px) {
    width: 1200px;
  }
`

const Right = styled.div`
  text-align: right;
  flex: 1;
  margin-right: 1rem;
`

const Left = styled.div`
  text-align: left;
  flex: 2;
  margin-left: 1rem;

  @media(min-width: 700px) {
    flex: 1;
  }
`

const Text = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  font-size: ${props => props.copyright ? '12px' : '16px'};

  @media(min-width: 700px) {
    font-size: ${props => props.copyright ? '16px' : '20px'};
  }
`

const Link = styled.a`
  margin: 0;
  font-size: 16px;
  color: white;
  text-decoration: none;

  @media(min-width: 700px) {
    font-size: 20px;
  }

  &:hover {
    text-decoration: underline;
  }
`

const Logo = styled.img`
  position: absolute;
  width: 70%;
  left: 15%;
  top: 0;
  opacity: 5%;
  z-index: -1;
  margin-top: 0.5rem;
  display: ${props => props.first ? '' : 'none'};

  @media(min-width: 700px) {
    display: block;
    width: ${props => props.first ? '25%' : props.second ? '10%' : props.third ? '15%' : props.fourth ? '15%' : '10%'};
    left: ${props => props.first ? '40%' : props.second ? '10%' : props.third ? '80%' : props.fourth ? '20%' : '65%'};
    margin: 0;
    margin-top: ${props => props.fourth ? '9rem' : props.fifth ? '-4rem' : '0'};
    transform: rotate(10deg);
  }
`

export default function Footer(props) {
  return (
    <Body className='Normal'>
      <Ctn>
        <Left>
          <Text><Link href="/">Home</Link> | <Link href="/menu">Menu</Link> | <Link href="/lunch-bar">Lunch Bar</Link> | <Link href="/contact-us">Contact Us</Link></Text>
          <Text copyright>© 2022 KS Chicken. All Rights Reserved.</Text>
        </Left>
        <Right>
          <Text>(09) 476-1952</Text>
          <Text>33B Triton Drive, Rosedale, Auckland</Text>
        </Right>
      </Ctn>
      <Logo src={logo} first />
      <Logo src={logo} second />
      <Logo src={logo} third />
      <Logo src={logo} fourth />
      <Logo src={logo} fifth />
    </Body>
  )
}
