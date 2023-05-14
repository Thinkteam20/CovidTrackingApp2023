import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    CardContent,
    FormControl,
    MenuItem,
    Select,
    Card,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import { prettyPrintStat, sortData } from "./util/utils";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
//https://react-leaflet.js.org/docs/start-installation/
//https://yudhajitadhikary.medium.com/building-covid-19-tracker-using-react-dd6173d610d

function App() {
    const [loading, setLoading] = useState(false);
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
    const [test, setTest] = useState([]);

    const BASE_COVID_URL = "https://disease.sh/v3/covid-19";

    useEffect(() => {
        axios
            .get(`${BASE_COVID_URL}/all`) //
            .then((res) => res.data)
            .then((data) => setCountryInfo(data));
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            setLoading(true);
            await axios
                .get(`${BASE_COVID_URL}/countries`)
                .then((res) => res.data)
                .then((data) => {
                    const countries = data.map((country) => ({
                        name: country.country,
                        value: country.countryInfo.iso2,
                    }));
                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setMapCountries(data);
                    setCountries(countries);
                });
            setLoading(false);
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (event) => {
        const countryCode = event.target.value;
        console.log(countryCode);
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
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    return (
        <div className='App'>
            <div className='app_left'>
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
                        total={prettyPrintStat(countryInfo.cases)}
                    ></InfoBox>
                    <InfoBox
                        isRed={false}
                        active={casesType === "recovered"}
                        onClick={(e) => setCasesType("recovered")}
                        title='recovered'
                        total={prettyPrintStat(countryInfo.recovered)}
                    ></InfoBox>
                    <InfoBox
                        isRed={true}
                        active={casesType === "deaths"}
                        onClick={(e) => setCasesType("deaths")}
                        title='Deaths'
                        total={prettyPrintStat(countryInfo.deaths)}
                    ></InfoBox>
                </div>

                {/*Map*/}
                {/*Table*/}
                {/*Graph*/}

                <Map
                    loading={loading}
                    casesType={casesType}
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>

            <Card>
                <CardContent>
                    <h3>Live Content by Country</h3>
                    <Table countries={tableData}>
                        <h3 className='app_graphTitle'>Worldwide new</h3>
                        <LineGraph
                            className='app_graph'
                            casesType={casesType}
                        />
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
