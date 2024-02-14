import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//import { mSlides, slides } from '../Data'
import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons"

const Container = styled.div`
    width: 100%;
    height: ${props => props.mobileState ? window.innerWidth : (props => props.width / 3.5)}px;
    overflow: hidden;
    position: relative;
    display: flex;
    z-index: 10;
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 0.25em;
    background-color: white;
    opacity: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    top: 0;
    bottom: 0;
    position: absolute;
    right: ${props => props.pos === "right" && "10px"};
    left: ${props => props.pos === "left" && "10px"};
    cursor: pointer;
    z-index: 12;
`

const Wrapper = styled.div`
    display: flex;
    height: 100%;
    align-items: center;
    transition: all 0.25s ease;
    transform: translateX(${props => props.slideState * -100}vw);
    z-index: 10;
`

const Slide = styled.img`
    height: 100%;
    width: 100vw;
    object-fit: cover;
    z-index: 10;
`

export default function Slider() {
    const [mobileState, setMobileState] = useState(window.innerWidth < 700 ? true : false)
    const [slideState, setSlideState] = useState(0)
    const [currentLength, setCurrentLength] = useState(window.innerWidth)

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 700) {
                setMobileState(true)
            } else {
                setMobileState(false)
            }
            setCurrentLength(window.innerWidth)
        }
        window.addEventListener('resize', handleResize)
    })

    function handleClick(direction) {
        if (direction === "right") {
            setSlideState(slideState < (mSlides.length - 1) ? slideState + 1 : 0)
        } else {
            setSlideState(slideState > 0 ? slideState - 1 : (mSlides.length - 1))
        }
    }


    return (
        <Container mobileState={mobileState} width={currentLength}>
            <Arrow pos="left" onClick={() => handleClick("left")}>
                <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slideState={slideState}>
                {mobileState ? mSlides.map(slide => {
                    return (
                        <Slide src={slide.img} key={slide.key} />
                    )
                }) : slides.map(slide => {
                    return (
                        <Slide src={slide.img} key={slide.key} />
                    )
                })}
            </Wrapper>
            <Arrow pos="right" onClick={() => handleClick("right")}>
                <ArrowRightOutlined />
            </Arrow>
        </Container>
    )
}
