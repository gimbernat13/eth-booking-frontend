import React, { useState } from "react";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import { Button } from "@chakra-ui/react";
type Props = {
  // All other props
  [x: string]: any;
};

export const DatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  ...props
}: Props) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setFieldValue("startDate", startDate);
    setFieldValue("endDate", endDate);
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
        onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      />
      <Button type="submit"> Niggas</Button>
    </div>
  );
};
