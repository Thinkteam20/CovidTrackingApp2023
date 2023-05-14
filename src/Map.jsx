import React, { useEffect, useState } from "react";
import "./map.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    SVGOverlay,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { showDataOnMap } from "./util/utils.js";

export default function Map({ countries, casesType, loading, center, zoom }) {
    // const [countries, setCountries] = useState([]);
    // const [casesType, setCasesType] = useState("cases");
    // useEffect(() => {
    //     const getCountriesData = async () => {
    //         setLoading(true);
    //         await fetch("https://disease.sh/v3/covid-19/countries")
    //             .then((response) => response.json())
    //             .then((data) => setCountries(data));
    //         setLoading(false);
    //     };
    //     getCountriesData();
    // }, []);

    const position = [51.505, -0.09];
    const bounds = [
        [51.49, -0.08],
        [51.5, -0.06],
    ];
    return (
        <div className='map'>
            <MapContainer center={position} zoom={zoom} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                {showDataOnMap(countries, casesType)}
                {/* <SVGOverlay attributes={{ stroke: "red" }} bounds={bounds}>
                    <rect x='0' y='0' width='100%' height='100%' fill='blue' />
                    <circle r='5' cx='10' cy='10' fill='red' />
                    <text x='50%' y='50%' stroke='white'>
                        text
                    </text>
                </SVGOverlay> */}
            </MapContainer>
        </div>
    );
}
