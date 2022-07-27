import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { Button } from "@chakra-ui/react";
import moment, { now } from "moment";
type Props = {
  reservations: string[];
  // All other props
  [x: string]: any;
};

export const DatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  reservations,
  ...props
}: Props) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setFieldValue("startDate", startDate);
    setFieldValue("endDate", endDate);
  };

  const isBlocked = (day: any) => {
    const formattedDate = moment(day).format("YYYY-MM-DD");
    return reservations.some((date) => formattedDate === date);
  };

  return (
    <div className="App">
      <DateRangePicker
        startDate={values["startDate"]}
        startDateId="tata-start-date"
        endDate={values["endDate"]}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        isDayBlocked={isBlocked}
        onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      />
      <Button type="submit"> Niggas</Button>
    </div>
  );
};
