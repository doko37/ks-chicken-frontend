import React from 'react'
import styled from 'styled-components'
import { Phone, AccessTime as Time } from '@material-ui/icons'
import { MobileState }  from '../hooks/MobileState'

const InfoContainer = styled.div`
    flex: 1;
    width: auto;
    margin-left: 1em;
    text-align: left;
    margin-top: 1em;

    @media(min-width: 700px) {
        margin-top: 50px;
        width: auto;
        margin-right: 1em;
        text-align: right;
    }
`

const Icon = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: ${props => props.border ? "6px solid black" : "none"};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
    margin-right: 1em;

    @media(min-width: 700px) {
        margin-left: 1em;
        margin-right: 0;
    }
`

const SubInfoContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    text-align: left;

    @media(min-width: 700px) {
        justify-content: end;
        text-align: right;
    }
`

export default function Info() {
    const mState = MobileState()

    return (
        <InfoContainer>
            {mState ? <SubInfoContainer>
                <Icon border>
                    <Phone fontSize='large'/>
                </Icon>
                <div>
                    <h3 style={{
                        marginBottom: '0px'
                    }}>ORDER NOW:</h3>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <p style={{
                            marginRight: '0.5em'
                        }}>Call us:</p>
                        <a href="tel:097461952" style={{color: '#3f51b5', textDecoration: 'none'}}>09-476 1952</a>
                    </div>
                </div>
            </SubInfoContainer> 
            : 
            <SubInfoContainer>
                <div>
                    <h3 style={{
                        marginBottom: '0px'
                    }}>ORDER NOW:</h3>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <p style={{
                            marginRight: '0.5em'
                        }}>Call us:</p>
                        <a href="tel:097461952" style={{color: '#3f51b5', textDecoration: 'none'}}>09-476 1952</a>
                    </div>
                </div>
                <Icon border>
                    <Phone fontSize='large'/>
                </Icon>
            </SubInfoContainer>}
            {mState ? <SubInfoContainer>
                <Icon border>
                    <Time style={{
                        width: '74px',
                        height: '74px'
                    }}/>
                </Icon>
                <div>
                    <h3>OUR HOURS:</h3>
                    <p>Mon-Thu: 11am ~ 8:30pm</p>
                    <p>Fri: 11am ~ 9pm</p>
                    <p>Sat: 12am ~ 9pm</p>
                    <p>Sun: Closed</p>
                </div>
            </SubInfoContainer> :
            <SubInfoContainer>
                <div>
                    <h3>OUR HOURS:</h3>
                    <p>Mon-Thu: 11am ~ 8:30pm</p>
                    <p>Fri: 11am ~ 9pm</p>
                    <p>Sat: 12am ~ 9pm</p>
                    <p>Sun: Closed</p>
                </div>
                <Icon border>
                    <Time style={{
                        width: '74px',
                        height: '74px'
                    }}/>
                </Icon>
        </SubInfoContainer>}
        </InfoContainer>
    )
}
