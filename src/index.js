import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DrawerContainer from './DrawerContainer'; 

import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from '@material-ui/core/Drawer';

function Welcome() {
  return (
    <div>
      <h1 className='ViewTitle'> Welcome </h1>
      <h2> Select the desired application from the left toolbar </h2>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState(<Welcome/>);

  return (
    <div className='App'> 
      <CssBaseline/>
      <AppBar position="fixed" className='AppBar'>
        <Toolbar> 
          <h1> React Alarm Clock </h1> 
        </Toolbar>
      </AppBar>
      <Drawer
        className='Drawer'
        variant="permanent"
        classes={{paper: 'DrawerPaper',}}
      >
        <DrawerContainer setCurrentView={setCurrentView}/>
      </Drawer>
      {currentView}
    </div> 
  );
}

// ========================================


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
