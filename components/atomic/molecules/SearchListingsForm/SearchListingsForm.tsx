/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import {Field, Form, FormikProvider, useFormik} from 'formik';
import {Button, Stack} from '@chakra-ui/react';
import moment, {Moment} from 'moment';
import {DateRangePickerNormal} from '../DateRangePickerNormal/DateRangePickerNormal';
import styled from 'styled-components';
import {useContext} from 'react';
import {SearchContext} from '../../../../context/searchContext';
import {setDates, setRange} from '../../../../context/actionNames';
import React from 'react';

interface MyFormValues {
  submit?: (_startDate: number, endDate: number) => void;
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}

const StyledSearchForm = styled.div`
  /* border: 1px solid #a2a2a2bb; */
  border-radius: var(--border-radius);
`;

export function SearchListingsForm({submit}: MyFormValues) {
  const {dispatch} = useContext(SearchContext);

  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      dispatch({
        type: setDates,
        payload: values,
      });
      dispatch({
        type: setRange,
        payload: enumerateDaysBetweenDates(values.startDate, values.endDate),
      });
    },
  });

  const enumerateDaysBetweenDates = function(
      _startDate: Moment,
      _endDate: Moment,
  ) {
    const currentDate = _startDate.clone();
    const dates = [];

    while (currentDate.isSameOrBefore(_endDate)) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate.add(1, 'days');
    }
    return dates;
  };

  return (
    <StyledSearchForm>
      <FormikProvider value={formik}>
        <Form>
          <Stack
            borderRadius={'var(--border-radius)'}
            border="1px solid gray"
            direction="row"
            boxShadow={'lg'}
            alignItems={'center'}
            spacing={1}
          >
            <Field
              component={DateRangePickerNormal}
              name="DateRangePickerNormal"
            />
            <Button colorScheme={'purple'} type="submit">
              Search
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </StyledSearchForm>
  );
}
