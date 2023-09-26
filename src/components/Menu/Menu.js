import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import Item from './Item/Item'
import './Menu.css'
import '../../App.css'
import Drawer from './Drawer/Drawer'
import Backdrop from './Drawer/Backdrop'
import publicRequest from '../../api/requestMethod'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, updateCart } from "../../features/user/userSlice"
import { ShoppingCart } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import Modal from '../Modal/Modal'

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
    position: relative;

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

const CartButton = styled.a`
    display: flex;
    opacity: ${props => props.yPos > 500 ? '100%' : '0%'};
    transition: all 0.25s ease;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    background-color: #cf8334;
    width: 40px;
    height: 40px;
    border-radius: 0.5rem;
    z-index: ${props => props.yPos > 500 ? 50 : -1};
    color: white;
    border: none;
    
    &:active {
        background-color: #A56829;
    }

    @media(min-width: 700px) {
        display: none;
    }
`

export default function Menu(props) {
    const [inView, setInView] = useState('chicken')
    const [item, setItem] = useState(null)
    const [items, setItems] = useState({
        chicken: [],
        sides: [],
        drinks: []
    })
    const [modalState, setModalState] = useState(null)
    const chickenRef = useRef(null)
    const sidesRef = useRef(null)
    const drinksRef = useRef(null)
    const dispatch = useDispatch()
    const [yPos, setYPos] = useState(0)
    const cart = useSelector((store) => store.user).cart

    useEffect(() => {
        const getItems = async () => {
            try {
                let chicken = await publicRequest.get("/items/chicken")
                let sides = await publicRequest.get("/items/sides")
                let drinks = await publicRequest.get("/items/drinks")
                setItems({chicken: chicken.data, sides: sides.data, drinks: drinks.data})
            } catch(err) { }
        }

        getItems()
    }, [])

    useEffect(() => {
        function detectYPos() {
            if ((chickenRef.current.getBoundingClientRect().top > 0 && chickenRef.current.getBoundingClientRect().top < window.innerHeight / 2) || sidesRef.current.getBoundingClientRect().top > window.innerHeight / 2) {
                setInView('chicken')
            } else if (sidesRef.current.getBoundingClientRect().top > 0 && sidesRef.current.getBoundingClientRect().top < window.innerHeight / 2) {
                setInView('sides')
            } else if (drinksRef.current.getBoundingClientRect().top > 0 && drinksRef.current.getBoundingClientRect().top < window.innerHeight / 2) {
                setInView('drinks')
            }
            setYPos(window.scrollY)
        }

        window.addEventListener('scroll', detectYPos, false)
    }, [])

    function scrollMenu(category) {
        const el = document.getElementById(category)
        el.scrollIntoView()
    }

    function toggleDrawer(item) {
        setItem(item)
        props.toggleDrawer(item)
    }

    const addItem = (item) => {
        dispatch(addItemToCart({ item: item }))
        dispatch(updateCart())
        setItem(null)
        setModalState(item)
        props.toggleDrawer(null)
    }

    return (
        <div>
            <Body id="body" cartState={props.cartState} className='Italic' drawerState={props.drawerState}>
                <NavBarContainer>
                    <NavBar>
                        <NavBarItemContainer active={inView === 'chicken' ? true : false} onClick={() => scrollMenu('chicken')}>
                            <NavBarItem>Chicken</NavBarItem>
                        </NavBarItemContainer>
                        <NavBarItemContainer active={inView === 'sides' ? true : false} onClick={() => scrollMenu('sides')}>
                            <NavBarItem>Sides</NavBarItem>
                        </NavBarItemContainer>
                        <NavBarItemContainer active={inView === 'drinks' ? true : false} onClick={() => scrollMenu('drinks')}>
                            <NavBarItem>Drinks</NavBarItem>
                        </NavBarItemContainer>
                    </NavBar>
                </NavBarContainer>
                <Container>
                    <ItemContainer>
                        <CategoryTitle ref={chickenRef}>CHICKEN</CategoryTitle>
                        <CategoryContainer id="chicken">
                            {items.chicken.map(item => {
                                item.type = 'chicken'
                                if (item.key === "original" || item.key === "crispy") {
                                    item.chickenType = "non_marinated"
                                } else if (item.key !== "honey" && item.key !== "padak") {
                                    item.chickenType = "marinated"
                                } else {
                                    item.chickenType = "special"
                                }
                                return (
                                    <Item
                                        img={item.img}
                                        title={item.name.toUpperCase()}
                                        halfprice={item.half_price}
                                        fullprice={item.full_price}
                                        type={'chicken'}
                                        itemKey={item.key}
                                        key={item.key}
                                        toggleDrawer={() => toggleDrawer(item)}
                                    />
                                )
                            })}
                        </CategoryContainer>
                        <CategoryTitle ref={sidesRef}>SIDES</CategoryTitle>
                        <CategoryContainer id="sides">
                            {items.sides.map(item => {
                                item.type = 'sides'
                                return (
                                    <Item
                                        img={item.img}
                                        title={item.name.toUpperCase()}
                                        price={item.price}
                                        type={'sides'}
                                        itemKey={item.key}
                                        key={item.key}
                                        toggleDrawer={() => toggleDrawer(item)}
                                    />
                                )
                            })}
                        </CategoryContainer>
                        <CategoryTitle ref={drinksRef}>DRINKS</CategoryTitle>
                        <CategoryContainer id="drinks">
                            {items.drinks.map(item => {
                                item.type = 'drinks'
                                return (
                                    <Item
                                        img={null}
                                        title={item.name.toUpperCase()}
                                        price={item.price}
                                        type={'drinks'}
                                        itemKey={item.key}
                                        key={item.key}
                                        toggleDrawer={() => toggleDrawer(item)}
                                    />
                                )
                            })}
                        </CategoryContainer>
                    </ItemContainer>
                </Container>
            </Body>
            <Backdrop active={props.drawerState} toggleDrawer={() => toggleDrawer(null)} />
            <Drawer active={props.drawerState}
                item={item}
                toggleDrawer={() => toggleDrawer(null)}
                addItem={item => addItem(item)}
                editState={props.editState}
                token={props.token}
                togglessState={props.togglessState}
            />
            <CartButton yPos={yPos} href="/cart">
                <Badge badgeContent={cart.numItems} color="primary">
                    <ShoppingCart />
                </Badge>
            </CartButton>
            <Modal item={item} mode={"add"} modalState={modalState} toggleModalState={() => setModalState(null)}/>
        </div>
    )
}
