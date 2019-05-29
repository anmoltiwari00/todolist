import React, { useState } from "react";
import DateFnsUtils from "@date-io/moment"; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import getDate from '../../date';

export default function Picker(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DatePicker 
          value={selectedDate}
          disableToolbar
          onChange={(val) => {
            handleDateChange(val);
            handleChange(val, props);
          }}
        />
    </MuiPickersUtilsProvider>
  );
}

const handleChange = (date, props) => {
  var dateString = getDate(date._d);
  props.editDate(dateString);
}
