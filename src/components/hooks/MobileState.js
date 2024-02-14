import {useState, useEffect} from 'react'

export function MobileState(lunch=false) {
    const width = lunch ? 980 : 700
    const [mobileState, setMobileState] = useState((window.innerWidth < width) ? true : false)

    useEffect(() => {
        function handleResize() {
            if(window.innerWidth < width) {
                setMobileState(true)
            } else {
                setMobileState(false)
            }
        }

        window.addEventListener('resize', handleResize)
    })
    
    return mobileState;
}
