import React, { useRef } from 'react';
import Countdown from 'react-countdown';


const CountDown = ({ typingDuration, setSessionIsOver }) => {

  let interval = useRef(Date.now() + (typingDuration * 60000));

  const countDownRender =({ minutes, seconds }) => {
    return <span> {minutes}:{seconds}</span>
  }
  
  return (
    <div>
      <Countdown 
        date={interval.current} 
        zeroPadTime={0}
        renderer={countDownRender}
        onComplete={() => {setSessionIsOver(true)}}
      />
    </div>
  )
}

export default CountDown;