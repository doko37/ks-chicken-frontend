import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import mMap from '../../Images/mMap.png'
import map from '../../Images/map.png'
import { AccessTime, MapRounded, Phone } from '@material-ui/icons';
import { Header } from '../Home/Home';

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

const Map = styled.img`
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
            <MapContainer 
                href="https://www.google.com/maps/place/KS+Chicken/@-36.7426125,174.7223319,16.25z/data=!4m5!3m4!1s0x6d0d3bd1a21da6df:0xa6ea9a0a91afe5ae!8m2!3d-36.7430825!4d174.7251296"
                width={currentWidth}
            >
                {mState ? <Map src={mMap} width={currentWidth}/> : <Map src={map} width={currentWidth}/>}
            </MapContainer>
            <Container>
                <Header>Store Information</Header>
                <InfoContainer>
                    <Phone />
                    <Info>09-476 1952</Info>
                </InfoContainer>
                <InfoContainer>
                    <MapRounded/>
                    <Info>33b Triton Drive, Rosedale</Info>
                </InfoContainer>
                <InfoContainer>
                    <AccessTime />
                    <Hours>
                        <Info>Mon - Thu: 11am - 8pm</Info>
                        <Info>Fri: 11am - 9pm</Info>
                        <Info>Sat: 12am - 9pm</Info>
                        <Info>Sun: Closed</Info>
                    </Hours>
                </InfoContainer>
            </Container>
        </div>
    )
}
