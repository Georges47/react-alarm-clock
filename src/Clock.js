import React, {useEffect} from 'react';

function Clock({currentTime, updateCurrentTime}) {
  //const h = currentTime.getHours();
  //const m = currentTime.getMinutes();
  //const s = currentTime.getSeconds();

  useEffect(() => {
    const timer = setInterval(updateCurrentTime, 1000);
  });

  return (
    <div className='Clock'>
      <h1>currentTime</h1>
      {/* <h1>{h < 10 ? '0' + h : h}:{m < 10 ? '0' + m : m}:{s < 10 ? '0' + s : s} h < 12 ? ' AM' : ' PM'</h1> */}
    </div>
  );
}

export default Clock;