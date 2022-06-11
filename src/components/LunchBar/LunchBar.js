import React from 'react'
import styled from 'styled-components'
import Item from '../Menu/Item'
import { Lunch } from '../Data'
import { CategoryTitle } from '../Menu/Menu'
import '../../App.css'

const Body = styled.div`
    position: relative;
    background-color: #DBDBDB;
`

const Container = styled.div`
    padding-top: 1rem;
    margin: auto;
    @media(min-width: 1200px) {
        width: 1200px;
    }
`

const ItemContainer = styled.div`
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

const InfoHeader = styled.div`
    height: 300px;
    width: 100%;
    background-color: lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
`

export default function LunchBar() {
  return (
    <Body className='Italic'>
        <InfoHeader>Infomation header [TODO]</InfoHeader>
        <Container>
            <CategoryTitle lunch>Meat Options</CategoryTitle>
            <ItemContainer>
                {Lunch.Chicken.map(item => {
                    return(
                        <Item 
                            img={item.img} 
                            title={item.title.toUpperCase()}
                            type="lunch"
                        />
                    )
                })}
            </ItemContainer>
            <CategoryTitle lunch>Salad Options</CategoryTitle>
            <ItemContainer>
                {Lunch.Salad.map(item => {
                    return(
                        <Item 
                            img={item.img} 
                            title={item.title.toUpperCase()}
                            type="lunch"
                        />
                    )
                })}
            </ItemContainer>
        </Container>
    </Body>  
  )
}
