import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [loading, isLoading] = useState("false");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setCountyData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    useEffect(() => {
        axios
            .get("https://disease.sh/v3/covid-19/all") //
            .then((response) => setCountryInfo(response));
    }, []);

    useEffect(() => {
        isLoading(true);
        const getCountriesData = async () => {
            await axios
                .get("https://disease.sh/v3/covid-19/countries") //
                .then((response) => console.log(response));
        };
        isLoading(false);
        getCountriesData();
    }, []);

    return (
        <div className='App'>
            <h1>Covid Tracking App</h1>
        </div>
    );
}

export default App;
