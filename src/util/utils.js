import { Circle, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React from "react";
import numeral from "numeral";

//https://dev.to/tsaxena4k/integrating-next-js-with-leaflet-js-mapbox-1351?signin=true

const casesTypeColors = {
    cases: {
        hex: "#CC1034",
        multiplier: 800,
    },
    recovered: {
        hex: "#7dd71d",
        multiplier: 1200,
    },
    deaths: {
        hex: "#fb4443",
        multiplier: 2000,
    },
};
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

export const showDataOnMap = (data, casesType = "cases") =>
    data.map((country, idx) => (
        <Circle
            key={idx}
            center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            pathOptions={{ color: "red" }}
            radius={20}
        >
            <Popup>
                <div className='info-container'></div>
                <div
                    className='info-flag'
                    style={{
                        backgroundImage: `url(${country.countryInfo.flag})`,
                    }}
                >
                    <div className='info-name'>{country.country}</div>
                    <div className='info-confirm'>
                        Cases:{numeral(country.cases).format("0,0")}
                    </div>
                    <div className='info-recovered'>
                        Recovered:{numeral(country.recovered).format("0,0")}
                    </div>
                    <div className='info-deaths'>
                        Deaths: {numeral(country.deaths).format("0,0")}
                    </div>
                </div>
            </Popup>
        </Circle>
    ));

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0,0a")}` : "+0";
