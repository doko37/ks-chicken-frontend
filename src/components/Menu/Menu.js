import React, {useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import header from '../../Images/chicken.jpg'
import Item from './Item'
import { Chicken, Lunch, Sides } from '../Data'
import './Menu.css'

const Container = styled.div`
    width: auto;
    margin: auto;
    scroll-behavior: smooth;

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const HeaderContainer = styled.div`
    position: relative;
    text-align: center;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    @media(min-width: 700px) {
        height: ${(props => props.currentWidth / 5)}px;
    }
` 

const Header = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
`

const HeaderTitle = styled.div`
    position: absolute;
    font-size: 55px;
    font-weight: bold;
`

export const Body = styled.div`
    background-color: #efefefef;
    position: relative;
`

const NavBarContainer = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 0px 4px 1px gray;
    z-index: 10;
    background-color: white;
`

const NavBar = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    z-index: 10;
    background-color: transparent;
    
    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const NavBarItemContainer = styled.div`
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &#current {
        border-bottom: 2px green solid;
    }
`

const NavBarItem = styled.p`
    text-decoration: none;
    margin: 0 1em;
    color: ${props => !props.active ? 'black' : 'lightgray'};
    cursor: ${props => !props.active ? 'pointer' : 'default'};
    font-size: 15px;

    @media(min-width: 700px) {
        font-size: 20px;
    }
`

const ItemContainer = styled.div`
    background-color: transparent;
    width: 100%;
    height: auto;
    padding-top: 1em;
`

const CategoryContainer = styled.div`
    padding-top: 110px;
    margin-top: -110px;
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

const CategoryTitle = styled.h3`
    font-size: 18px;
    margin: 0 1em 1em 1em;
    border-bottom: 1px black solid;
    text-align: left;
    color: black;
`

export default function Menu(props) {
    const [currentWidth, setCurrentWidth] = useState(window.innerWidth)
    const [itemSelectedState, setItemSelectedState] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)
    const chickenRef = useRef(null)

    useEffect(() => {
        function handleChange() {
            setCurrentWidth(window.innerWidth)
        }
        
        window.addEventListener('resize', handleChange)
    })

    function scrollMenu(category) {
        const el = document.getElementById(category)
        el.scrollIntoView()
    }

    function itemSelected(item) {
        setSelectedItem(item)
        setItemSelectedState(!itemSelectedState)
    }

    function addItem(item) {
        setItemSelectedState(false)
        props.addItem(item)
    }

    return (
            <Body id="body" cartState={props.cartState} itemSelectedState={itemSelectedState}>
                <HeaderContainer currentWidth={currentWidth}>
                    <Header src={header}/>
                    <HeaderTitle className='RaceFont'>-MENU-</HeaderTitle>
                </HeaderContainer>
                <NavBarContainer>
                    <NavBar>
                        <NavBarItemContainer>
                            <NavBarItem onClick={() => scrollMenu('chicken')}>Chicken</NavBarItem>
                        </NavBarItemContainer>
                        <NavBarItemContainer>
                            <NavBarItem onClick={() => scrollMenu('sides')}>Sides</NavBarItem>
                        </NavBarItemContainer>
                        <NavBarItem active>Drinks</NavBarItem>
                        <NavBarItemContainer>
                            <NavBarItem onClick={() => scrollMenu('lunch')}>Lunch</NavBarItem>
                        </NavBarItemContainer>
                    </NavBar>
                </NavBarContainer>
                <Container>
                    <ItemContainer>
                        <CategoryTitle>Chicken</CategoryTitle>
                        <CategoryContainer ref={chickenRef} id="chicken">
                            {Chicken.map(item => {
                                return (
                                    <Item 
                                        img={item.img} 
                                        title={item.title}
                                        halfprice={item.halfprice}
                                        fullprice={item.fullprice}
                                        type="chicken"
                                        key={item.key}
                                        itemSelect={() => itemSelected(item)}
                                    />
                                )
                            })}
                        </CategoryContainer>
                        <CategoryTitle>Sides</CategoryTitle>
                        <CategoryContainer id="sides">
                            {Sides.map(item => {
                                return (
                                    <Item 
                                        img={item.img} 
                                        title={item.title}
                                        price={item.price}
                                        type="sides"
                                        key={item.key}
                                        itemSelect={() => itemSelected(item)}
                                    />
                                )
                            })}
                        </CategoryContainer>
                        <CategoryTitle>Lunch (Meat Options)</CategoryTitle>
                        <CategoryContainer id="lunch">
                            {Lunch.Chicken.map(item => {
                                return (
                                    <Item 
                                        img={item.img} 
                                        title={item.title}
                                        halfprice={item.halfprice}
                                        fullprice={item.fullprice}
                                        type="lunch"
                                        key={item.key}
                                    />
                                )
                            })}
                        </CategoryContainer>
                        <CategoryTitle>Lunch (Salad Options)</CategoryTitle>
                        <CategoryContainer>
                            {Lunch.Salad.map(item => {
                                return (
                                    <Item 
                                        img={item.img} 
                                        title={item.title}
                                        halfprice={item.halfprice}
                                        fullprice={item.fullprice}
                                        type="lunch"
                                        key={item.key}
                                    />
                                )
                            })}
                        </CategoryContainer>
                    </ItemContainer>
                </Container>
                {/* <ItemBox itemSelectedState={itemSelectedState} itemSelected={itemSelected} selectedItem={selectedItem} addItem={item => addItem(item)}/>
                <OrderFooter toggleCart={props.toggleCart} numItems={props.numItems}/> */}
            </Body>
    )
}
