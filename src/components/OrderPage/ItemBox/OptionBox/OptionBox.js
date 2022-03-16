import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: auto;
  height: auto;
  text-align: left;
  background-color: white;
  margin: 0.5rem 0;
  //border-radius: 0.5rem;
  //background-color: #efefef;
  //box-shadow: 0 0 2px 0 gray;
  //border-left: 4px double black;
`
const Wrapper = styled.div`
  margin: 0 1rem;
  padding: 0.5rem 0;
`

export const Title = styled.h3`
  margin: 0;
`

const OptionContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  cursor: pointer;

  &:active {
    background-color: #efefef;
  }
`

const OptionsLabel = styled.p`
  text-align: left;
  margin-left: 0.5rem;
`

const Extra = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const CheckBox = styled.input`
  
`

const OptionSeperator = styled.div`
  margin: 0;
  height: 0px;
  border: 1px solid #efefef;
`

export const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
`

export const Required = styled.div`
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  padding: 0.25rem;
  font-size: small;
  margin-bottom: 1px;
`

export default function OptionBox(props) {
  let optionBox = null

  switch(props.type) {
    case "size":
      optionBox = <Container>
        <Wrapper>
          <TitleContainer>
            <Title>Size</Title>
            <Required>Required</Required>
          </TitleContainer>
          <OptionContainer onClick={() => props.changeSize("medium")}>
            <CheckBox type="radio" checked={props.size === "medium" ? true : false} name="size" value="medium" onChange={() => props.changeSize("medium")}/>
            <OptionsLabel>Medium</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeSize("large")}>
            <CheckBox type="radio" name="size" checked={props.size === "medium" ? false : true} value="large" onChange={() => props.changeSize("large")}/>
            <OptionsLabel>Large</OptionsLabel>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
    case "powdertopping":
      optionBox = <Container>
        <Wrapper>
          <TitleContainer>
            <Title>Toppings</Title>
          </TitleContainer>
          <OptionContainer onClick={() => props.changePowderTopping("snowy_cheese")}>
            <CheckBox type="checkbox" name="powdertopping" value="snowy_cheese" checked={props.powderToppings.snowy} onChange={() => props.changePowderTopping("snowy_cheese")}/>
            <Extra>
              <OptionsLabel>Snowy Cheese</OptionsLabel>
              <OptionsLabel>+ $2.00</OptionsLabel>
            </Extra>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changePowderTopping("onion_seasoning")}> 
            <CheckBox type="checkbox" name="powdertopping" value="onion_seasoning" checked={props.powderToppings.onion} onChange={() => props.changePowderTopping("onion_seasoning")}/>
            <Extra>
              <OptionsLabel>Onion Seasoning</OptionsLabel>
              <OptionsLabel>+ $2.00</OptionsLabel>
            </Extra>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
    case "chickentopping":
      optionBox = <Container>
        <Wrapper>
          <TitleContainer>
            <Title>Toppings</Title>
          </TitleContainer>
          <OptionContainer onClick={() => props.changeChickenTopping("sesame")}>
            <CheckBox type="checkbox" name="topping" value="sesame" checked={props.chickenToppings.sesame} onChange={() => props.changeChickenTopping("sesame")}/>
            <OptionsLabel>Sesame</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeChickenTopping("peanuts")}>
            <CheckBox type="checkbox" name="topping" value="peanuts" checked={props.chickenToppings.peanuts} onChange={() => props.changeChickenTopping("peanuts")}/>
            <OptionsLabel>Peanuts</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeChickenTopping("parsley")}>
            <CheckBox type="checkbox" name="topping" value="parsley" checked={props.chickenToppings.parsley} onChange={() => props.changeChickenTopping("parsley")}/>
            <OptionsLabel>Parsley</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changePowderTopping("snowy_cheese")}>
            <CheckBox type="checkbox" name="powdertopping" value="snowy_cheese" checked={props.powderToppings.snowy} onChange={() => props.changePowderTopping("snowy_cheese")}/>
            <Extra>
              <OptionsLabel>Snowy Cheese</OptionsLabel>
              <OptionsLabel>+ $2.00</OptionsLabel>
            </Extra>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changePowderTopping("onion_seasoning")}> 
            <CheckBox type="checkbox" name="powdertopping" value="onion_seasoning" checked={props.powderToppings.onion} onChange={() => props.changePowderTopping("onion_seasoning")}/>
            <Extra>
              <OptionsLabel>Onion Seasoning</OptionsLabel>
              <OptionsLabel>+ $2.00</OptionsLabel>
            </Extra>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
    case "sauce":
      optionBox = <Container>
        <Wrapper>
        <TitleContainer>
            <Title>Option</Title>
            <Required>Required</Required>
          </TitleContainer>
          <OptionContainer onClick={() => props.changeSauce("korean")}>
            <CheckBox type="radio" name="sauce" checked={props.sauce === "korean" ? true : false} onChange={() => props.changeSauce("korean")}/>
            <OptionsLabel>Korean</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeSauce("spicy")}>
            <CheckBox type="radio" name="sauce" checked={props.sauce === "spicy" ? true : false} onChange={() => props.changeSauce("spicy")}/>
            <OptionsLabel>Spicy Korean</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeSauce("hotandspicy")}>
            <CheckBox type="radio" name="sauce" checked={props.sauce === "hotandspicy" ? true : false} onChange={() => props.changeSauce("hotandspicy")}/>
            <OptionsLabel>Hot and Spicy</OptionsLabel>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
    case "cut":
      optionBox = <Container>
        <Wrapper>
          <TitleContainer>
            <Title>Cut</Title>
            <Required>Required</Required>
          </TitleContainer>
          <OptionContainer onClick={() => props.changeCut("whole")}>
            <CheckBox type="radio" name="cut" checked={props.cut === "whole" ? true : false} onChange={() => props.changeCut("whole")}/>
            <OptionsLabel>Whole Chicken</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeCut("boneless")}>
            <CheckBox type="radio" name="cut" checked={props.cut === "boneless" ? true : false} onChange={() => props.changeCut("boneless")}/>
            <OptionsLabel>Boneless</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeCut("nibble")}>
            <CheckBox type="radio" name="cut" checked={props.cut === "nibble" ? true : false} onChange={() => props.changeCut("nibble")}/>
            <OptionsLabel>Nibble</OptionsLabel>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
      case "side":
      optionBox = <Container>
        <Wrapper>
          <TitleContainer>
            <Title>{props.id}</Title>
            <Required>Required</Required>
          </TitleContainer>
          <OptionContainer onClick={() => props.changeSide("radish")}>
            <CheckBox type="radio" name={props.id} checked={props.side === "radish" ? true : false} onChange={() => props.changeSide("radish")}/>
            <OptionsLabel>Pickled Radish</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeSide("coleslaw")}>
            <CheckBox type="radio" name={props.id} checked={props.side === "coleslaw" ? true : false} onChange={() => props.changeSide("coleslaw")}/>
            <OptionsLabel>Coleslaw</OptionsLabel>
          </OptionContainer>
          <OptionSeperator />
          <OptionContainer onClick={() => props.changeSide("chips")}>
            <CheckBox type="radio" name={props.id} checked={props.side === "chips" ? true : false} onChange={() => props.changeSide("chips")}/>
            <OptionsLabel>Small Chips</OptionsLabel>
          </OptionContainer>
        </Wrapper>
      </Container>
      break
      default:
        optionBox = null
      break
  }

  return optionBox
}
