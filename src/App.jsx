import {
    Card,
    CardContent,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography
} from "@material-ui/core";
import { Alert, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import LineGraph from "./LineGraph";
import Map from "./Map";
import Table from "./Table";
import coronaImage from "./assets/image/Covid.png";
import { CasesTypeColors } from "./util/casesTypeColors";
import { prettyPrintStat, sortData } from "./util/utils";

//https://react-leaflet.js.org/docs/start-installation/
//https://yudhajitadhikary.medium.com/building-covid-19-tracker-using-react-dd6173d610d

function App() {
    const casesTypeColors = CasesTypeColors();
    const [countries, setCountries] = useState([]);
    const [countrySelect, setCountrySelect] = useState("worldwide");
    const [country, setCountry] = useState({});
    const [tableData, setTableData] = useState([]);
    const [mapCenter, setMapCenter] = useState([-20.2744, 153.7751]);
    const [mapZoom, setMapZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);
    const [casesType, setCasesType] = useState("cases");
    const all = "Worldwide";
    const BASE_COVID_URL = "https://disease.sh/v3/covid-19";
    const now = new Date().toLocaleString();

    function refreshPage() {
        window.location.reload(false);
    }
    console.log(country.todayDeaths)
    useEffect(() => {
        axios
            .get(`${BASE_COVID_URL}/all`) //
            .then((res) => res.data)
            .then((data) =>
                setCountry({
                    name: all,
                    todayCases: data.todayCases,
                    todayRecovered: data.todayRecovered,
                    todayDeaths: data.todayDeaths,
                    cases: data.cases,
                    recovered: data.recovered,
                    deaths: data.deaths,
                })
            );
    }, []);

    useEffect(() => {
        const getCountriesData = async () => {
            await axios
                .get(`${BASE_COVID_URL}/countries`)
                .then((res) => res.data)
                .then((data) => {
                    setCountries([
                        ...data.map((country) => ({
                            name: country.country,
                            cases: country.cases,
                        })),
                    ]);

                    const sortedData = sortData(data);
                    setTableData(sortedData);
                    setMapCountries(data);
                });
        };
        getCountriesData();
    }, []);

    const onCountryChange = async (e) => {
        const clickedCountry = e.target.value;
        const allParam = clickedCountry === "worldwide";
        await fetch(
            allParam
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${clickedCountry}`
        )
            .then((response) => response.json())
            .then((data) => {
                setCountry({
                    name: allParam ? all : data.country,
                    todayCases: data.todayCases,
                    todayRecovered: data.todayRecovered,
                    todayDeaths: data.todayDeaths,
                    cases: data.cases,
                    recovered: data.recovered,
                    deaths: data.deaths,
                });
                setCountrySelect(data.country);
                setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setMapZoom(4);
            });
    };

    return (
        <div className='app'>
            <div className='app_left'>
                <div style={{ marginBottom: '16px', padding: '8px' }}>
                    <Grid container style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                        <Grid item xs={12} md={5}>
                            <img src={coronaImage} alt='' className='image' />
                        </Grid>
                        <Grid item xs={12} md={5}>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <Alert severity='info' style={{ marginRight: '8px' }}>
                                    Last Updated at {now}
                                </Alert>
                                <Button
                                    variant='contained'
                                    color='success'
                                    onClick={refreshPage}
                                >
                                    REFRESH
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={2}>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    height: '100%'
                                }}
                            >
                                <FormControl className='app_dropdown' style={{ minWidth: '120px' }}>
                                    <Select
                                        variant='outlined'
                                        onChange={onCountryChange}
                                        value={countrySelect}
                                    >
                                        <MenuItem value='worldwide'>
                                            Worldwide
                                        </MenuItem>
                                        {countries.map((country, idx) => (
                                            <MenuItem
                                                key={idx} // Added key to avoid React warning
                                                value={country.name}
                                                style={{ color: '#1D4044', fontWeight: 400 }}
                                            >
                                                {country.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <InfoBox
                            country={country}
                            active={casesType === "cases"}
                            setCasesType={setCasesType}
                            casesType={"cases"}
                            color={casesTypeColors["cases"].hex}
                            title='Coronavirus cases'
                            total={prettyPrintStat(country.cases)}
                            todayData={country.todayCases}
                            isRed={true}
                        ></InfoBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {" "}
                        <InfoBox
                            active={casesType === "recovered"}
                            setCasesType={setCasesType}
                            casesType={"recovered"}
                            title='recovered'
                            total={prettyPrintStat(country.recovered)}
                            todayData={country.todayRecovered}
                            isGreen={true}
                        ></InfoBox>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        {" "}
                        <InfoBox
                            active={casesType === "deaths"}
                            setCasesType={setCasesType}
                            casesType={"deaths"}
                            title='Deaths'
                            total={prettyPrintStat(country.deaths)}
                            todayData={country.todayDeaths}
                            isBlack={true}
                        ></InfoBox>
                    </Grid>
                </Grid>

                {/*Map*/}
                {/*Table*/}
                {/*Graph*/}

                <Map
                    country={country}
                    countries={mapCountries}
                    casesType={casesType}
                    center={mapCenter}
                    zoom={mapZoom}
                />
            </div>
            <Card className='app_right'>
                <CardContent>
                    <div className='app_right_top'>
                        <Typography variant='h5'>
                            Live Content by Country
                        </Typography>
                        <Table countries={tableData}></Table>
                    </div>

                    <LineGraph className='app_graph' casesType={casesType} />
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
