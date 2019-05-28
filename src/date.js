const getDate = (messedUpDate) => {
  var now = messedUpDate ? messedUpDate : new Date();
  var date = now.getDate();
  var day = now.getDay();
  var month = now.getMonth();
  var dayString = iterate(days, day);
  var monthString = iterate(months, month);
  return dayString + " " + monthString + " " + date.toString();
}

const days = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thur",
  5: "Fri",
  6: "Sat"
}

const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "June",
  6: "July",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec"
}

const iterate = (object, matcher) => {
  for(var key in object) {
    if(object.hasOwnProperty(key)) {
      if(key == matcher)
        return object[key];
    }
  }
}

export default getDate;
