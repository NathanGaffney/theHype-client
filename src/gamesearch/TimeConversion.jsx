import React, {useState} from "react";

const TimeConversion = (props) => {
  const[rdtime, setRdtime] = useState('')
  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    // var sec = a.getSeconds();
    var time =
    month + " " + date + " " + year // + " " + hour + ":" + min + ":" + sec;
    console.log(a);
    return time;
  }
  // console.log(timeConverter(props.searchGame[0].first_release_date));
  return (
    <div>
      <p> Release Date: {timeConverter(props.searchGame[0].first_release_date)}</p>
    </div>
  );
}

export default TimeConversion;