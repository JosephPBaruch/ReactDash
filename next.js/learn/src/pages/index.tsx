import Head from 'next/head';
import React from 'react';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hit: false,
            ip: "IP Address", 
        };
    }

    handleClick = () => {
        this.setState({
            hit: true, 
        });
    }

    handleChange = (event) => {
        this.setState({
            hit: false,
            ip: event.target.value,
        });
    }
    doit(){
        console.log("hello");
    }

    render(){
        return (
            <>
                <Head>
                    <title>Learning React</title>
                </Head>
                <h1>Diagnostics</h1>
                <label>
                    <input
                        type="text"
                        value={this.state.ip} 
                        onChange={this.handleChange}
                    />
                    <button onClick={this.handleClick}>Ping</button>
                </label>
                {this.state.hit && this.state.ip} 
            </>
        );
    }
}

export default Home;