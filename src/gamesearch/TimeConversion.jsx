export function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp * 1000);
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  // var hour = a.getHours();
  // var min = a.getMinutes();
  // var sec = a.getSeconds();
  var time =
    `${month} ${date + 1} ${year}`
  // month + " " + date + " " + year // + " " + hour + ":" + min + ":" + sec;
  // console.log(a);
  return time;

}

// export function countDown(time) {
//   console.log('count down fired', time)
//   var timer;



//   // timer = setInterval(function () {
  //     //   console.log('timer', timer)
  //     // }, 1000);
  //     //   timeBetweenDates(compareDate);
  
  // }
  
  export function compareDate(toDate) {
    
  console.log('Date', toDate)
  var dateEntered = new Date(toDate);
  var now = new Date();
  var difference = dateEntered.getTime() - now.getTime();

  if (difference <= 0) {

  return "Out Now"

  } else {

    var seconds = Math.floor(difference / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    hours %= 24;
    minutes %= 60;
    seconds %= 60;

    var countDownTime = `${days} days ${hours} hours ${seconds} seconds `
    console.log('countdowntime', countDownTime)
    return countDownTime
  }

}