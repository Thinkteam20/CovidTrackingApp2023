import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { FormControl, MenuItem, Select } from "@material-ui/core";
import InfoBox from "./InfoBox";

function App() {
    const [loading, isLoading] = useState("false");
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("worldwide");
    const [countryInfo, setCountryInfo] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState({
        lat: 34.80746,
        lng: -40.4796,
    });
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");

    const BASE_COVID_URL = "https://disease.sh/v3/covid-19";

    useEffect(() => {
        axios
            .get(`${BASE_COVID_URL}/all`) //
            .then((res) => res.data)
            .then((data) => setCountryInfo(data));
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            isLoading(true);
            await axios
                .get(`${BASE_COVID_URL}/countries`)
                .then((res) => res.data)
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    // const sortedData = sortData(data);
                    // setTableData(sortedData);
                    setMapCountries(data);
                    setCountries(countries);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        setCountry(countryCode);
        const url =
            countryCode === "worldwide"
                ? `${BASE_COVID_URL}/all`
                : `${BASE_COVID_URL}/countries/${countryCode}`;
        await axios(url) //
            .then((res) => res.data) //
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);
                // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    return (
        <div className='App'>
            <div className='app_left'></div>
            <div className='app_header'>
                <h1>COVID-19 TRACKER</h1>
                <FormControl className='app_dropdown'>
                    <Select
                        variant='outlined'
                        onChange={onCountryChange}
                        value={country}
                    >
                        <MenuItem value='worldwide'>Worldwide</MenuItem>
                        {countries.map((country, idx) => (
                            <MenuItem value={country.value} key={idx}>
                                {country.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
            <div className='app_stats'>
                <InfoBox
                    isRed={true}
                    active={casesType === "cases"}
                    onClick={(e) => setCasesType("cases")}
                    title='Coronavirus cases'
                    total='5'
                ></InfoBox>
            </div>
        </div>
    );
}

export default App;
