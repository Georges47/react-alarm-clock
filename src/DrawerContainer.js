import React from 'react';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';

import TimerIcon from '@material-ui/icons/Timer';
import AlarmIcon from '@material-ui/icons/Alarm';
import PublicIcon from '@material-ui/icons/Public';

import Alarm from './Alarm/Alarm';
import WorldClock from './WorldClock';
import Timer from './Timer';

function DrawerContainer({setCurrentView}) {
  const iconNames = ['Alarm Clock', 'World Clock', 'Timer'];
  const icons = [<AlarmIcon/>, <PublicIcon/>, <TimerIcon/>];
  const views = [<Alarm/>, <WorldClock/>, <Timer/>];

  return (
    <div className='DrawerContainer'>
      <Toolbar/>
      <List>
        {icons.map((icon, index) => (
          <ListItem button onClick={() => setCurrentView(views[index])} key={iconNames[index]}>
            <ListItemIcon> 
              {icon}
            </ListItemIcon>
            <ListItemText primary={iconNames[index]} />
          </ListItem>
        ))}
      </List>
      <Divider/>
    </div>
  );
}

export default DrawerContainer;