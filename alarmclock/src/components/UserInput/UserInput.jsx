import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment'
import AlarmModal from '../AlarmModal/Modal'
import { alarmTimeLessThenCurrentTimeNotification, timeFormatString, AddAlarm, AvailableAlarms } from '../../constants'

const UserInput = () => {
    const currentTime = new Date()
    const [currentTimeDatePicker, setTime] = useState(new moment(new Date()))
    const [modalState, setModalState] = useState(false)
    const [alarmName, setAlarmName] = useState('')
    const [notification, setNotification] = useState(false)
    const [alarmList, updateAlarmList] = useState([])
    const listItems = alarmList.length > 0 && alarmList.map((d) => <li key={d.name}> {d.name} Time : {d.time.format('HH:mm:ss')} </li>)

    // create the alarm after given ms //
    const createAlarm = (ms, alarmName) => {
        setTimeout(() => {
            setAlarmName(alarmName)
            setModalState(true)
        }, ms)
    }

    // automatically close the notification after 5 sec //
    const handleNotification = () => {
        setNotification(true)
        return (
            setTimeout(() => {
                setNotification(false)
            }, 5000)
        )
    }

    const handleChange = (e) => {
        let formattedDateTime = new moment(new Date())
        formattedDateTime.set('hour', e.getHours()).set('minute', e.getMinutes()).set('second', e.getSeconds())
        setTime(formattedDateTime)

    }
    return (
        <>
            <div>
                <DateTimePicker
                    onChange={(e) => handleChange(e)}
                    value={currentTimeDatePicker}
                    format={timeFormatString}
                    disableCalendar={true}
                    clearIcon={null}
                    disableClock={true}
                />
                <button style={{ margin: "10px" }} onClick={() => {
                    updateAlarmList((oldList) => {
                        const miliSecDifference = Math.abs(currentTimeDatePicker - currentTime)
                        if (miliSecDifference <= 0) {
                            handleNotification(true)
                            return oldList
                        }
                        let alarmName = `Alarm${alarmList.length + 1}`
                        createAlarm(miliSecDifference, alarmName, currentTimeDatePicker)
                        return [...oldList, { name: alarmName, time: currentTimeDatePicker }]
                    }
                    )
                }}> {AddAlarm}</button>

                {notification && <div><text style={{ color: "red" }}> {alarmTimeLessThenCurrentTimeNotification}</text> </div>}

            </div>

            <div className='alarm-list-heading'>
                <h4>{AvailableAlarms}</h4>
            </div>

            {/* list of all the alarms added */}
            <div className='alarm-list'>
                {listItems}
            </div>
            <AlarmModal isOpen={modalState} setModalState={setModalState} alarmName={alarmName} alarmTime={currentTimeDatePicker} />
        </>
    )
}

export default UserInput