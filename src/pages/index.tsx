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

    const container = {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gridGap: '10px'
      };
    
    const itemRight = {
        backgroundColor: 'grey',
        width: '50px',
        height: '10px',
        borderColor: "black",
        boarderWidth: "2px",
        padding: '10px',
        fontSize: '10px',
        textAlign: 'left',
        float: 'right',
    };
    const itemLeft = {
        backgroundColor: 'grey',
        width: '50px',
        height: '10px',
        borderColor: 'black',
        boarderWidth: "2px",
        padding: '10px',
        fontSize: '10px',
        textAlign: 'left',
        float: "left", 
        
    };
      const inputLeft = {
        backgroundColor: 'grey',
        width: '50px',
        height: '10px',
        borderColor: 'black',
        boarderWidth: "2px",
        fontSize: '10px',
        textAlign: 'left',
        float: "left", 
        padding: "0.2em", 
        boxSizing: "border-box",
        //width: "100%",
        
    };


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            hit: false,
            ip: "127.0.0.1",
            count: "3",
            timeout: "6", 
            retVal: "0",
            tcpHit: false,
            tcpIP: "127.0.0.1", 
            tcpCount: "3",
            tcpReturn: "Nothing",
        };
    }

    handleClick = () => {
        this.fetchIPPing();
    }
    handleTcpClick = () => {
        this.fetchTCP();
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
    handleTcpIP = (event) => {
        this.setState({
            tcpHit: false,
            tcpIP: event.target.value,
        });
    }
    handleTcpCount  = (event) => {
        this.setState({
            tcpHit: false,
            tcpCount: event.target.value,
        });
    }

    fetchIPPing = () => {
        fetch("http://localhost:8000/ping" + 
            "?ip=" + this.state.ip + 
            "&count=" + this.state.count + 
            "&timeout=" + this.state.timeout 
        )
            .then(res => {
                return res.json();
            }).then(data => {
                this.setState({
                    retVal: data, 
                    hit: true, 
                });
            });
    }

    fetchTCP = () => {
        fetch("http://localhost:8000/tcp" + 
            "?ip=" + this.state.tcpIP +
            "&count=" + this.state.tcpCount  
        )
            .then(res => {
                return res.json();
            }).then(data => {
                console.log(data);
                this.setState({
                    tcpReturn: data.id, 
                    tcpHit: true, 
                });
            });
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
                <div id="TCP" styles={side}>
                    <h2>TCP Check</h2>
                    <label style={labelStyles}>
                        <input
                            style={ipInput}
                            type="text"
                            value={this.state.tcpIP} 
                            onChange={this.handleTcpIP}
                        />
                    </label>
                    <label  style={labelStyles}>
                        <input
                            style={inp}
                            type="text"
                            value={this.state.tcpCount} 
                            onChange={this.handleTcpCount}
                        />
                    </label>
                    <button onClick={this.handleTcpClick}>Check</button>
                    {this.state.tcpHit && (<h1>{this.state.tcpReturn}</h1>)}
                    
                    <div style={{width: "180px"}}>
                        <div>
                            <label style={itemLeft}>IP</label>
                            <label style={itemRight} >Port</label>
                        </div>
                        <div>
                        <input style={inputLeft}></input>
                        <input style={itemRight}></input>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Home;