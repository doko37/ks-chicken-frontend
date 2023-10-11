import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Done, AccessTime as Time, DateRange as Date } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import publicRequest from '../../api/requestMethod'
import { Button } from '../Menu/Drawer/Drawer'
import '../../App.css'
import { resetUser } from '../../features/user/userSlice'
import { MobileState } from '../hooks/MobileState'

const Ctn = styled.div`
    background-color: #252425;
    z-index: 50;
    padding: 1rem 0;
    position: relative;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    color: white;
    font-size: ${props => props.top ? 'xx-large' : 'x-large'};

    @media(min-width: 700px) {
        font-size: ${props => props.top ? 'xxx-large' : 'xx-large'};
    }
`

export default function Success(props) {
    const [orderExists, setOrderExists] = useState("loading")
    const orderInfo = JSON.parse(localStorage.getItem('order'))
    const dispatch = useDispatch()
    const mState = MobileState()

    useEffect(() => {
        const getOrder = async () => {
            try {
                console.log(orderInfo.orderNo)
                const order = await publicRequest.get(`/order/orderExists/${orderInfo.orderNo}`)
                console.log(order.data)
                setOrderExists(order.data.orderExists)
                dispatch(resetUser())
            } catch(err) { 
                console.log("Order not found") 
                setOrderExists(false)
            }

        }

        if(orderInfo) {
            setTimeout(function() {
                getOrder()
            }, 2000)
        } else {
            setOrderExists(false)
        } 
    }, [])

  return (
    <Ctn>
        <div style={{padding: '1.5rem', margin: '1rem'}}>
            { orderExists === "loading" ? <Text>Loading...</Text> : orderExists ?
            <div>
                <Done style={{color: 'green', fontSize: '46px', border: '3px solid green', borderRadius: '100%'}}/>
                <Text top style={{fontFamily: 'coffee_rg_it'}}>Order successful!</Text>
                <div style={{fontFamily: 'coffee_rg'}}>
                    <Text>Your order # is {orderInfo.orderNo}</Text>
                    <Text>A confirmation email has been sent to: <span style={{textDecoration: 'underline'}}>{orderInfo.email}</span></Text>
                    <Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '0.5rem'}}>
                        <span style={{marginRight: '0.25rem', height: 'min-content', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Time style={{fontSize: mState ? '26px' : '32px'}}/></span>{moment().startOf('d').add(orderInfo.pickupTime).format("h:mm a")}
                    </Text>
                    <Text style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0.5rem'}}>
                        <span style={{marginRight: '0.25rem', height: 'min-content', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><Date style={{fontSize: mState ? '26px' : '32px'}}/></span>{moment(orderInfo.pickupDate).format('dddd, MMM Do')}
                    </Text>
                </div>
                <Button style={{width: 'fit-content', padding: '0.5rem', margin: '1.5rem auto', marginTop: '3rem', borderRadius: '1rem'}}>
                    <a href="/" style={{textDecoration: 'none', color: 'white', height: '100%', width: '100%', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '3rem', fontFamily: 'coffee_rg'}}>
                        Back to Home Page
                    </a>
                </Button>
            </div> : <div>
                    <Text>Invalid session</Text>
                    <Button style={{width: 'fit-content', padding: '0.5rem', margin: '1.5rem auto'}}>
                        <a href="/" style={{textDecoration: 'none', color: 'white', height: '100%', width: '100%', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '2rem', fontFamily: 'coffee_rg'}}>
                            Back to Home Page
                        </a>
                    </Button>
                </div>
            }
        </div>
    </Ctn>
  )
}
