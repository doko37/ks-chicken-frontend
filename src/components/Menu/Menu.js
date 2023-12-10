import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Item from './Item'
import { Chicken, Sides } from '../Data'
import './Menu.css'
import '../../App.css'
import { ReportOutlined as Warning } from '@material-ui/icons'

const Container = styled.div`
    width: auto;
    margin: auto;
    scroll-behavior: smooth;

    @media(min-width: 1200px) {
        width: 1200px;
    }
`

export const Body = styled.div`
    background-color: #252425;
    position: relative;
    padding-bottom: 1rem;
`

const NavBarContainer = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    height: 55px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #201e1f;
    //border-bottom: 1px white solid;
    z-index: 10;
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
        width: 1168px;
    }
`

const NavBarItemContainer = styled.div`
    width: 33%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    //margin-top: ${props => props.active ? '1px' : '0'};
    border-bottom: ${props => props.active ? '2px solid white' : '2px solid #201e1f'};
    cursor: ${props => !props.temp ? 'pointer' : 'default'};

    &#current {
        border-bottom: 2px green solid;
    }
`

const NavBarItem = styled.p`
    text-decoration: none;
    margin: 0 1em;
    color: ${props => !props.temp ? 'white' : 'gray'};
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
    margin-top: -110px;
    padding-top: 110px;
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

export const CategoryTitle = styled.h3`
    font-size: 30px;
    margin: 0;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 300;
    text-align: left;
    color: ${props => props.lunch ? 'black' : 'white'};
`

const Alert = styled.div`
    width: auto;
    background-color: #cf8334;
    color: white;
    padding: 0.5rem;
    font-size: x-large;
`

const AlertWrapper = styled.div`
    margin: 0.25rem;
    border: 4px white dashed;
    position: relative;
    padding: 0.5rem;
    border-radius: 0.5rem;
    width: auto;

    @media(min-width: 1200px) {
        width: 1176px;
        margin: 0.25rem auto;
    }
`

export default function Menu(props) {
    const [inView, setInView] = useState('chicken')
    const chickenRef = useRef(null)
    const sidesRef = useRef(null)
    const ctnRef = useRef(null)

    useEffect(() => {
        function detectYPos() {
            if (chickenRef.current.getBoundingClientRect().top > 0 && chickenRef.current.getBoundingClientRect().top < window.innerHeight / 2 || sidesRef.current.getBoundingClientRect().top > window.innerHeight / 2) {
                setInView('chicken')
            } else if (sidesRef.current.getBoundingClientRect().top > 0 && sidesRef.current.getBoundingClientRect().top < window.innerHeight / 2) {
                setInView('sides')
            }
        }

        window.addEventListener('scroll', detectYPos, false)
    },)

    function scrollMenu(category) {
        const el = document.getElementById(category)
        el.scrollIntoView()
    }

    return (
        <Body id="body" cartState={props.cartState} className='Italic' ref={ctnRef}>
            <NavBarContainer>
                <NavBar>
                    <NavBarItemContainer active={inView === 'chicken' ? true : false} onClick={() => scrollMenu('chicken')}>
                        <NavBarItem>Chicken</NavBarItem>
                    </NavBarItemContainer>
                    <NavBarItemContainer active={inView === 'sides' ? true : false} onClick={() => scrollMenu('sides')}>
                        <NavBarItem>Sides</NavBarItem>
                    </NavBarItemContainer>
                    <NavBarItemContainer active={inView === 'drinks' ? true : false} temp>
                        <NavBarItem temp>Drinks</NavBarItem>
                    </NavBarItemContainer>
                </NavBar>
            </NavBarContainer>
            <Container>
                <ItemContainer>
                    <CategoryTitle ref={chickenRef}>CHICKEN</CategoryTitle>
                    <CategoryContainer id="chicken">
                        {Chicken.map(item => {
                            return (
                                <Item
                                    img={item.img}
                                    title={item.title.toUpperCase()}
                                    halfprice={item.halfprice}
                                    fullprice={item.fullprice}
                                    type="chicken"
                                    itemKey={item.key}
                                    key={item.key}
                                />
                            )
                        })}
                    </CategoryContainer>
                    <CategoryTitle ref={sidesRef}>SIDES</CategoryTitle>
                    <CategoryContainer id="sides">
                        {Sides.map(item => {
                            return (
                                <Item
                                    img={item.img}
                                    title={item.title.toUpperCase()}
                                    price={item.priceLabel}
                                    mediumPrice={item.mediumPrice}
                                    largePrice={item.largePrice}
                                    type="sides"
                                    itemKey={item.key}
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
