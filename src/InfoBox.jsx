import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./infoBox.css";
import { prettyPrintStat } from "./util/utils";

export default function InfoBox({
    title,
    cases,
    total,
    isRed,
    active,
    todayData,
    ...props
}) {
    // const changeColors = (cases) => {
    //     switch (cases) {
    //         case "recovered":
    //             return "";

    //         case "deaths":
    //             // code block
    //             break;
    //         default:
    //             "infoBox--red";
    //     }
    // };

    return (
        <Card
            onClick={props.onClick}
            className={`infoBox ${active && `infoBox--selected`} ${
                isRed && `infoBox--red`
            }`}
        >
            <CardContent>
                <Typography className='infoBox_title'>{title}</Typography>
                <h2
                    className={`infoBox_cases ${
                        !isRed && "infoBox__cases--green"
                    }`}
                >
                    {cases}
                </h2>
                <Typography color='textSecondary'>{total}Total</Typography>
                <Typography variant='h5'>
                    {prettyPrintStat(todayData)} Today
                </Typography>
            </CardContent>
        </Card>
    );
}
