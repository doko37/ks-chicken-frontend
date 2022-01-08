import original from '../../Images/original.jpg'
import chips from '../../Images/chips.JPG'
import lunch from '../../Images/lunchsummary.jpg'
import cola from '../../Images/cola.PNG'
import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'
import { Body } from '../OrderPage/Menu/Menu'

export const Header = styled.h2`
    color: black;
    text-align: start;
    border-bottom: 1px black solid;
    font-weight: 300;
    margin: 0.5em;

    @media(min-width: 700px) {
        margin: 0.5em 1em
    }
`

const MenuContainer = styled.div`
    align-items: center;
    height: auto;
    display: block;
    margin: 0 4px;
    
    @media(min-width: 700px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        margin: 0 1em;
        margin-bottom: 2em;
    }
`


const MenuButton = styled.a`
    width: auto;
    height: auto;
    text-decoration: none;
`

const MenuCategory = styled.div`
    margin: 0.5rem;
    width: auto;
    height: 150px;
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;
    box-shadow: 0 0 4px 0 gray;
    background-color: white;

    @media(min-width: 700px) {
        height: 200px;
    }
    
    @media(min-width: 1200px) {
        height: 250px;
    }

    &:hover {
        background-color: transparent;
    }
`

const MenuImg = styled.img`
    height: 100%;
    object-fit: cover;
`

const MenuTitle = styled.h2`
    margin: 0.5em;
    font-weight: 300;
    margin: auto;
    color: ${props => !props.active ? 'black' : 'lightgray'}
`

const Bottom = styled.div`
    width: auto;
    margin: auto;

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

export default function Home() {
    return (
        <Body>
            <Slider />
            <Bottom>
                <Header>Our Menu</Header>
                <MenuContainer>
                    <MenuButton href='/menu'>
                        <MenuCategory>
                            <MenuImg src={original}/>
                            <MenuTitle>Chicken</MenuTitle>
                        </MenuCategory>
                    </MenuButton>
                    <MenuButton href='/menu#lunch'>
                        <MenuCategory>
                            <MenuImg src={lunch}/>
                            <MenuTitle>Lunch</MenuTitle>
                        </MenuCategory>
                    </MenuButton>
                    <MenuButton href='/menu#sides'>
                        <MenuCategory>
                            <MenuImg src={chips}/>
                            <MenuTitle>Sides</MenuTitle>
                        </MenuCategory>
                    </MenuButton>
                    <MenuCategory>
                        <MenuImg src={cola}/>
                        <MenuTitle active>Drinks</MenuTitle>
                    </MenuCategory>
                </MenuContainer>
            </Bottom>
        </Body>
    )
}
