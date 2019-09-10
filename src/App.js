import React from 'react';
import Input from "./components/Input";
import Table from "./components/Table";
import './App.css';

const initialState = {
    shouldDisplay: false,
    error: false,
    equation: undefined,
    unknown: undefined,
    rows: undefined
};

class App extends React.Component {
    state = initialState;

    handleSubmit = ( { equation } ) => {
        // REGEX for unknown
        const re = /\b(?!(and|or|not)\b)\w+/gi;
        const unknown = [...new Set(equation.match(re))];

        const amount = unknown.length;

        // Get Hide Table
        this.setState( {
            shouldDisplay: false,
            equation,
            unknown
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
                    const str = unknown[i-1];
                    coped = coped.replaceAll( str, arr[i - 1]);
                }

                // Replace Operators
                coped = coped.replaceAll( 'AND', '&&' );
                coped = coped.replaceAll( 'OR', '||' );
                coped = coped.replaceAll( 'NOT', '!' );

                // Get result
                // eslint-disable-next-line
                let final;
                try {
                    // eslint-disable-next-line
                    final = eval( coped );
                    arr.push( final );


                    // Allow Display
                    this.setState( {
                        rows,
                        shouldDisplay: true,
                        error: false
                    } )

                } catch (e) {
                    this.reset();
                    this.setState({
                        error: true
                    });
                    return 0;
                }
            } );
        } );
    };

    reset = () => {
        this.setState(initialState);
    };

    render() {
        return (
            <div className="flex-container">
                <div className="content">
                    <Input handleSubmit={this.handleSubmit}/>
                    <h2>{this.state.equation}</h2>
                    {
                        this.state.error ? (
                            <h3>Please check the format of your equation.</h3>
                        ) : ""
                    }
                    {
                        this.state.shouldDisplay ? (
                            <Table unknown={this.state.unknown} rows={this.state.rows}/>
                        ) : ""
                    }
                </div>
                <div className="help-container">
                    <h1>Help</h1>
                    <p>Input the equation in the input</p>
                    <p>Operators:</p>
                    <p>And, Or, Not (case-insensitive)</p>

                    <h3>Example to try out</h3>
                    <code>variable1 and variable2</code>
                    <br />
                    <code>(variable1 or variable2) and not variable2</code>
                    <br />
                    <code>(not variable3 and variable2) and not(variable2 or not variable1)</code>
                </div>
            </div>
        );
    }

}

// eslint-disable-next-line
String.prototype.replaceAll = function ( search, replacement ) {
    var target = this;
    const reg = new RegExp( '\\b' + search + '\\b', 'gi');
    return target.replace( reg, replacement );
};

export default App;
