/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
type Props = {
  reservations: string[];
  // All other props
  [x: string]: any;
};

export const DatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: {setFieldValue, setFieldTouched, values},
  field,
  reservations,
  ...props
}: Props) => {
  const [focusedInput, setFocusedInput] = useState(null);
  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: any;
    endDate: any;
  }) => {
    setFieldValue('startDate', startDate);
    setFieldValue('endDate', endDate);
  };

  const isBlocked = (day: any) => {
    const formattedDate = moment(day).format('YYYY-MM-DD');
    return reservations.some((date) => formattedDate === date);
  };

  return (
    <>
      <DateRangePicker
        startDate={values['startDate']}
        startDateId="tata-start-date"
        endDate={values['endDate']}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        isDayBlocked={isBlocked}
        onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      />
    </>
  );
};
