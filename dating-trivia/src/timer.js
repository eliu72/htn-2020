import React, { Component } from 'react'
export default class Timer extends Component {
    state = {
        seconds: 10,
        percentage: 100
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, percentage} = this.state

            if (seconds > 0) {
                this.setState(({ seconds, percentage }) => ({
                    seconds: seconds - 1,
                    percentage: percentage - 10
                }))
            }
            if (seconds === 0) {
                if (seconds === 0) {
                    clearInterval(this.myInterval)
                } 
            } 
        }, 1000)
    }
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }
    reset(){
        this.setState(({ seconds, percentage }) => ({
            seconds: 10,
            percentage: 100
        }))

    }
    
    render() {
        const {seconds,percentage} = this.state
        return (
            <div>
            <div style= {{backgroundColor:"white",height:"32px", zIndex:"1"}}></div>
            
            <div className ="timer-bar" style={{maxWidth: this.state.percentage+ '%',backgroundColor:"#71848A",height:"32px", marginTop:"-32px", zIndex:"5"}} >
            </div>
                <div style={{top:"-16px", position:"absolute",marginLeft:"16px", fontSize:"13px"}}>
                { seconds === 0
                    ? <h1>Done!</h1>
                    : <h1>{seconds}</h1>
                }
                </div>
            </div>
            
           

            
        )
    }
}