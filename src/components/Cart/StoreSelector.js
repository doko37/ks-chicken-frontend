import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Body, Button, Footer } from '../Menu/Drawer/Drawer'
import { PinDrop, DateRange, AccessTime, Close, ArrowLeft } from '@material-ui/icons'
import moment from 'moment'
import './StoreSelector.css'
import { useDispatch, useSelector } from 'react-redux'
import { setPickupTime } from '../../features/user/userSlice'
import Loader from 'react-spinners/PulseLoader'

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
    color: ${props => props.available ? 'white' : 'gray'};
    text-decoration: ${props => props.available ? 'none' : 'line-through'};
    text-align: left;
    border-radius: 1rem;
    cursor: ${props => props.available ? 'pointer' : ''};

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

const LoaderCtn = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: fit-content;
    height: fit-content;
`

export default function StoreSelector(props) {
    const [boxState, setBoxState] = useState("default")
    const token = useSelector((store) => store.user.userToken)
    const pickupTime = useSelector((store) => store.user.sessionInfo.pickupTime)
    const numHalfs = useSelector((store) => store.user.cart.numHalfs)
    const dispatch = useDispatch()

    const changeDate = (date) => {
        setBoxState("default")
        if(date.split(' ')[0] !== pickupTime.split(' ')[0]) {
            console.log(date.split(' ')[0], pickupTime.split(' ')[0])
            dispatch(setPickupTime({time: moment(date).format('YYYY-MM-DD HH:mm')}))
            props.dateChanged(date)
        }
    }

    const changeTime = (time) => {
        setBoxState("default")
        dispatch(setPickupTime({time: moment(pickupTime).startOf('day').add(time).format('YYYY-MM-DD HH:mm')}))
    }

    useEffect(() => {
        if (props.ssState) {
            setBoxState("default")
        }
    }, [props.ssState])

    return (
        <Body active={props.ssState} className='drawer'>
            <CloseCtn>
                <Text style={{ margin: '0 0 0 1rem', fontSize: '22px' }}>PICK UP DETAILS</Text>
                <Close style={{ color: 'white', margin: '1rem', cursor: 'pointer' }} onClick={props.togglessState} />
            </CloseCtn>
            {pickupTime === moment().format('YYYY-MM-DD HH:mm') || pickupTime === null ? <LoaderCtn>
                    <Loader 
                        color="#ffffff"
                        loading={pickupTime === moment().format('YYYY-MM-DD HH:mm') || pickupTime === null}
                        size={15}
                    />
                </LoaderCtn> : boxState === "default" ? <div>
                <FlexCtn>
                    <PinDrop style={{ color: 'white' }} />
                    <div>
                        <Text>KS Chicken Rosedale</Text>
                        <Text>33B Triton Drive, Rosedale, 0632</Text>
                    </div>
                </FlexCtn>
                <Text style={{ fontSize: '16px', color: 'darkred', display: moment().day() === 0 || (moment().hour() < 11 || moment().hour() >= 20 || (moment().hour() === 19 && moment().minute() >= 50)) ? '' : 'none' }}>We are currently closed. Order for another time?</Text>
                <FlexCtn>
                    <DateRange style={{ color: 'white' }} />
                    <Text>{moment(pickupTime).format('dddd, MMM Do')}</Text>
                    <Text style={{ marginLeft: 'auto', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setBoxState("date")}>Change</Text>
                </FlexCtn>
                <FlexCtn>
                    <AccessTime style={{ color: 'white' }} />
                    {props.times[0] ? moment(pickupTime).format("H:mm") === props.times[props.asap.offset + props.asap.overload].time ? 
                        <Text>{"ASAP (" + moment(pickupTime).format("h:mm A") + ")"}</Text> : <Text>{moment(pickupTime).format("h:mm A")}</Text> :
                        <Loader color="#ffffff" loading={props.times.length === 0} size={8} style={{marginLeft: '1rem'}}/>}
                    <Text style={{ marginLeft: 'auto', textDecoration: 'underline', cursor: 'pointer' }} onClick={() => setBoxState("time")}>Change</Text>
                </FlexCtn>
                {!token ? <Footer active={props.ssState}>
                    <Button onClick={props.startOrder} style={{ width: '100%', padding: '0.5rem 0', marginLeft: '1rem', fontFamily: 'coffee_rg' }}>START ORDER</Button>
                </Footer> : null}
            </div> : boxState === "date" ? <div>
                <Text>WHAT DAY ARE YOU PICKING UP?</Text>
                <OptionCtn>
                    {props.dates.map(date => {
                        return (
                            <Option key={date} onClick={() => changeDate(date)} available={true}>{moment(date).format('dddd, MMM Do')}</Option>
                        )
                    })}
                </OptionCtn>
                <Back onClick={() => setBoxState("default")}>
                    <ArrowLeft />
                    <p>GO BACK</p>
                </Back>
            </div> : boxState === "time" ? <div>
                <Text style={{ paddingBottom: '0.5rem' }}>WHAT TIME ARE YOU PICKING UP?</Text>
                <Text style={{ fontSize: '14px', color: 'gray', display: numHalfs > 4 ? 'block' : 'none'}}>*Larger orders will take more time.</Text>
                <OptionCtn>
                    {props.times.length === 0 ? <LoaderCtn>
                        <Loader 
                        color="#ffffff"
                        loading={props.times.length === 0}
                        size={15}
                        />
                    </LoaderCtn> : props.times.map((time, i) => {
                        return (
                            <Option key={time.time} onClick={() => time.available ? changeTime(time.time) : null} available={time.available}>
                                {i === props.asap.offset + props.asap.overload ? "ASAP (" + moment().startOf('day').add(time.time).format('h:mm A') + ")" : moment().startOf('day').add(time.time).format('h:mm A')}
                            </Option>
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
