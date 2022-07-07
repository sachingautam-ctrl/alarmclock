import './App.css';
import AnalogClock from './components/Clock/Clock'
import UserInput from './components/UserInput/UserInput'

function App() {
  return (
    <div >
        <div className='alarmclock-analog-time-main'>
        <AnalogClock />
        <UserInput />
        </div>
    </div>
  );
}

export default App;

