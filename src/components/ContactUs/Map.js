import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

const center = {
    lat: -36.74308098820962, 
    lng: 174.72512993552485
}

export default function Map(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCAa_4kgVNUOmkJxVv69TsAuBVbWdd_EIk'
    })

    const containerStyle = {
        width: 'auto',
        height: `${props.height}px`
    }
    
    if(!isLoaded) return "Loading Maps"
    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={18} 
            
        >
            <Marker position={center} />
        </GoogleMap>
    )

}
