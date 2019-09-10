import React from 'react';

const Table = ( { unknown, rows } ) => {
    return (
        <div className="tableContainer">
            <table>
                <thead>
                <tr>
                    {
                        unknown.map( (item, index) => <th key={index}>{capitalizeFirstLetter(item)}</th> )
                    }
                    <td>Result</td>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(rows).map((i) => (
                        <tr key={i}>
                            {
                                rows["" + i].map((item,index) => (
                                    <td key={index}>{item.toString()}</td>
                                ))
                            }
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default Table;
