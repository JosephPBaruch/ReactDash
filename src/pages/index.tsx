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
        height: '5px',
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
        height: '5px',
        borderColor: 'black',
        boarderWidth: "2px",
        padding: '10px',
        fontSize: '10px',
        textAlign: 'left',
        float: "left", 
        
    };

    const itemCenter = {
        backgroundColor: 'grey',
        width: '50px',
        height: '5px',
        borderColor: "black",
        boarderWidth: "2px",
        padding: '10px',
        fontSize: '10px',
        textAlign: 'left',
        float: 'center',
    };
      const inputLeft = {
        backgroundColor: 'grey',
        //width: '50px',
        height: '20px',
        //borderColor: 'black',
        //boarderWidth: "1px",
        boarder: "none",
        fontSize: '10px',
        textAlign: 'left',
        float: "left", 
        padding: "0.2em", 
        boxSizing: "border-box",
        width: "100%",
       outline: "none",
        highlight: "red",
        //border: "2px solid #007bff", /* Change the border color to blue when focused */
        //outline: "none",
        
    };
    const inputRight = {
        backgroundColor: 'grey',
        //width: '50px',
        height: '20px',
        boarder: "none",
        //borderColor: 'black',
        //boarderWidth: "1px",
        fontSize: '10px',
        textAlign: 'left',
        float: "right", 
        padding: "0.2em", 
        boxSizing: "border-box",
        width: "100%",
        
    };

    const inputCenter = {
        backgroundColor: 'grey',
        //width: '50px',
        height: '20px',
        boarder: "none",
        //borderColor: 'black',
        //boarderWidth: "1px",
        fontSize: '10px',
        textAlign: 'left',
        float: "center", 
        padding: "0.2em", 
        boxSizing: "border-box",
        width: "100%",
        
    };

    const header = {
        backgroundColor: "#212F3C",
        textLeft: "2px",
        color: "#85929E",
        width: "200px", 
        height: "20px", 
        fontSize: "15px",
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
                <Head style={{backgroundColor: "#34495E"}}>
                    <title>Learning React</title>
                </Head>
                <h1>Diagnostics</h1>
                <div>
                    <div style={header}><h3 style={{paddingLeft: "3px"}}>Ping IP</h3></div>
                    <button onClick={this.handleClick} style={{float: "right"}}>Ping</button>
                    <div style={{width: "270px", paddingBottom:"20px", paddingTop:"5px", }}>
                        <div style={{width: "70px", float: "left"}}>
                            <div style={itemLeft}>IP</div>
                            <input type="text"
                            value={this.state.ip} 
                            onChange={this.handleIPChange}style={inputLeft}></input>
                        </div>
                        <div style={{width: "70px", float: "left"}}>
                         <label style={itemCenter} >Count</label>
                         <input 
                            type="text"
                            value={this.state.count} 
                            onChange={this.handleCountChange} style={inputCenter}></input>  
                        </div>
                        <div style={{width: "70px", float: "left"}}>
                         <label style={itemRight} >Timeout</label>
                         <input 
                            type="text"
                            value={this.state.timeout} 
                            onChange={this.handleTimeChange} style={inputRight}></input>  
                        </div>
                    </div>
                    <button onClick={this.handleClick}>Ping</button>
                    {this.state.hit && (<h1>{this.state.retVal}</h1>)}
                </div>
                <div>
                <div style={header}><h3 style={{paddingLeft: "3px"}}>TCP Check</h3></div>
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
                </div>
            </>
        );
    }
}

export default Home;