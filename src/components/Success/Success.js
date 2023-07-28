import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { Done } from '@material-ui/icons'
import { useSelector } from 'react-redux'
import moment from 'moment'
import publicRequest from '../../api/requestMethod'
import { Button } from '../Menu/Drawer/Drawer'

const Ctn = styled.div`
    background-color: #252425;
    z-index: 50;
    padding: 1rem 0;
    position: relative;
    height: ${window.innerHeight - 350}px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Text = styled.p`
    color: white;
    font-size: ${props => props.top ? 'x-large' : 'large'};

    @media(min-width: 700px) {
        font-size: ${props => props.top ? 'xx-large' : 'x-large'};
    }
`

export default function Success(props) {
    const [orderExists, setOrderExists] = useState("loading")
    const order = JSON.parse(localStorage.getItem('order'))

    let orderNo
    if (order) {
        orderNo = moment(order.pickupTime).format('MMDD') + order.userId.substring(order.userId.length - 4)
    }

    useEffect(() => {
        const getOrder = async () => {
            try {
                console.log(orderNo)
                const order = await publicRequest.get(`/order/orderExists/${orderNo}`)
                console.log(order.data)
                setOrderExists(order.data.orderExists)
            } catch(err) { console.log("Order not found") }

        }

        if(orderNo) setTimeout(function() {
            getOrder()
        }, 1000)
    }, [])

  return (
    <Ctn>
        <div style={{border: orderExists !== "loading" ? 'solid white 2px' : 'none', borderRadius: '1rem', padding: '1.5rem', margin: '0 1rem'}}>
            { orderExists === "loading" ? <Text>Loading...</Text> : orderExists ?
            <div>
                <Done style={{color: 'white', fontSize: '36px', border: '3px solid white', borderRadius: '100%'}}/>
                <Text top>Order successful!</Text> 
                <Text>Your order # is {orderNo}</Text>
                <Text>A confirmation email has been sent to: <span style={{textDecoration: 'underline'}}>{order.email}</span></Text>
                <Text><span>Your pickup time is:</span> {moment(order.pickupTime).format("h:mm a")}<br/>{moment(order.pickupTime).format('dddd, MMM Do')}</Text>
            </div> : <Text>Invalid session</Text>
            }
            <Button style={{width: 'fit-content', padding: '0.5rem 0', margin: '1rem auto'}}>
                <a href="/" style={{textDecoration: 'none', color: 'white', height: '100%', width: '100%', display: 'flex', alignItems: 'center', padding: '0.5rem 1rem', borderRadius: '2rem'}}>
                    Back to Home Page
                </a>
            </Button>
        </div>
    </Ctn>
  )
}
