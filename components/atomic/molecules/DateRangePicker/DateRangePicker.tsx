import React from "react";

type Props = {};

function App({}: Props) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [focusedInput, setFocusedInput] = React.useState(null);

  return (
    <div className="App">
      <DateRangePicker
        startDate={startDate}
        startDateId="startDate"
        endDate={endDate}
        endDateId="endDate"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate);
          setEndDate(endDate);
        }}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        isOutsideRange={(day) => !isInclusivelyBeforeDay(day, moment())}
        initialVisibleMonth={() => moment().subtract(1, "month")}
        // numberOfMonths={1}
        orientation={"vertical"}
      />
    </div>
  );
}
