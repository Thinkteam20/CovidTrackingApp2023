import React from "react";
import "./table.css";
import numeral from "numeral";

export default function Table({ countries }) {
    return (
        <table className='table'>
            <tbody>
                {countries.map(({ country, cases }, idx) => (
                    <tr key={idx}>
                        <td>{country}</td>
                        <td>
                            <strong>{numeral(cases).format()}</strong>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
