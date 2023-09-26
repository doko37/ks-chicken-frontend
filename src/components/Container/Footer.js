import React from 'react'
import styled from 'styled-components'
import '../../App.css'
import logo from './headerlogo.png'
import logo_full from '../../Images/logo_footer.svg'
import { Instagram, Facebook } from '@material-ui/icons'
import { MobileState } from '../hooks/MobileState'

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
  background-image: url(${props => props.img});
  background-size: 90%; 
  background-position: center;
  background-repeat: no-repeat;

  @media(min-width: 700px) {
    background-size: auto 50%; 
    background-position: center;
    background-repeat: repeat-x;
  }
`

const Ctn = styled.div`
  width: 100%;
  height: 100%;
  margin: auto;
  padding-top: 1rem;
  display: flex;
  align-items: center;
  position: relative;

  @media(min-width: 1200px) {
    width: 1200px;
  }
`

const Right = styled.div`
  text-align: center;
  display: block;
  flex: 3;
  margin-left: 1rem;

  @media(min-width: 700px) {
    display: flex;
  }
`

const Left = styled.div`
  text-align: center;
  flex: 2;
  margin-left: 1rem;

  @media(min-width: 700px) {
    flex: 1;
  }
`

const Text = styled.p`
  margin: 0;
  margin-bottom: 1rem;
  color: white;
  font-size: ${props => props.copyright ? '12px' : '16px'};
  width: fit-content;

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
  height: 80%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  opacity: 10%;
  z-index: -1;
  display: ${props => props.first ? '' : 'none'};

  @media(min-width: 700px) {
    height: 80%;
  }

  /* @media(min-width: 700px) {
    display: block;
    width: ${props => props.first ? '25%' : props.second ? '10%' : props.third ? '15%' : props.fourth ? '15%' : '10%'};
    left: ${props => props.first ? '40%' : props.second ? '10%' : props.third ? '80%' : props.fourth ? '20%' : '65%'};
    margin: 0;
    margin-top: ${props => props.fourth ? '9rem' : props.fifth ? '-4rem' : '0'};
    transform: rotate(10deg);
  } */
`

const TextCtn = styled.div`
  margin: 2rem 0;

  @media(min-width: 700px) {
    margin: 0;
    margin-left: 6rem;
  }
`

export default function Footer(props) {
  const mState = MobileState()

  return (
    <Body className='Normal' img={logo_full}>
      <Ctn>
        {/* <Left>
          <Text><Link href="/">Home</Link> | <Link href="/menu">Menu</Link> | <Link href="/lunch-bar">Lunch Bar</Link> | <Link href="/contact-us">Contact Us</Link></Text>
        </Left> */}
        <Right>
          <div>
            <Text><Link href="/">Home</Link> | <Link href="/menu">Menu</Link> | <Link href="/lunch-bar">Lunch Bar</Link> | <Link href="/contact-us">Contact Us</Link></Text>
            <div style={{display: 'flex', width: 'fit-content', alignItems: 'center', textAlign: 'right', marginBottom: '1rem', justifySelf: 'right'}}>
              <a href="https://www.instagram.com/ks_chicken/" target="_blank" style={{height: '27px', color: 'white'}}><Instagram style={{fontSize: '32px', marginRight: '0.5rem'}}/></a>
              <a href="https://www.facebook.com/p/KS-Chicken-100090818742236/" target="_blank" style={{height: '27px', color: 'white'}}> <Facebook style={{fontSize: '32px'}}/></a>
            </div>
          </div>
          <TextCtn>
            <Text style={{margin: '0'}}>(09) 476-1952</Text>
            <Text>33B Triton Drive, Rosedale, Auckland</Text>
            <Text copyright>© 2023 KS Chicken. All Rights Reserved.</Text>
          </TextCtn>
        </Right>
        {/* <Logo src={mState ? logo : logo_full} first /> */}
      </Ctn>
      <Logo src={logo} second />
      <Logo src={logo} third />
      <Logo src={logo} fourth />
      <Logo src={logo} fifth />
    </Body>
  )
}
