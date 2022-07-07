import React, { useState, useEffect } from 'react'
import Clock from 'react-clock'
import 'react-clock/dist/Clock.css';

const AnalogClock = () => {
    const [currentTime, setTime] = useState(new Date())
    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <>
            <Clock value={currentTime} />
            <h1 >  {currentTime.toLocaleTimeString()} </h1>
            <h3> {currentTime.toDateString()}</h3>

        </>
    )
}

export default AnalogClock
