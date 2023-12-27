import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import '../../../App.css'
import './Drawer.css'
import { Close, Add, Remove } from '@material-ui/icons'
import Category from './Category/Category'
import { ScreenHeight } from '../../hooks/ScreenHeight'
import { useDispatch, useSelector } from 'react-redux'
import publicRequest from '../../../api/requestMethod'

export const Body = styled.main`
    width: 80%;
    background-color: #201e1f;
    height: 100%;
    position: fixed;
    top: 0;
    right: ${props => props.active ? '0' : '-80%'};
    z-index: 101;
    transition: all 0.25s;

    @media(min-width: 700px) {
      width: 400px;
      right: ${props => props.active ? '0' : '-400px'};
    }
`

const Ctn = styled.div`
  display: ${props => props.active ? 'block' : 'none'};
  color: white;
  max-height: ${props => props.sh - 135}px;
  overflow: auto;
`

const TitleCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
`

const Title = styled.h2`
  font-weight: 300;
  text-align: left;
  font-size: 26px;
  margin: 0;

  @media(min-width: 700px) {
    font-size: 30px;
  }
`

export const Image = styled.img`
  width: ${props => props.topImg ? '100%' : 'auto'};
  height: ${props => props.topImg ? '180px' : '100%'};
  border-radius: 1rem;
  border: 2px solid white;
  box-shadow: ${props => props.name ? '0 0 6px 0 gray' : 'none'};
  object-fit: cover;

  @media(min-width: 700px) {
    height: ${props => props.topImg ? '210px' : '100%'};
  }
`

const ImgCtn = styled.div`
  margin: 1rem;
  width: auto;
`

export const Footer = styled.div`
  height: fit-content;
  width: 100%;
  background-color: #201e1f;
  bottom: 0;
  right: 0;
  z-index: 105;
  transition: all 0.25s;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`

export const Button = styled.div`
  width: 100%;
  height: 35px;
  padding: 0.5rem 0.5rem;
  border-radius: 1rem;
  background-color: #cf8334;
  margin: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 300;
  font-size: 22px;
  cursor: pointer;

  &:active {
    background-color: #A56829;
  }
`

export const QuantityCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 150;
  position: absolute;
  width: 100%;
  bottom: 83px;
`

export const Quantity = styled.div`
  width: 55px;
  height: 35px;
  font-size: 20px;
  border: 2px solid white;
  border-radius: 1rem;
  padding-right: 1px;
  margin: 0 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: rgba(0,0,0,0.6);
  font-family: 'coffee_rg'
`

export default function Drawer(props) {
  const sh = ScreenHeight()

  const userToken = useSelector((store) => store.user.userToken)
  const closed = useSelector((store) => store.menu.closed)

  const [activeCtg, setActiveCtg] = useState({
    size: false,
    cut: false,
    toppings: false,
    sides: false,
    sauce: false,
    drinksSize: false,
    drinks: false
  })

  const [item, setItem] = useState({
    name: '',
    size: 'half',
    cut: 'whole',
    toppings: {
      sesame: false,
      peanuts: false,
      parsley: false,
      snowy: false,
      onion: false
    },
    sides: {
      side1: 'radish',
      side2: 'nosides'
    },
    quantity: 1,
    img: null,
    price: 0,
    type: '',
    key: ''
  })

  const [price, setPrice] = useState(props.item ? props.item.half_price : 0)
  const [items, setItems] = useState({
    chicken: [],
    sides: [],
    drinks: []
  })

  useEffect(() => {
    const getItems = async () => {
      const chicken = await publicRequest.get("/items/chicken")
      const sides = await publicRequest.get("/items/sides")
      const drinks = await publicRequest.get("/items/drinks")

      setItems({ chicken: chicken.data, sides: sides.data, drinks: drinks.data })
    }

    getItems()
  }, [])

  function hasNumber(key) {
    return /\d/.test(key);
  }

  function keyWithoutNum(key) {
    let newKey = key.split('_')[0]
    return newKey
  }

  function toggleCtg(ctg) {
    setActiveCtg({ ...activeCtg, [ctg]: !activeCtg[ctg] })
  }

  function handleChange(type, value) {
    if (type === 'size' && props.item.type === "chicken") {
      if (value === 'half') {
        setItem({ ...item, sides: { side1: item.sides.side1, side2: 'nosides' }, size: value })
      } else {
        setItem({ ...item, sides: { side1: item.sides.side1, side2: 'coleslaw' }, size: value })
      }
    } else {
      setItem({ ...item, [type]: value })
    }
  }

  function updateToppings(topping) {
    setItem({ ...item, toppings: { ...item.toppings, [topping]: !item.toppings[topping] } })
  }

  function updateSides(num, side) {
    if (num === 1) {
      setItem({ ...item, sides: { ...item.sides, side1: side } })
    } else {
      setItem({ ...item, sides: { ...item.sides, side2: side } })
    }
  }

  useEffect(() => {
    if (props.active) {
      if (hasNumber(props.item.key)) {
        setItem(props.item)
      } else {
        if (props.item.type === "chicken") {
          setItem({
            ...item,
            name: props.item.name,
            size: 'half',
            cut: props.item.key === "honey" || props.item.key === "padak" ? 'boneless' : 'whole',
            toppings: {
              sesame: false,
              peanuts: false,
              parsley: false,
              snowy: false,
              onion: false
            },
            sides: {
              side1: 'radish',
              side2: 'nosides'
            },
            quantity: 1,
            img: props.item.img,
            price: props.item.half_price,
            type: props.item.type,
            chickenType: props.item.chickenType,
            key: props.item.key
          })
        } else if (props.item.type === "sides") {
          if (props.item.key === "chips") {
            setItem({
              name: props.item.name,
              size: 'medium',
              toppings: {
                snowy: false,
                onion: false
              },
              quantity: 1,
              img: props.item.img,
              price: props.item.medium_price,
              type: props.item.type,
              key: props.item.key
            })
          } else if (props.item.key === "sauce") {
            setItem({
              name: props.item.name,
              key: props.item.key,
              sauce: 'korean',
              img: props.item.img,
              price: props.item.price,
              type: props.item.type,
              quantity: 1,
            })
          } else {
            setItem({
              name: props.item.name,
              key: props.item.key,
              img: props.item.img,
              price: props.item.price,
              type: props.item.type,
              quantity: 1,
            })
          }
        } else if (props.item.type === "drinks") {
          setItem({
            name: props.item.name,
            key: props.item.key,
            img: props.item.img,
            price: props.item.price,
            sizes: props.item.size,
            size: props.item.size.length > 0 ? props.item.size[0].size : null,
            drinks: props.item.drinks,
            drink: props.item.drinks.length > 0 ? props.item.drinks[0] : null,
            type: props.item.type,
            quantity: 1,
          })
        }
      }
    } else {
      setItem({
        name: '',
        size: 'half',
        cut: 'whole',
        toppings: {
          sesame: false,
          peanuts: false,
          parsley: false,
          snowy: false,
          onion: false
        },
        sides: {
          side1: 'radish',
          side2: 'nosides'
        },
        quantity: 1,
        img: null,
        price: 0,
        type: '',
        key: ''
      })

      setActiveCtg({
        size: false,
        cut: false,
        toppings: false,
        sides: false,
        sauce: false
      })
    }
  }, [props.active])

  useEffect(() => {
    if (props.item !== null) {
      let originItem = null
      if (hasNumber(props.item.key)) {
        if (item.type === "chicken") {
          originItem = items.chicken.find(i => i.key === keyWithoutNum(item.key))
        } else if (item.type === "sides") {
          originItem = items.sides.find(i => i.key === keyWithoutNum(item.key))
        } else if (item.type === "drinks") {
          originItem = items.drinks.find(i => i.key === keyWithoutNum(item.key))
        }
      } else {
        originItem = props.item
      }

      let price = 0
      if (item.type === "chicken") {
        price = item.size === 'half' ? originItem.half_price : originItem.full_price
      } else if (item.type === "sides") {
        if (item.key.includes("chips")) {
          price = item.size === 'medium' ? originItem.medium_price : originItem.large_price
        } else {
          price = originItem.price
        }
      }
      if (item.type === "chicken" || item.key.includes("chips")) {
        if (item.toppings.snowy) price += (2 * (props.item.type === 'chicken' ? (item.size === 'half' ? 1 : 2) : 1))
        if (item.toppings.onion) price += (2 * (props.item.type === 'chicken' ? (item.size === 'half' ? 1 : 2) : 1))
      }
      if (item.type === "drinks") {
        let size = item.sizes.find(i => i.size === item.size)
        price = size.price + originItem.price
      }

      setPrice(price)
    }
  }, [item, props.item])

  useEffect(() => {
    setItem({ ...item, price: price })
  }, [price])

  return (
    <Body active={props.active} className="Italic">
      <main className='drawer'>
        {props.item ? <Ctn active={props.active} sh={sh}>
          <TitleCtn>
            <Title>
              {props.item.name.toUpperCase()}
            </Title>
            <Close onClick={props.toggleDrawer} style={{ cursor: 'pointer' }} />
          </TitleCtn>
          <ImgCtn style={{ display: props.item.type === "drinks" ? 'none' : 'block' }}>
            <Image src={props.item.img} topImg />
            <p style={{ display: item.type === 'chicken' ? item.quantity * (item.size === 'half' ? 1 : 2) > 4 ? 'block' : 'none' : 'none', position: 'relative', zIndex: 150, color: 'gray', margin: '0', textAlign: 'left', backgroundColor: '#201e1f', paddingTop: '0.5rem' }}>*Larger orders will take more time.</p>
          </ImgCtn>
          <Category
            item={item}
            activeCtg={activeCtg}
            toggleCtg={ctg => toggleCtg(ctg)}
            handleChange={(type, value) => handleChange(type, value)}
            updateToppings={topping => updateToppings(topping)}
            updateSides={(num, side) => updateSides(num, side)}
            type={props.item.type}
          />
        </Ctn> : null}
        <QuantityCtn>
          <Remove style={{ borderRadius: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', cursor: 'pointer', color: 'white', fontSize: '32px' }} onClick={item.quantity < 2 ? null : () => setItem({ ...item, quantity: item.quantity - 1 })} />
          <Quantity>{item.quantity}</Quantity>
          <Add style={{ borderRadius: '1rem', backgroundColor: 'rgba(0,0,0,0.6)', cursor: 'pointer', color: 'white', fontSize: '32px' }} onClick={() => setItem({ ...item, quantity: item.quantity + 1 })} />
        </QuantityCtn>
        <Footer>
          {userToken ? (item.type === "chicken" && (item.size === "half" ? item.quantity > 10 ? true : false : item.quantity > 5 ? true : false)) ?
            <Button style={{ backgroundColor: '#808080', fontFamily: 'coffee_rg' }}>ORDER LIMIT REACHED</Button> : <Button onClick={() => props.addItem(item)} style={{ fontFamily: 'coffee_rg' }}>${(item.price * item.quantity).toFixed(2)} {props.editState ? 'SAVE CHANGES' : 'ADD TO CART'}</Button> :
            <Button onClick={closed ? null : props.togglessState} style={{ backgroundColor: '#808080', fontFamily: 'coffee_rg' }}>{closed ? "STORE CLOSED" : "START ORDER"}</Button>}
        </Footer>
      </main>
    </Body>
  )
}