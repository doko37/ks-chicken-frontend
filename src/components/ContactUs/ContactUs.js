import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AccessTime, MapRounded, Phone } from '@material-ui/icons';
import { Header } from '../Home/Home';
import Map from './Map'

const Container = styled.div`
    width: 100%;

    @media(min-width: 1200px) {
        width: 1200px;
        margin: auto;
    }
`

const MapContainer = styled.a` 
    width: 100%;
    height: auto;

    @media(min-width: 700px) {
        height: ${props => props.width / 3.5}px;
    }
`

const InfoContainer = styled.div`
    display: flex;
    margin: 0.5em 1em;
    align-items: center;

    @media(min-width: 700px) {
        margin: 0.5em 24px;
    }
`

const Info = styled.p`
    margin-left: 1em;
`

const Hours = styled.div`
    display: block;
    text-align: left;
`

export default function ContactUsPage() {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
    const [mState, setMState] = useState(window.innerWidth < 700 ? true : false)

    useEffect(() => {
        function handleResize() {
            setCurrentWidth(window.innerWidth)
            if(window.innerWidth < 700) {
                setMState(true)
            } else {
                setMState(false)
            }
        }
        window.addEventListener('resize', handleResize)
    } )

    return (
        <div>
            <MapContainer>
                <Map height={mState ? currentWidth : 700}/>
            </MapContainer>
            <Container>
                <Header>Store Information</Header>
                <InfoContainer>
                    <Phone />
                    <a href="tel:094761952" style={{color: '#3f51b5', textDecoration: 'none'}}>
                        <Info>09-476 1952</Info>
                    </a>
                </InfoContainer>
                <InfoContainer>
                    <MapRounded/>
                    <Info>33b Triton Drive, Rosedale</Info>
                </InfoContainer>
                <InfoContainer>
                    <AccessTime />
                    <Hours>
                        <Info>Mon - Thu: 11am ~ 8pm</Info>
                        <Info>Fri - Sat: 11am ~ 9pm</Info>
                        <Info>Sun: Closed</Info>
                    </Hours>
                </InfoContainer>
            </Container>
        </div>
    )
}
