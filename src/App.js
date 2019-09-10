import React from 'react';
import Input from "./components/Input";
import Table from "./components/Table";
import './App.css';

class App extends React.Component {
    state = {
        shouldDisplay: false
    };

    handleSubmit = ( { amount, equation } ) => {
        // Get Hide Table
        this.setState( {
            shouldDisplay: false
        }, () => {

            // Cal T and F Values
            let data = {};
            const row = 2 ** amount;

            for ( let i = 1; i <= amount; i++ ) {
                const repeatNum = row / 2 ** i;
                let arr = [];
                let addTrue = true;

                while ( arr.length !== row ) {
                    for ( let time = 0; time < repeatNum; time++ ) {
                        arr.push( addTrue );
                    }
                    addTrue = !addTrue;
                }
                data[i] = arr;
            }

            // Fix Formatting.
            const rows = {};

            Object.values( data ).forEach( ( item, index ) => {
                item.forEach( ( bool, index ) => {
                    if ( rows[index + 1] ) {
                        rows[index + 1].push( item[index] );
                    } else {
                        rows[index + 1] = [item[index]];
                    }
                } )
            } );

            // Add Result
            Object.values( rows ).forEach( ( arr ) => {

                // Replace Variables
                let coped = equation.repeat( 1 );
                for ( let i = 1; i <= amount; i++ ) {
                    const str = 'v' + i;
                    coped = coped.replaceAll( str, arr[i - 1] );
                }

                // Replace Operators
                coped = coped.replaceAll( 'and', '&&' );
                coped = coped.replaceAll( 'or', '||' );
                coped = coped.replaceAll( 'not', '!' );

                // Get result
                // eslint-disable-next-line
                const final = eval( coped );
                arr.push( final );
            } );

            // Allow Display
            this.setState( {
                rows,
                data,
                shouldDisplay: true
            } )

        } );
    };

    render() {
        return (
            <div className="flex-container">
                <div className="content">
                    <Input handleSubmit={this.handleSubmit}/>
                    {
                        this.state.shouldDisplay ? (
                            <Table data={this.state.data} rows={this.state.rows}/>
                        ) : ""
                    }
                </div>
                <div className="help-container">
                    <h1>Help</h1>
                    <p>Input the Amount of Unknown Variables on the top.</p>
                    <p>Input the equation of the bottom.</p>
                    <p>Where v1 is the first variable, v2 second.</p>

                    <h3>Example</h3>
                    <p>Top: 2</p>
                    <p>Bottom: v1 and v2</p>
                </div>
            </div>
        );
    }

}

// eslint-disable-next-line
String.prototype.replaceAll = function ( search, replacement ) {
    var target = this;
    return target.replace( new RegExp( search, 'g' ), replacement );
};

export default App;
