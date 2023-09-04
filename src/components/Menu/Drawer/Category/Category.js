import React from 'react'
import styled from 'styled-components'
import { Cut, OrderChicken, Toppings, ChickenSides, Sauces } from '../../../Data'
import { Radio, Checkbox } from '@material-ui/core'
import { KeyboardArrowDown as Arrow } from '@material-ui/icons'
import { Image } from '../Drawer'

const CategoryBody = styled.div`
  margin: 0 1rem;
  text-align: left;
  background-color: #201e1f;
  z-index: ${props => props.zIndex};
  height: ${props => props.temp ? '650px' : 'auto'};
  position: relative;
`

const CategoryCtn = styled.div`
  position: relative;
  max-height: ${props => props.temp ? '400px' : props.active ? '700px' : '0px'};
  transition: all 0.5s ease-in-out;
  margin: 0;
  padding-bottom: ${props => props.ep ? '40px' : '0'};
`

const CategoryTitle = styled.h3`
  font-weight: 300;
  font-size: ${props => props.sub ? '16px' : '20px'};
  margin: ${props => props.sub ? '0 0.5rem' : '0'};
  padding: ${props => props.sub ? '1rem 0 0 0' : '1rem 0'};

  @media(min-width: 700px) {
    font-size: ${props => props.sub ? '20px' : '24px'};
  }
`

const CategoryTitleCtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 1rem;
  padding: 0 0.5rem;
  cursor: pointer;

  &:active {
    background-color: rgba(0,0,0,0.2);
  }

  @media(min-width: 700px) {
      &:hover {
        background-color: rgba(0,0,0,0.2);
      }
  }
`

const Text = styled.p`
  margin-left: ${props => props.noImg ? '0.5rem' : '1rem'};
  margin: ${props => props.sub ? '-0.5rem 1rem 0.5rem 0.5rem' : '0.5rem'};
  color: ${props => props.sub ? 'gray' : 'white'};
`

const ItemCtn = styled.div`
  display: flex;
  height: ${props => props.noImg ? '45px' : '90px'};
  margin: 1rem 0;
  border-radius: 1rem;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 2px;

  &:hover {
    background-color: ${props => props.sub ? 'none' : 'rgba(0,0,0,0.2)'};
  }
`

export default function Category(props) {
  return (
    <>
      {props.type === "chicken" ? <div>
        <CategoryBody zIndex={101}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('size')}>
            <CategoryTitle>SIZE</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.size ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.size}>
            {OrderChicken.map(size => {
              return (
                <ItemCtn onClick={() => props.handleChange('size', size.key)} key={size.key}>
                  <ItemCtn sub>
                    <Image src={size.img} />
                    <div>
                      <Text>{size.title.toUpperCase()}</Text>
                      <Text sub>{size.key === 'half' ? '+ 1 SIDE' : '+ 2 SIDES'}</Text>
                    </div>
                  </ItemCtn>
                  <Radio
                    checked={props.item.size === size.key}
                    name="size"
                    value={size.key}
                    onChange={() => props.handleChange('size', size.key)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={102}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('cut')}>
            <CategoryTitle>CUT</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.cut ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.cut} ep={props.item.key.split('_')[0] === "padak" && props.activeCtg.cut ? true : false}>
            {Cut.map(cut => {
              let key = props.item.key.split('_')[0]
              return (
                cut.key === "whole" && (key === "honey" || key === "padak") ? null : (cut.key === "nibble" && key === "padak") ? null :
                  <ItemCtn onClick={() => props.handleChange('cut', cut.key)} key={cut.key}>
                    <ItemCtn sub>
                      <Image src={cut.img} />
                      <Text>{cut.title.toUpperCase()}</Text>
                    </ItemCtn>
                    <Radio
                      checked={props.item.cut === cut.key}
                      name="cut"
                      value={cut.key}
                      onChange={() => props.handleChange('cut', cut.key)}
                      style={{ color: 'white' }}
                    />
                  </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={103}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('toppings')}>
            <CategoryTitle>TOPPINGS</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.toppings ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.toppings}>
            {Toppings.map(topping => {
              return (
                <ItemCtn onClick={() => props.updateToppings(topping.key)} noImg={topping.key === 'snowy' || topping.key === 'onion' ? false : true} key={topping.key}>
                  {topping.key === 'snowy' || topping.key === 'onion' ? <ItemCtn sub>
                    <Image src={topping.img} />
                    <div>
                      <Text>{topping.title.toUpperCase()}</Text>
                      <Text sub>+ ${(topping.price * (props.item.size === 'full' ? 2 : 1)).toFixed(2)}</Text>
                    </div>
                  </ItemCtn> :
                    <ItemCtn noImg>
                      <Text noImg>{topping.title.toUpperCase()}</Text>
                    </ItemCtn>
                  }
                  <Checkbox
                    checked={props.item.toppings[topping.key] === true}
                    name="topping"
                    value={topping.key}
                    onChange={() => props.updateToppings(topping.key)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={104}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('sides')}>
            <CategoryTitle>SIDES</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.sides ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.sides} style={{ paddingBottom: '1rem' }}>
            <CategoryTitle sub>SIDE 1</CategoryTitle>
            {ChickenSides.map(side => {
              return (
                <ItemCtn onClick={() => props.updateSides(1, side.key)} key={side.key} noImg={side.key === 'nosides' ? true : false}>
                  {side.key === 'nosides' ? <ItemCtn noImg sub>
                    <Text noImg>{side.title.toUpperCase()}</Text>
                  </ItemCtn> :
                    <ItemCtn sub>
                      <Image src={side.img} />
                      <Text>{side.title.toUpperCase()}</Text>
                    </ItemCtn>
                  }
                  <Radio
                    checked={props.item.sides.side1 === side.key}
                    name="sides1"
                    value={side.key}
                    onChange={() => props.updateSides(1, side.key)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
            <CategoryTitle sub style={{ display: props.item.size === 'full' ? '' : 'none' }}>SIDE 2</CategoryTitle>
            {props.item.size === 'full' ? ChickenSides.map(side => {
              return (
                <ItemCtn onClick={() => props.updateSides(2, side.key)} key={side.key} noImg={side.key === 'nosides' ? true : false}>
                  {side.key === 'nosides' ? <ItemCtn noImg sub>
                    <Text noImg>{side.title.toUpperCase()}</Text>
                  </ItemCtn> :
                    <ItemCtn sub>
                      <Image src={side.img} />
                      <Text>{side.title.toUpperCase()}</Text>
                    </ItemCtn>
                  }
                  <Radio
                    checked={props.item.sides.side2 === side.key}
                    name="sides2"
                    value={side.key}
                    onChange={() => props.updateSides(2, side.key)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            }) : null}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={105} temp />
      </div> : props.item.key.includes("chips") ? <div>
        <CategoryBody zIndex={101}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('size')}>
            <CategoryTitle>SIZE</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.size ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.size}>
            <ItemCtn noImg key="medium" onClick={() => props.handleChange('size', 'medium')}>
              <Text noImg>MEDIUM</Text>
              <Radio
                checked={props.item.size === 'medium'}
                name="size"
                value="medium"
                onChange={() => props.handleChange('size', 'medium')}
                style={{ color: 'white' }}
              />
            </ItemCtn>
            <ItemCtn noImg key="large" onClick={() => props.handleChange('size', 'large')}>
              <Text noImg>LARGE</Text>
              <Radio
                checked={props.item.size === 'large'}
                name="size"
                value="large"
                onChange={() => props.handleChange('size', 'large')}
                style={{ color: 'white' }}
              />
            </ItemCtn>
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={103}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('toppings')}>
            <CategoryTitle>TOPPINGS</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.toppings ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.toppings}>
            {Toppings.map(topping => {
              return (
                <div key={topping.key}>
                  {topping.key === 'snowy' || topping.key === 'onion' ?
                    <ItemCtn onClick={() => props.updateToppings(topping.key)}>
                      <ItemCtn sub>
                        <Image src={topping.img} />
                        <div>
                          <Text>{topping.title.toUpperCase()}</Text>
                          <Text sub>+ ${(topping.price * (props.item.size === 'full' ? 2 : 1)).toFixed(2)}</Text>
                        </div>
                      </ItemCtn>
                      <Checkbox
                        checked={props.item.toppings[topping.key] === true}
                        name="topping"
                        value={topping.key}
                        onChange={() => props.updateToppings(topping.key)}
                        style={{ color: 'white' }}
                      />
                    </ItemCtn> : null
                  }
                </div>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={105} temp />
      </div> : props.item.key.includes("sauce") ? <div>
        <CategoryBody zIndx={101}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('sauce')}>
            <CategoryTitle>SAUCE</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.sauce ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.sauce}>
            {Sauces.map(sauce => {
              return (
                <ItemCtn onClick={() => props.handleChange('sauce', sauce.key)} key={sauce.key} noImg>
                  <ItemCtn sub noImg>
                    <Text>{sauce.title.toUpperCase()}</Text>
                  </ItemCtn>
                  <Radio
                    checked={props.item.sauce === sauce.key}
                    name="sauce"
                    value={sauce.key}
                    onChange={() => props.handleChange('sauce', sauce.key)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={105} temp />
      </div> : props.item.type === "drinks" ? <div>
      <CategoryBody zIndx={101}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('drinksSize')}>
            <CategoryTitle>SIZE</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.drinksSize ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.drinksSize}>
            {props.item.sizes.map(size => {
              return (
                <ItemCtn onClick={() => props.handleChange('size', size.size)} key={size.size} noImg>
                  <ItemCtn sub noImg>
                    <div>
                      <Text>{size.size}</Text>
                      {size.price > 0 ? <Text sub>+ ${size.price.toFixed(2)}</Text> : null}
                    </div>
                  </ItemCtn>
                  <Radio
                    checked={props.item.size === size.size}
                    name="drinksSize"
                    value={size.size}
                    onChange={() => props.handleChange('size', size.size)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndx={102} style={{display: props.item.drinks.length < 1 ? 'none' : 'block'}}>
          <CategoryTitleCtn onClick={() => props.toggleCtg('drink')}>
            <CategoryTitle>DRINK CHOICE</CategoryTitle>
            <Arrow style={{ transform: props.activeCtg.drink ? 'rotate(180deg)' : 'none', transition: 'all 0.25s' }} />
          </CategoryTitleCtn>
          <CategoryCtn active={props.activeCtg.drink}>
            {props.item.drinks.map(drink => {
              return (
                <ItemCtn onClick={() => props.handleChange('drink', drink)} key={drink} noImg>
                  <ItemCtn sub noImg>
                    <Text>{drink.toUpperCase()}</Text>
                  </ItemCtn>
                  <Radio
                    checked={props.item.drink.toUpperCase() === drink.toUpperCase()}
                    name="drink"
                    value={drink}
                    onChange={() => props.handleChange('drink', drink)}
                    style={{ color: 'white' }}
                  />
                </ItemCtn>
              )
            })}
          </CategoryCtn>
        </CategoryBody>
        <CategoryBody zIndex={105} temp />
      </div> : null}
    </>
  )
}
