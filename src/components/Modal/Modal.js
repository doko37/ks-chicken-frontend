import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Close } from '@material-ui/icons'
import '../../App.css'

const Ctn = styled.div`
    height: 50px;
    width: fit-content;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 1rem auto;
    border-radius: 1rem;
    background-color: #201e1f;
    box-shadow: 0px 0px 4px 1px black;
    color: white;
    z-index: ${props => props.active ? 50 : -1};
    display: flex;
    opacity: ${props => props.active ? '100%' : '0%'};
    transition: opacity 0.5s ease;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    @media(min-width: 700px) {
        height: 60px;
    }
`

export default function Modal(props) {
    const [item, setItem] = useState(null)

    useEffect(() => {
        if(props.modalState !== null) {
            setItem(props.modalState)
            const timeoutID = setTimeout(() => {
                    props.toggleModalState()
            }, 3000)

            return () => {
                clearTimeout(timeoutID)
            }
        }

    }, [props.modalState])

    return (
        <Ctn id="Ctn" active={props.modalState}>
            {item ? props.mode === "add" ? 
                <p>ADDED <span style={{textDecoration: 'underline'}}>{item.name.toUpperCase()}</span> TO CART</p> : props.mode === "remove" ? 
                <p>REMOVED {item.name.toUpperCase()} FROM CART</p> : props.mode === "edit" ?
                <p>ITEM {item.name.toUpperCase()} HAS BEEN CHANGED</p> : null : null}
            <Close style={{cursor: 'pointer', marginLeft: '1rem'}} onClick={() => props.toggleModalState()}/>
        </Ctn>
    )
}
