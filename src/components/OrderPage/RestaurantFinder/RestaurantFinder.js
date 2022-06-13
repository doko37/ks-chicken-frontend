import React, { useState } from 'react'
import styled from 'styled-components'
import { PinDrop, Close, AccessTime } from '@material-ui/icons'

const Body = styled.div`
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    left: ${props => props.set ? 0 : '100%'};
    transition: left 0.25s ease-in-out;
    box-shadow: 0 0 4px 0 gray;
    z-index: 100;
`

const TopBar = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    box-shadow: 0 0 4px 0 gray;
`

const Header = styled.h3`
    text-align: left;
    font-size: 16px;
    margin: 1rem;
`

const RestaurantListCtn = styled.div`
    margin: 1rem;
`

const Restaurant = styled.div`
    display: flex;
    justify-content: start;
    align-items: center;
    background-color: white;
    border-radius: 0.25rem;
    transition: 0.3s;
    cursor: pointer;

    &:active {
        background-color: #efefef;
    }

    &:hover {
        background-color: #efefef;
    }
`

const ResDetails = styled.div`
    margin-left: 0.5rem;
`

const ResText = styled.p`
    text-align: start;
    font-size: ${props => props.header ? '16px' : '14px'};
    font-weight: ${props => props.header ? '600' : '300'};;
    margin: 0.5rem 0;
`

const Hours = styled.p`
    text-align: start;
    font-size: 12px;
    color: gray;
    margin: 0.5rem 0;
`

export const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid lightgray;
    margin: 0.25rem 0;

    &:nth-last-child() {
        display: none;
    }
`

const TimeCtn = styled.div`
    margin: 1rem;
    text-align: left;
    display: flex;
    align-items: center;
`

const TimeList = styled.select`
    margin-left: 0.5rem;
    padding: 0.5rem;
    width: 100%;
`

const Option = styled.option`
    padding: 0.5rem;
`

const BottomBar = styled.div`
    width: 100%;
    position: absolute;
    bottom: 0;
`

const BtnWrapper = styled.div`
    margin: 1rem;
`

const Btn = styled.button`
    background-color: #cf8334;
    width: 100%;
    height: 40px;
    border: none;
    color: white;
    border-radius: 0.25rem;
`

const Checkbox = styled.input`
    margin-left: auto;
    margin-right: 0.5rem;
`

export default function RestaurantFinder(props) {
    const [restaurant, setRestaurant] = useState("")

    function handleChange(id) {
        setRestaurant(id)
    }
  return (
    <Body set={props.set}>
        <TopBar>
            <h4 style={{margin: '0'}}>Order Details</h4>
            <Close onClick={props.toggleFinder} style={{cursor: 'pointer'}}/>
        </TopBar>
        <Header>Pick up from</Header>
        <RestaurantListCtn>
            <Restaurant onClick={() => handleChange("rosedale")}>
                <PinDrop />
                <ResDetails>
                    <ResText header>Rosedale</ResText>
                    <ResText>33b Triton Drive, Rosedale, Auckland</ResText>
                    <Hours>Closed, opens at 11:00AM</Hours>
                </ResDetails>
                <Checkbox type="radio" checked={restaurant === "rosedale"} onChange={() => handleChange("rosedale")}/>
            </Restaurant>
            <Divider />
            <Restaurant onClick={() => handleChange("glenfield")}>
                <PinDrop />
                <ResDetails>
                    <ResText header>Glenfield</ResText>
                    <ResText>40/48 Downing Street, Glenfield, Auckland</ResText>
                    <Hours>Closed, opens at 11:00AM</Hours>
                </ResDetails>
                <Checkbox type="radio" checked={restaurant === "glenfield"} onChange={() => handleChange("glenfield")}/>
            </Restaurant>
        </RestaurantListCtn>
        <Header>Time</Header>
        <TimeCtn>
            <AccessTime />
            <TimeList>
                <Option>As soon as possible</Option>
                <Option>11:00AM</Option>
            </TimeList>
        </TimeCtn>
        <BottomBar>
            <BtnWrapper>
                <Btn>Save and continue</Btn>
            </BtnWrapper>
        </BottomBar>
    </Body>
  )
}
