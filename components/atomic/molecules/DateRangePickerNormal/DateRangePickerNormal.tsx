/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import 'react-dates/initialize';
import {DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

type Props = {
  reservations: string[];
  startDateId: string;
  endDateId: string;
  [x: string]: any;
  // All other props
};

export const DateRangePickerNormal = ({
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

  return (
    <>
      <DateRangePicker
        startDate={values['startDate']}
        startDateId="tata-start-date"
        endDate={values['endDate']}
        endDateId="tata-end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        hideKeyboardShortcutsPanel
        onFocusChange={(focusedInput: any) => setFocusedInput(focusedInput)}
      />
    </>
  );
};
