import React, {useState} from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, TimePicker} from '@material-ui/pickers';
import { Button } from 'semantic-ui-react';
import alarmSoundGentle from '../sounds/alarm_gentle.wav';
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

  const formatTime = (time) => {
    const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
    if(time.getHours() === 0) {
      return '12' + ':' + minutes + ' AM';
    } else if(time.getHours() < 10) {
      return '0' + time.getHours() + ':' + minutes + ' AM';
    } else if(time.getHours() < 12) {
      return time.getHours() + ':' + minutes + ' AM';
    } else if(time.getHours() < 13) {
      return time.getHours() + ':' + minutes + ' PM';
    } else if(time.getHours() < 22) {
      return '0' + (time.getHours()-12) + ':' + minutes + ' PM';
    } else {
      return (time.getHours()-12) + ':' + minutes + ' PM';
    } 
  };

  return ( 
    <div className='Alarm'>
      <h1 className='ViewTitle'>Alarm Clock</h1>
      <h2>The alarm will sound at {formatTime(alarmTime)}</h2>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>  
        <TimePicker
          className='AlarmTimePicker'
          margin="normal" w
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