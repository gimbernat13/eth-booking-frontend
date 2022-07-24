import React from "react";
import ReactDOM from "react-dom";

import moment from "moment";
import "react-dates/initialize";

// import "./styles.css";
import { DateRangePicker, isInclusivelyBeforeDay } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { Box, Button, Wrap } from "@chakra-ui/react";
// import "@vf-alchemy/vattenfall-design-system/scss/main.scss";

type Props = {
  dates: any;
  submit: (startDate: number, endDate: number) => void;
};

export function DateRange({ dates, submit }: Props) {
  const [focusedInput, setFocusedInput] = React.useState(null);
  const startDate = dates.startDate;
  const endDate = dates.endDate;

  const startDateTS = startDate?._d.getTime();
  const endDateTS = endDate?._d.getTime();

  return (
    <div>
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        onDatesChange={({ startDate, endDate }) => {
          dates.setStartDate(startDate);
          dates.setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={(day: any) => !isInclusivelyBeforeDay(day, moment())}
        initialVisibleMonth={() => moment().subtract(1, "month")}
        // numberOfMonths={1}
        orientation={"vertical"}
      />
      <Button
      
        onClick={() => submit(startDateTS, endDateTS)}
        width={"100%"}
        // isLoading
        loadingText="Submitting"
        colorScheme="purple"
        variant="outline"
      >
        Submit
      </Button>
    </div>
  );
}
