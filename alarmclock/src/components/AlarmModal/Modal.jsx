import React from 'react'
import Modal from 'react-modal'
import alarmSound from '../../resources/chime-notification.wav'
import {timeFormatString,Dismiss} from '../../constants'


// this is the alarm modal to the visual cue //
const AlarmModal = ({ isOpen, setModalState, alarmName, alarmTime }) => {

    const audio = new Audio(alarmSound)
    function closeModal() {
        audio.muted = true;
        audio.loop = false
        setModalState(false)
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    // when modal is open alarm starts to play //
    if (isOpen) audio.play()

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <h1> {alarmName}</h1>
                <h2>{alarmTime.format(timeFormatString)}</h2>
                <button style={{color: "red"}} onClick={closeModal}>{Dismiss}</button>
            </Modal>
        </div>
    );
}

export default AlarmModal