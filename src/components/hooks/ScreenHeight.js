import {useState, useEffect} from 'react'

export function ScreenHeight() {
    const [screenHeight, setScrenHeight] = useState(window.innerHeight)

    useEffect(() => {
        function handleResize() {
            setScrenHeight(window.innerHeight)
        }

        window.addEventListener('resize', handleResize)
    })
    return screenHeight;
}