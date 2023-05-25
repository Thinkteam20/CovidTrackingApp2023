import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React from "react";
import numeral from "numeral";
import { CasesTypeColors } from "./casesTypeColors";
const casesTypeColors = CasesTypeColors();

//https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351?signin=true

// console.log(typeof casesTypeColors["cases"].hex);
export const sortData = (data) => {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        } else {
            return 1;
        }
    });
    return sortedData;
};

// data = countries prop from the map.
//console.log(country[casesType]); // TEST countries data obj.

export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country) => (
        <Circle
            key={country.country}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            color={casesTypeColors[casesType].hex}
            fillColor={casesTypeColors[casesType].hex}
            fillOpacity={0.4}
            radius={
                Math.sqrt(country[casesType]) *
                casesTypeColors[casesType].multiplier
            }
        >
            <Popup>
                <div className='info-container'>
                    <div
                        className='info-flag'
                        style={{
                            backgroundImage: `url(${country.countryInfo.flag})`,
                        }}
                    ></div>
                    <div className='info-name'>{country.country}</div>
                    <div className='info-confirmed'>
                        Cases: {numeral(country.cases).format("0,0")}
                    </div>
                    <div className='info-recovered'>
                        Recovered: {numeral(country.recovered).format("0,0")}
                    </div>
                    <div className='info-deaths'>
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

export const prettyPrintStat = (stat) =>
    stat ? `${numeral(stat).format("0.0a")}` : "+0";
