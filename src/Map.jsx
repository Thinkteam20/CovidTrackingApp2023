import React from "react";
import "./map.css";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { showDataOnMap } from "./util/utils.js";

export default function Map({ countries, casesType, center, zoom, country }) {
    console.log(country);
    return (
        <div className='map'>
            <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    );
}
