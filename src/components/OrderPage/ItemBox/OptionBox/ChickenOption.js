import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Chicken } from '../../../Data'
import { TitleContainer, Title, Required } from './OptionBox';

const Container = styled.div`
  background-color: white;
  padding: 0.5rem 1rem;
`

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 200px;
  position: relative;
  border-radius: 0.5rem;
  margin-top: 0.5rem;
  //background-color: #efefef;
  //box-shadow: 0 0 2px 0 gray;
  //border-left: 4px double black;
`

const ListContainer = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 0.25rem;
  background-color: black;
  opacity: 35%;
  position: absolute;
  z-index: 5;
`

const List = styled.select`
  margin: auto;
  border: 1px gray solid;
  padding: 1rem 0;
  border-radius: 0.5rem;
  border: 1px solid white;
  background-color: rgba(0,0,0,0.5);
  z-index: 10;
  font-size: medium;
  font-weight: 600;
  text-align: center;
  color: white;
  cursor: pointer;
`

const Option = styled.option`
  color: white;
`

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  position: absolute;
  border-radius: 0.25rem;
`

export default function ChickenOption(props) {
  function handleChange(event) {
    props.changeChicken(Chicken.find(i => i.key === event.target.value))
  }

  useEffect(() => {
    const selectedChicken = Chicken.find(i => i.key === props.chicken.key)
    if(selectedChicken) {
      props.changeChicken(selectedChicken)
    }
  }, [props.chicken])

  return (
    <Container>
        <TitleContainer style={{margin: '0'}}>
          <Title>Chicken</Title>
          <Required>Required</Required>
        </TitleContainer>
      <ImageContainer>
          <Image src={props.chicken.img}/>
          <ListContainer />
            <List value={props.chicken.key} onChange={handleChange}>
              {Chicken.map(chicken => {
                return chicken.key !== 'snowy' && chicken.key !== 'onion' ? <Option key={chicken.key} value={chicken.key}>{chicken.title} {chicken.key !== 'original' && chicken.key !== 'crispy' ? ` + $${props.half ? chicken.halfprice - 19 : chicken.fullprice - 35}.00` : ''}</Option> : null
              })}
            </List>
      </ImageContainer>
    </Container>
  )
}
