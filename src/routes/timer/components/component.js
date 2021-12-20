import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DateTimePicker  } from '@mui/lab';
import { Button } from '@mui/material';


const Timer = (props) => {
  const {
    timerName,
    time,
    sound,
  } = props;

  const [timeLeft, setTimeLeft] = useState(new Date().toDateString());
  const [value, setValue] = useState(new Date());
  const [countDownDate, setCountDownDate] = useState(new Date().getTime());
  const [distance, setDistance] = useState(0);
  let runTimer;
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    distance > 0 ?
      claculateTimeLeft():
        clearTimer();
}, [distance]);

useEffect(() => {
  const timeNow = new Date().getTime();
  // setDistance(countDownDate - timeNow);
}, [countDownDate]);

  const claculateTimeLeft=() =>{
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    setTimeLeft(`${days}d ${hours}h ${
      minutes}m ${seconds}s `);

  };

  const setTime = () => {
    const timeNow = new Date().getTime();
    const tt = new Date(value).getTime();
    setDistance(tt - timeNow);
  }; 
  const clearTimer = () => {
    if (runTimer) {
      clearInterval(runTimer);
      setTimeLeft('EXPIRED');
    }
  };

  const onClickButton = () => {
    if (!runTimer){
      setCountDownDate(new Date(value).getTime());
      runTimer = setInterval(setTime, 1000);
    }
      
  };
  const onCancelButton = () => {
   clearTimer();
  };
  return (
    <>
      <i>{timerName}</i>
      <div>{time}</div>
      <div>{sound}</div>
      <div>Time to Timer: {timeLeft}</div>
      <LocalizationProvider dateAdapter={DateAdapter}>

        <DateTimePicker
          label="Date&Time picker"
          value={value}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />

      </LocalizationProvider>
      <div>
        <Button type="submit" onClick={onClickButton}>Set</Button>
        <Button type="cancel" onClick={onCancelButton}>Cancel</Button>
      </div>
    </>
  );
};

Timer.propTypes = {
  timerName: PropTypes.string.isRequired,
  time: PropTypes.number,
  sound: PropTypes.string,
};

Timer.defaultProps = {
  time: 0,
  sound: '',
};

export default Timer;
