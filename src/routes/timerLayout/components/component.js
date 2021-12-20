import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Timer from '../../timer/modules/index';
//import express from 'express'; 
import axios from 'axios';
import  querystring  from 'querystring';

const TimerLayout = (props) => {
  const {
    port
  } = props;
  //const app ='';
  const [timers, setTimers] = useState([]);
  //app.listen(port, () => console.log(`Listening on port ${port}`)); 
  const onClickButton = () => {
    setTimers([...timers, {timerName: "wake up", time: 15}]);
  };
  const getUUID = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
};
  const onClickButton2 = () => {
      //var scope = 'user-read-private user-read-email';
      // axios.get('https://accounts.spotify.com/authorize?' +
      //   querystring.stringify({
      //     response_type: 'code',
      //     client_id: 'hilat.doron',
      //     scope: scope,
      //     redirect_uri: 'http://localhost:8888/callback',
      //     state: getUUID(16)
      //   })).then(res=>console.log(res));
      const access_token = `Bearer BQBmH3My-Fm1jkMXbUEsFpVnjdr2-H-L3QHZXpD4kPvhKFTa2ev8YqFYZkwdhMk51adgjoFAOZyKgulFLYk_BwR4jEGvo7hx2UaEgTMJn8gxnQIgnWYad8-C8XqRSYDIZKnSKpPR7XsKHXOXyqoLoQ`;
      axios.get('https://api.spotify.com/v1/tracks/6kLCHFM39wkFjOuyPGLGeQ?market=US', {
        headers: {
          'Authorization': `token ${access_token}`
        }
      }).then(res=>console.log(res.data)).catch((error) => {
        console.error(error)
      });
  };

  return (
    <>
     <Button  variant="contained" type="submit" onClick={onClickButton}>Add timer</Button>
     <Button  variant="contained" type="submit" onClick={onClickButton2}>Add Spotify</Button>
     <br/>
     {timers?.map(t => (<Timer timerName={t.timerName} time={t.time}/>))}
    </>
  );
};

TimerLayout.propTypes = {
  port: PropTypes.number.isRequired,
};

TimerLayout.defaultProps = {
};

export default TimerLayout;
