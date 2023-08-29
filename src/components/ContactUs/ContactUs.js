import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AccessTime, MapRounded, Phone } from '@material-ui/icons';
import Map from './Map'
import '../../App.css'

const Ctn = styled.div`
    display: block;
    //background-color: #DBDBDB;
    background-color: #252425;

    @media(min-width: 700px) {
        display: flex;
    }
`

const InfoCtn = styled.div`
    width: auto;
    margin: auto;
    margin-left: 1rem;
    flex: 4;
    padding-bottom: 1rem;

    @media(min-width: 1200px) {
        padding-bottom: 0;
        flex: 2;
    }

    @media(min-width: 700px) {
        margin-left: 2rem;
    }
`

const MapContainer = styled.a` 
    width: auto;
    height: auto;

    @media(min-width: 700px) {
        height: ${props => props.width / 3.5}px;
        flex: 8;
    }
`

const InfoSection = styled.div`
    display: flex;
    margin: 0.5rem 0;
    align-items: center;
    color: white;

    @media(min-width: 700px) {
        margin: 0.5rem 0;
    }
`

const Info = styled.p`
    margin-left: 1rem;
    font-size: 18px;

    @media(min-width: 1200px) {
        font-size: 24px;
    }
`

const Hours = styled.div`
    display: block;
    text-align: left;
`

const Header = styled.h1`
    font-weight: 300;
    font-size: 30px;
    text-align: left;
    color: white;

    @media(min-width: 700px) {
        font-size: 40px;
    }
`

export default function ContactUsPage() {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
    const [currentHeight, setCurrentHeight] = useState(window.innerHeight)
    const [mState, setMState] = useState(window.innerWidth < 700 ? true : false)

    useEffect(() => {
        function handleResize() {
            setCurrentWidth(window.innerWidth)
            setCurrentHeight(window.innerHeight)
            if(window.innerWidth < 700) {
                setMState(true)
            } else {
                setMState(false)
            }
        }
        window.addEventListener('resize', handleResize)
    } )

    return (
        <>
            {mState ? <Ctn className='Italic'>
                <MapContainer>
                    <Map height={mState ? currentWidth : 800}/>
                </MapContainer>
                <InfoCtn>
                    <Header>CONTACT US</Header>
                    <InfoSection>
                        <Phone />
                        <a href="tel:094761952" style={{color: '#3f51b5', textDecoration: 'underline'}}>
                            <Info>09-476 1952</Info>
                        </a>
                    </InfoSection>
                    <InfoSection>
                        <MapRounded/>
                        <Info>33b Triton Drive, Rosedale</Info>
                    </InfoSection>
                    <InfoSection>
                        <AccessTime />
                        <Hours>
                            <Info>Mon - Thu: 10:30am ~ 8pm</Info>
                            <Info>Fri: 10:30am ~ 8:30pm</Info>
                            <Info>Sat: 11am ~ 8:30pm</Info>
                            <Info>Sun: Closed</Info>
                        </Hours>
                    </InfoSection>
                </InfoCtn>
            </Ctn> :
            <Ctn className='Italic'>
                <InfoCtn>
                    <Header>CONTACT US</Header>
                    <InfoSection>
                        <Phone />
                        <a href="tel:094761952" style={{color: '#3f51b5', textDecoration: 'underline'}}>
                            <Info>09-476 1952</Info>
                        </a>
                    </InfoSection>
                    <InfoSection>
                        <MapRounded/>
                        <Info>33b Triton Drive, Rosedale</Info>
                    </InfoSection>
                    <InfoSection>
                        <AccessTime />
                        <Hours>
                            <Info>Mon - Thu: 10:30am ~ 8pm</Info>
                            <Info>Fri: 10:30am ~ 8:30pm</Info>
                            <Info>Sat: 11am ~ 8:30pm</Info>
                            <Info>Sun: Closed</Info>
                        </Hours>
                    </InfoSection>
                </InfoCtn>
                <MapContainer>
                    <Map height={mState ? currentWidth : (currentHeight - 80)}/>
                </MapContainer>
            </Ctn>
            }
        </>
    )
}
