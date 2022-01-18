import {useState, useEffect} from 'react'

export function MobileState() {
    const [mobileState, setMobileState] = useState(window.innerWidth < 700 ? true : false)

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < 700) {
                setMobileState(true)
            } else {
                setMobileState(false)
            }
        }

        window.addEventListener('resize', handleResize)
    })
    return mobileState;
}
