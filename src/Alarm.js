import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import { Button } from 'semantic-ui-react';
import alarmSoundGentle from './sounds/alarm_gentle.wav';
import './Alarm.css';

function Alarm() {

  const [alarmTime, setAlarmTime] = useState(new Date());
  const [alarmIsSet, setAlarmIsSet] = useState(false);
  const [alarmIntervalID, setAlarmIntervalID] = useState();
  const [alarmSound, setAlarmSound] = useState(new Audio(alarmSoundGentle));

  const changeAlarmState = () => {
    if(alarmIsSet) {
      clearInterval(alarmIntervalID);
      if(!alarmSound.paused) {
        alarmSound.pause();
        alarmSound.currentTime = 0;
      }
    } else {
      setAlarmIntervalID(setInterval(() => {checkAlarm();}, 1000));
    }
    setAlarmIsSet(!alarmIsSet);
  };

  const checkAlarm = () => {
    const currentTime = new Date();
    const hoursMatch = (currentTime.getHours() === alarmTime.getHours());
    const minutesMatch = (currentTime.getMinutes() === alarmTime.getMinutes());
    const secondsMatch = (currentTime.getSeconds() === 0);
    if(hoursMatch && minutesMatch && secondsMatch) {
      alarmSound.play();
    }
  };

  return (
    <div className='Alarm'>
      <h2>The alarm will sound at {alarmTime.getHours() + ':' + alarmTime.getMinutes()}</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>  
        <TimePicker
          className='AlarmTimePicker'
          margin="normal" 
          id="time-picker"
          //label="The alarm will sound at"
          value={alarmTime}
          onChange={(newTime) => setAlarmTime(newTime)}
        />
      </MuiPickersUtilsProvider>
      <Button 
        className='AlarmActivationButton' 
        onClick={changeAlarmState}
      >
        {alarmIsSet ? "Cancel Alarm" : "Set Alarm"} 
      </Button>
    </div>
  );

}

export default Alarm;