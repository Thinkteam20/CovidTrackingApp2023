import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem) {
                return numeral(tooltipItem).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "11",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    //Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildchartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date],
            };
        }
        lastDataPoint = data[casesType][date];
    }
    return chartData;
};

export default function LineGraph({ casesType }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch(
                "https://disease.sh/v3/covid-19/historical/all?lastdays=120"
            )
                .then((res) => res.data)
                .then((data) => {
                    let chartData = buildchartData(data, casesType);
                    setData(chartData);
                    // console.log(chartData);
                });
        };
        fetchData();
    }, [casesType]);

    return (
        <div>
            {data?.length > 0 && (
                <Line
                    data={{
                        datasets: {
                            backgroundColor: "rgba(204,16,52,0.5)",
                            borderColor: "#CC1034",
                            data: data,
                        },
                    }}
                    options={options}
                />
            )}
        </div>
    );
}
