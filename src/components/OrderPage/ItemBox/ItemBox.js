import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Close } from '@material-ui/icons';
import chicken from '../../../Images/chicken.jpg'
import AddButton from './AddButton';
import QuantityBox from './OptionBox/QuantityBox';
import OptionBoxes from './OptionBox/OptionBoxes';

const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: #efefef;
    bottom: ${props => props.itemSelectedState ? '0' : `-${window.innerHeight}px`};
    right: 0;
    position: fixed;
    transition: bottom 0.25s ease;
    z-index: 100;

    @media (min-width: 700px) {
        position: fixed;
        display: ${props => props.itemSelectedState ? 'block' : 'none'};
        height: auto;
        max-height: 800px;
        width: 500px;
        top: 50%;
        left: 50%;
        margin-top: -400px;
        margin-left: -250px;
        box-shadow: 0 0 4px 0 black;
    }
`

const Content = styled.div`
    display: ${props => props.itemSelectedState ? '' : 'none'};
    max-height: ${window.innerHeight - 150}px;
    overflow-y: scroll;

    @media (min-width: 700px) {
        max-height: 600px;
        overflow-y: auto;
    }
`

const TitleContainer = styled.div`
    position: relative;
    height: 150px;
    box-shadow: 0 0 4px 2px gray;

    @media(min-width: 700px) {
        height: 200px;
        box-shadow: 0 2px 2px 0px gray;
    }
`

const TitleBar = styled.div`
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    position: absolute;
    top: 0;
    color: white;
    background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0));
`

const ImageContainer = styled.div`
    height: 150px;
    width: auto;
    /* margin: 0 0.5rem 0.5rem 0.5rem;
    border-radius: 0.25rem; */

    @media (min-width: 700px) {
        height: 200px;
    }
`

const Image = styled.img`
    height: 150px;
    width: 100%;
    object-fit: cover;
    /* border-radius: 0.25rem;
    box-shadow: 0 0 2px 0 gray; */

    @media (min-width: 700px) {
        height: 200px;
    }
`

const Bottom = styled.div`
    background-color: white;
    padding-bottom: 0.5rem;
`

const RemoveButton = styled.p`
    //color: #7300ff;
    color: white;
    font-size: small;
    width: 100px;
    margin: 1rem auto;
    border-radius: 0.5rem;
    background-color: #ff5757;
    padding: 0.25rem;
    cursor: pointer;

    &:active {
        color: #a154ff;
    }

    cursor: hover;
`

const Anchor = styled.div`
    height: 1px;
    background-color: transparent;
`

const Total = styled.div`
    display: flex;
    margin: 0 0.5rem;
    justify-content: space-between;
    align-items: center;
`


export default function ItemBox(props) {
    const anchor = useRef(null)
    const [finalItem, setFinalItem] = useState(null)
    const [item, setItem] = useState({
        title: '',
        chicken: {key: 'original', halfprice: 17, fullprice: 32},
        img: '',
        cut: 'whole',
        chickenToppings: {sesame: false, peanuts: false, parsley: false},
        powderToppings: {snowy: false, onion: false},
        sides: {side1: 'radish', side2: 'radish'},
        sauce: 'korean',
        size: 'medium',
        quantity: 1,
        price: 0,
        prevKey: '',
        key: ''
    })

    function getUniqueChickenKey(item) {
        let key = ''
        key += item.chicken.key + '_' + item.cut
        if(item.chickenToppings.sesame) {
            key += '_sesame'
        }
        
        if(item.chickenToppings.peanuts) {
            key += '_peanuts'
        }

        if(item.chickenToppings.parsley) {
            key += '_pasley'
        }

        if(item.powderToppings.snowy) {
            key += '_snowy'
        }

        if(item.powderToppings.onion) {
            key += '_onion'
        }
        return key
    }

    function changeSide(side, id) {
        if(id === "sides1") {
            setItem({...item, sides: {side1: side, side2: item.sides.side2}})
        } else {
            setItem({...item, sides: {side1: item.sides.side1, side2: side}})
        }
    }

    function changeCut(cut) {
        setItem({...item, cut: cut})
    }

    function changeSize(size) {
        setItem({...item, size: size})
    }

    function changeChickenTopping(topping) {
        if(topping === "sesame") {
            setItem({...item, chickenToppings: {sesame: !item.chickenToppings.sesame, peanuts: item.chickenToppings.peanuts, parsley: item.chickenToppings.parsley}})
        } else if (topping === "peanuts") {
            setItem({...item, chickenToppings: {sesame: item.chickenToppings.sesame, peanuts: !item.chickenToppings.peanuts, parsley: item.chickenToppings.parsley}})
        } else {
            setItem({...item, chickenToppings: {sesame: item.chickenToppings.sesame, peanuts: item.chickenToppings.peanuts, parsley: !item.chickenToppings.parsley}})
        }
    }

    function changeSauce(sauce) {
        setItem({...item, sauce: sauce})
    }

    function changeChicken(chicken) {
        setItem({...item, chicken: chicken})
    }

    function changePowderTopping(topping) {
        if(topping === "snowy_cheese") {
            setItem({...item, powderToppings: {snowy: !item.powderToppings.snowy, onion: item.powderToppings.onion}})
        } else {
            setItem({...item, powderToppings: {snowy: item.powderToppings.snowy, onion: !item.powderToppings.onion}})
        }
    }

    function changeQuantity(quantity) {
        setItem({...item, quantity: quantity})
    }

    useEffect(() => {
        if(props.editState && props.selectedItem) {
            setItem(props.selectedItem)
        }

        if(!props.itemSelectedState) {
            setItem({
                chicken: {key: 'original', halfprice: 17, fullprice: 32},
                cut: 'whole',
                chickenToppings: {sesame: false, peanuts: false, parsley: false},
                powderToppings: {snowy: false, onion: false},
                sides: {side1: 'radish', side2: 'radish'},
                sauce: 'korean',
                size: 'medium',
                quantity: 1,
            })
        }

        anchor.current.scrollIntoView()
    }, [props.itemSelectedState, props.selectedItem, props.editState])

    useEffect(() => {
        if(props.selectedItem) {
            let newPrice = props.selectedItem.price
            let type = props.selectedItem.type

            if(type === "chips") {
                if(item.size === "medium") {
                    newPrice = 5
                } else {
                    newPrice = 7
                }
            }

            if(type === "halfchicken") {
                newPrice = item.chicken.halfprice
            } else if(type === "fullchicken") {
                newPrice = item.chicken.fullprice
            }

            if(props.selectedItem.type.includes("chicken") || props.selectedItem.type === "chips") {
                if(item.powderToppings.snowy) {
                    newPrice += 2
                }

                if(item.powderToppings.onion) {
                    newPrice += 2
                }
            }

            let prevKey = props.selectedItem.key
            let newKey = props.selectedItem.type
            if(props.selectedItem.type !== 'side') {
                if(type === "chips") {
                    newKey = `${props.selectedItem.type}${'_'+item.size}${item.powderToppings.snowy ? '_snowycheese' : ''}${item.powderToppings.onion ? '_onionseasoning' : ''}`
                }
    
                if(type === "sauce") {
                    newKey = `${props.selectedItem.type}${'_'+item.sauce}`
                }
    
                if(newKey.includes("chicken")) {
                    newKey += '_' + getUniqueChickenKey(item)
                }
            } else {
                newKey = props.selectedItem.key
            }

            const newItem = {
                title: props.selectedItem.title,
                chicken: props.selectedItem.type.includes("chicken") ? item.chicken : null,
                img: props.selectedItem.img,
                cut: props.selectedItem.type.includes("chicken") ? item.cut : null,
                chickenToppings: props.selectedItem.type.includes("chicken") ? item.chickenToppings : null,
                sides: props.selectedItem.type.includes("chicken") ? props.selectedItem.type === "halfchicken" ? {side1: item.sides.side1, side2: null} : item.sides : null,
                size: props.selectedItem.type === 'chips' ? item.size : null,
                quantity: item.quantity,
                price: newPrice,
                powderToppings: props.selectedItem.type === "chips" || props.selectedItem.type.includes("chicken") ? item.powderToppings : null,
                sauce: props.selectedItem.type === "sauce" ? item.sauce : null,
                details: props.selectedItem.details,
                type: props.selectedItem.type,
                prevKey: prevKey,
                key: newKey
            }
            setFinalItem(newItem)
        }
    }, [item, props.itemSelectedState, props.selectedItem])

    return (
        <Container itemSelectedState={props.itemSelectedState}>
            <TitleContainer>
                <TitleBar>
                    <p>{props.selectedItem ? props.selectedItem.title : ''}</p>
                    <Close onClick={props.close} style={{
                        cursor: 'pointer',
                        position: 'absolute',
                        top: '16px',
                        right: '16px'
                    }}/>
                </TitleBar>
                <ImageContainer>
                    <Image src={props.selectedItem ? props.selectedItem.img : chicken} />
                </ImageContainer>
            </TitleContainer>
            <Content itemSelectedState={props.itemSelectedState}>
                <Anchor ref={anchor}/>
                <OptionBoxes 
                    itemSelectedState={props.itemSelectedState}
                    type={props.itemSelectedState ? props.selectedItem.type : null}
                    size={item.size} 
                    sizeChange={size => changeSize(size)}
                    sauce={item.sauce}
                    sauceChange={sauce => changeSauce(sauce)}
                    powderToppings={item.powderToppings}
                    chickenToppings={item.chickenToppings}
                    changePowderToppings={topping => changePowderTopping(topping)}
                    changeChickenToppings={topping => changeChickenTopping(topping)}
                    changeChicken={chicken => changeChicken(chicken)}
                    chicken={item.chicken}
                    cut={item.cut}
                    changeCut={cut => changeCut(cut)}
                    sides={item.sides}
                    changeSide={(side, id) => changeSide(side, id)}
                />
                <Bottom>
                    <QuantityBox changeQuantity={newQuantity => changeQuantity(newQuantity)} quantity={item.quantity}/>
                    {props.editState ? <RemoveButton onClick={() => props.removeItem(finalItem)}><strong>Remove Item</strong></RemoveButton> : null}
                    <Total>
                        <p style={{margin: '0', fontWeight: '600'}}>Total: ${finalItem ? (finalItem.price * finalItem.quantity) : 0}</p>
                    </Total>
                    <AddButton addItem={() => props.editState ? props.editItem(finalItem) : props.addItem(finalItem)}>{props.editState ? 'Edit Item' : 'Add to cart'}</AddButton>
                </Bottom>
            </Content>
        </Container>
    )
}
