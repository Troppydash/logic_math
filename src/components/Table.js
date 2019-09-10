import React from 'react';

const Table = ( { data, rows } ) => {
    return (
        <div className="tableContainer">
            <table>
                <thead>
                <tr>
                    {
                        Object.keys( data ).map( i => <th key={i}>{"Variable" + i}</th> )
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

export default Table;
