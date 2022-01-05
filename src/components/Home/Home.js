import original from '../../Images/original.jpg'
import chips from '../../Images/chips.JPG'
import lunch from '../../Images/lunchsummary.jpg'
import cola from '../../Images/cola.jpg'
import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'

const MenuHeader = styled.h2`
    color: black;
    text-align: start;
    border-bottom: 1px black solid;
    font-weight: 300;
    margin: 8px;

    @media(min-width: 700px) {
        margin: 1em 8px
    }
`

const MenuContainer = styled.div`
    align-items: center;
    height: auto;
    display: block;
    
    @media(min-width: 700px) {
        display: block;
        margin-bottom: 2em;
    }
`

const MenuCategory = styled.div`
    margin: 0.5rem;
    width: auto;
    height: 150px;
    display: flex;
    background-color: black;
    align-items: center;
    cursor: pointer;
    background-image: url(${props => props.img});
    object-fit: cover;

    @media(min-width: 700px) {
        height: 200px;
    }
    
    @media(min-width: 1200px) {
        height: 400px;
    }


    &:hover {
        background-color: #e2e2e2;
    }
`

const MenuImg = styled.img`
    height: 100%;
`

const MenuTitle = styled.h2`
    margin: 0.5em;
    font-weight: 300;
    margin: auto;
    color: gray;
`

const Bottom = styled.div`
    width: auto;
    margin: auto;

    @media(min-width: 700px) {
        width: 700px;
    }

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

export default function Home() {
    return (
        <div>
            <Slider />
            <Bottom>
                <MenuHeader>Our Menu</MenuHeader>
                <MenuContainer>
                    <MenuCategory img={original}/>
                </MenuContainer>
            </Bottom>
        </div>
    )
}
