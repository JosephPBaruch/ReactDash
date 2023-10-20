import Head from 'next/head';
import React from 'react';

    const side = {
        display: 'flex',
    };

    const labelStyles = {
      marginBottom: '10px', // Add spacing between labels
    };

    const ipInput = {
        width: '100px',
    };

    const inp = {
        width: '50px',
    };

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hit: false,
            ip: "IP Address",
            count: 'Count',
            timeout: "Timeout", 
            retVal: "0",
        };
    }

    handleClick = () => {
        this.setState({
            hit: true, 
        });
        this.fetchIPPing();
    }

    handleIPChange = (event) => {
        this.setState({
            hit: false,
            ip: event.target.value,
        });
    }
    handleCountChange = (event) => {
        this.setState({
            hit: false,
            count: event.target.value,
        });
    }
    handleTimeChange = (event) => {
        this.setState({
            hit: false,
            timeout: event.target.value,
        });
    }

    fetchIPPing = () => {
        console.log("Hello")
        fetch("http://localhost:8000")
            .then(res => res.json())
            .then( data => console.log(data));
    }

    render(){
        return (
            <>
                <Head>
                    <title>Learning React</title>
                </Head>
                <h1>Diagnostics</h1>
                <div id="pingIP" styles={side}>
                    <h2>Ping IP</h2>
                    <label style={labelStyles}>
                        <input
                            style={ipInput}
                            type="text"
                            value={this.state.ip} 
                            onChange={this.handleIPChange}
                        />
                    </label>
                    <label  style={labelStyles}>
                        <input
                            style={inp}
                            type="text"
                            value={this.state.count} 
                            onChange={this.handleCountChange}
                        />
                    </label>
                    <label  style={labelStyles}>
                        <input
                            style={inp}
                            type="text"
                            value={this.state.timeout} 
                            onChange={this.handleTimeChange}
                        />
                    </label>
                    <button onClick={this.handleClick}>Ping</button>
                    {this.state.hit && (<h1>{this.state.retVal}</h1>)}
                </div>
            </>
        );
    }
}

export default Home;