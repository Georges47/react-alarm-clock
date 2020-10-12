import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import alarmSoundGentle from './sounds/alarm_gentle.wav'; 
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

class App extends React.Component {
  state = {
    currentTime: new Date(),
    alarmTime: {
      hour: 0,
      minute: 0
    },
    alarmIsSet: false,
    alarmSound: new Audio(alarmSoundGentle),
  }

  handleUpdateCurrentTime() {
    this.setState({currentTime: new Date()});
    if(this.state.alarmIsSet && (this.state.currentTime.getHours() == this.state.alarmTime.hour) && (this.state.currentTime.getMinutes() == this.state.alarmTime.minute)) {
      this.state.alarmSound.play(); 
    }
  }

  addHour() {
    let alarmTime = this.state.alarmTime;
    alarmTime.hour == 23 ? alarmTime.hour = 0 : alarmTime.hour++;
    this.setState({alarmTime: alarmTime});
  }

  substractHour() {
    let alarmTime = this.state.alarmTime;
    alarmTime.hour == 0 ? alarmTime.hour = 23 : alarmTime.hour--;
    this.setState({alarmTime: alarmTime});
  }

  addMinute() {
    let alarmTime = this.state.alarmTime;
    alarmTime.minute === 59 ? alarmTime.minute = 0 : alarmTime.minute++;
    this.setState({alarmTime: alarmTime});
  }

  substractMinute() {
    let alarmTime = this.state.alarmTime;
    alarmTime.minute === 0 ? alarmTime.minute = 59 : alarmTime.minute--;
    this.setState({alarmTime: alarmTime});
  }

  setAlarm() {
    this.setState({alarmIsSet: !this.state.alarmIsSet});
    this.state.alarmSound.pause();
    this.state.alarmSound.currentTime = 0;
  }

  render() {  
    return (
      <div className='app'>
        <Clock 
          updateCurrentTime={() => this.handleUpdateCurrentTime()} 
          currentTime={this.state.currentTime}
        />
        <Alarm
          alarmTime={this.state.alarmTime}
          addHour={() => this.addHour()}
          substractHour={() => this.substractHour()}
          addMinute={() => this.addMinute()}
          substractMinute={() => this.substractMinute()}
        />
        <Button 
          onClick={() => this.setAlarm()} 
          variant="contained" 
          color="primary" 
          disableElevation
        >
          {this.state.alarmIsSet ? "Cancel alarm" : "Set alarm"}
        </Button>
        <h1>{this.state.alarmIsSet ? "Alarm is set!" : ""}</h1>
      </div>
    );
  }
}


class Clock extends React.Component {

  componentDidMount() {
    setInterval(this.props.updateCurrentTime, 1000);
  }

  render() {
    const h = this.props.currentTime.getHours();
    const m = this.props.currentTime.getMinutes();
    const s = this.props.currentTime.getSeconds();
    return (
      <div className="clock">
        <h1>{h < 10 ? '0' + h : h}:{m < 10 ? '0' + m : m}:{s < 10 ? '0' + s : s} {/*h < 12 ? ' AM' : ' PM'*/}</h1>
      </div>
    );
  }
}


class Alarm extends React.Component {

  formatTime(time) {
    return time < 10 ? '0' + time : time;
  }

  render() {
    return(
        <TableContainer className="alarm" style={{position: 'relative', left: '50%', marginLeft: '-75px', width: '150px', height: '130px'}}>
          <Table> 
            <TableRow>
              <TableCell padding='none' align="right"><h1>{this.formatTime(this.props.alarmTime.hour)}</h1></TableCell>
              <TableCell padding='none' align="center"><h1>:</h1></TableCell>
              <TableCell padding='none' align="left"><h1>{this.formatTime(this.props.alarmTime.minute)}</h1></TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding='none' align="right"> 
                <Button className='add-hour' onClick={() => this.props.addHour()} disableRipple={true} style={{minWidth: '30px', height: '30px'}}>
                  <AddIcon fontSize="small"/>
                </Button>
              </TableCell>
              <TableCell padding='none' align="center"></TableCell>
              <TableCell padding='none' align="left"> 
                <Button className='add-minute' onClick={() => this.props.addMinute()} disableRipple={true} style={{minWidth: '30px', height: '30px'}}>
                  <AddIcon fontSize="small"/>
                </Button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell padding='none' align="right"> 
                <Button className='substract-hour' onClick={() => this.props.substractHour()} disableRipple={true} style={{minWidth: '30px', height: '30px'}}>
                  <RemoveIcon fontSize="small"/>
                </Button>        
              </TableCell>
              <TableCell padding='none' align="center"></TableCell>
              <TableCell padding='none' align="left"> 
                <Button className='substract-minute' onClick={() => this.props.substractMinute()} disableRipple={true} style={{minWidth: '30px', height: '30px'}}>
                  <RemoveIcon fontSize="small"/>
                </Button>        
              </TableCell>
            </TableRow>
          </Table>
        </TableContainer>
    );
  }
}
  

const Sound = ( { soundFileName, ...rest } ) => (
  <audio autoPlay src={`sounds/${soundFileName}`} {...rest} />
)


// ========================================


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
