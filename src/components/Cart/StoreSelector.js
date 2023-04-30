import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Body, Button, Footer } from '../Menu/Drawer/Drawer'
import { PinDrop, DateRange, AccessTime, Close, ArrowLeft } from '@material-ui/icons'
import moment from 'moment'
import './StoreSelector.css'

const CloseCtn = styled.div`
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FlexCtn = styled.div`
    margin: 1rem;
    padding: 1rem;
    background-color: rgba(0,0,0,0.2);
    border-radius: 1rem;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: start;
`

const Text = styled.p`
    color: white;
    text-align: left;
    margin: 0;
    margin-left: 1rem;
`

const OptionCtn = styled.div`
    max-height: ${window.innerHeight - 162}px;
    overflow: auto;
`

const Option = styled.p`
    margin: 0.5rem 1rem;
    padding: 1rem;
    color: white;
    text-align: left;
    border-radius: 1rem;
    cursor: pointer;

    &:active {
        background-color: rgba(0,0,0,0.2);
    }

    &:hover {
        background-color: rgba(0,0,0,0.2);
    }
`

const Back = styled.div`
    height: 30px;
    padding: 0.5rem 1rem;
    margin: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 2rem;
    font-size: 20px;
    color: white;
    background-color: rgba(0,0,0,0.3);
    cursor: pointer;

    @media(min-width: 700px) {
        font-size: 26px;
    }
`

export default function StoreSelector(props) {
    const [date, setDate] = useState(props.dates[0])
    const [boxState, setBoxState] = useState("default")

    const changeDate = (date) => {
        setBoxState("default")
        props.setDate(date)
    }

    const changeTime = (time) => {
        setBoxState("default")
        props.setTime(time)
    }

    useEffect(() => {
        if (props.ssState) {
            setBoxState("default")
        }
    }, [props.ssState])

    useEffect(() => {
        setDate(props.dates[0])
    }, [props.dates])

    return (
        <Body active={props.ssState} className='drawer'>
            <CloseCtn>
                <Text style={{ margin: '0 0 0 1rem', fontSize: '22px' }}>PICK UP DETAILS</Text>
                <Close style={{ color: 'white', margin: '1rem', cursor: 'pointer' }} onClick={props.togglessState} />
            </CloseCtn>
            {boxState === "default" ? <div>
                <FlexCtn>
                    <PinDrop style={{ color: 'white' }} />
                    <div>
                        <Text>KS Chicken Rosedale</Text>
                        <Text>33B Triton Drive, Rosedale, 0632</Text>
                    </div>
                </FlexCtn>
                <FlexCtn>
                    <DateRange style={{ color: 'white' }} />
                    <Text>{moment(props.pickupInfo.date).format('dddd, MMM Do')}</Text>
                    <Text style={{ marginLeft: 'auto', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setBoxState("date")}>Change</Text>
                </FlexCtn>
                <FlexCtn>
                    <AccessTime style={{ color: 'white' }} />
                    <Text>{moment(props.pickupInfo.time).format('h:mm A')}</Text>
                    <Text style={{ marginLeft: 'auto', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setBoxState("time")}>Change</Text>
                </FlexCtn>
                {!props.token ? <Footer active={props.ssState}>
                    <Button onClick={props.startOrder} style={{ width: '100%', padding: '0.25rem 0', marginLeft: '1rem' }}>START ORDER</Button>
                </Footer> : null}
            </div> : boxState === "date" ? <div>
                <Text>WHAT DAY ARE YOU PICKING UP?</Text>
                <OptionCtn>
                    {props.dates.map(date => {
                        return (
                            <Option key={date} onClick={() => changeDate(date)}>{moment(date).format('dddd, MMM Do')}</Option>
                        )
                    })}
                </OptionCtn>
                <Back onClick={() => setBoxState("default")}>
                    <ArrowLeft />
                    <p>GO BACK</p>
                </Back>
            </div> : boxState === "time" ? <div>
                <Text style={{ paddingBottom: '0.5rem' }}>WHAT TIME ARE YOU PICKING UP?</Text>
                <OptionCtn>
                    {props.times.map(time => {
                        return (
                            <Option key={time} onClick={() => changeTime(time)}>{moment(time).format('h:mm A')}</Option>
                        )
                    })}
                </OptionCtn>
                <Back onClick={() => setBoxState("default")}>
                    <ArrowLeft />
                    <p>GO BACK</p>
                </Back>
            </div> : null}
        </Body>
    )
}
