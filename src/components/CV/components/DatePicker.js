import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Classes } from "@blueprintjs/core";

const DateInput = props => {
  const [date, setDate] = React.useState({
    startDate: "",
    isOpen: false
  });

  const handleChange = d => {
    if (d !== null) {
      setDate({
        startDate: d,
        isOpen: false
      });

      props.changer(props.submitType, `${d.getFullYear()}-${d.getMonth() + 1}`);
    }
  };

  return (
    <DatePicker
      className={Classes.INPUT}
      dateFormat="yyyy-MM"
      placeholderText={date.startDate}
      onChange={handleChange}
      selected={date.startDate}
      showMonthDropdown
      showYearDropdown
      showMonthYearPicker
    />
  );
};
export default DateInput;
/**
 *  <DatePicker
          dateFormat="yyyy/MM/dd"
          selected={date.startDate}
          onChange={handleChange}
          popperPlacement="bottom"
          inline
          showMonthDropdown
          showYearDropdown
          popperModifiers={{
            offset: {
              enabled: true,
              offset: "5px, 10px"
            },
            preventOverflow: {
              enabled: true,
              escapeWithReference: false,
              boundariesElement: "viewport"
            }
          }}
        />
 */
