/* eslint-disable require-jsdoc */
import {Field, Form, FormikProvider, useFormik} from 'formik';
import {Box, Button, HStack, Spinner} from '@chakra-ui/react';
import {DatePickerWithFormik} from '../DateRangePicker/DateRangePicker';
import moment from 'moment';
import React from 'react';

interface MyFormValues {
  submit: (_startDate: number, endDate: number) => void;
  reservations: string[];
  isLoading: boolean;
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}

export function CreateReservationForm({
  submit,
  reservations,
  isLoading,
}: MyFormValues) {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      const startTS = values.startDate.valueOf();
      const endTS = values.endDate.valueOf();
      submit(startTS, endTS);
    },
  });
  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      // overflow="hidden"
      padding="10px"
      boxShadow={'lg'}
      // w={'300px'}
      p={6}
    >
      <FormikProvider value={formik}>
        <Box>
          <Form>
            <label htmlFor="">Create a Reservation</label>
            <Field
              component={DatePickerWithFormik}
              reservations={reservations}
              className="form-control"
            />
            <Button
              disabled={isLoading}
              colorScheme={'purple'}
              type="submit"
              width={'100%'}
            >
              {isLoading ? (
                <HStack>
                  <Spinner /> <span>Loading...</span>
                </HStack>
              ) : (
                'Book'
              )}
            </Button>
          </Form>
        </Box>
      </FormikProvider>
    </Box>
  );
}
