import React from 'react'
import styled from 'styled-components'
import Item from '../Menu/Item/Item'
import { Lunch } from './LunchItems'
import { CategoryTitle } from '../Menu/Menu'
import '../../App.css'
import { MobileState } from '../hooks/MobileState'
import { HeroTitleCtn, Title } from '../Home/Home'

const Body = styled.div`
    position: relative;
    background-color: #FFFCF1;
    padding-bottom: 1rem;
`

const Container = styled.div`
    padding-top: 1rem;
    margin: auto;
    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const ItemContainer = styled.div`
    display: block;
    
    @media(min-width: 700px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    @media(min-width: 1200px) {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
`

const InfoHeader = styled.div`
    height: ${props => props.mState ? window.innerWidth * 0.73 : '650'}px;
    width: 100%;
    overflow-y: hidden;
    position: relative;
`

const LunchPicture = styled.img`
    width: 100%;
    object-fit: cover;
`

export default function LunchBar() {
    const mState = MobileState()

    return (
        <Body className='Italic'>
            <InfoHeader mState={mState}>
                <LunchPicture src="https://i.ibb.co/cJqNqsD/DSC-6926.jpg" mState={MobileState(true)}/>
                <HeroTitleCtn style={{borderRadius: '0'}}>
                    <Title top style={{marginTop: '1rem'}}>Available Weekdays from 10:30AM ~ 2:00PM!</Title>
                </HeroTitleCtn>
            </InfoHeader>
            <Container>
            <CategoryTitle style={{color: 'black'}}>Meat Options</CategoryTitle>
            <ItemContainer>
                {Lunch.Chicken.map(item => {
                    return(
                        <Item 
                            img={item.img} 
                            title={item.title.toUpperCase()}
                            type="lunch"
                            key={item.key}
                        />
                    )
                })}
            </ItemContainer>
            <CategoryTitle style={{color: 'black'}}>Salad Options</CategoryTitle>
            <ItemContainer>
                {Lunch.Salad.map(item => {
                    return(
                        <Item 
                            img={item.img} 
                            title={item.title.toUpperCase()}
                            type="lunch"
                            key={item.key}
                        />
                    )
                })}
            </ItemContainer>
        </Container>
        </Body>
    )
}
