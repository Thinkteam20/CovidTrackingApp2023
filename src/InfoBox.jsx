import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./infoBox.css";
import { prettyPrintStat } from "./util/utils";

export default function InfoBox({
    title,
    cases,
    total,
    isRed,
    isGreen,
    isBlack,
    color,
    active,
    todayData,
    casesType,
    setCasesType,
    country,
    ...props
}) {
    console.log(country);
    return (
        <Card
            onClick={(e) => setCasesType(casesType)}
            className={`infoBox ${active && `infoBox--selected`} ${
                isRed && `infoBox--red`
            } ${isGreen && `infoBox--green`}  ${isBlack && `infoBox--black`}`}
        >
            <CardContent>
                <Typography className='infoBox_title'>{title}</Typography>
                <Typography variant='h5'>
                    {prettyPrintStat(todayData)} Today
                </Typography>

                <Typography color='textSecondary'>{total}Total</Typography>
            </CardContent>
        </Card>
    );
}
