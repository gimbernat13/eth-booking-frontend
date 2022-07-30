import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Button, Textarea, Box, Stack } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment, { Moment } from "moment";
import { DateRangePickerNormal } from "../DateRangePickerNormal/DateRangePickerNormal";
import styled from "styled-components";
interface MyFormValues {
  submit?: (_startDate: number, endDate: number) => void;
  // reservations: string[];
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}

const StyledSearchForm = styled.div`
  border: 1px solid lightgray;
  border-radius: var(--border-radius);
  padding: 8px 10px;
  /* background-color: purple; */
`;

export function SearchListingsForm({ submit }: MyFormValues) {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      const startTS = values.startDate._d.getTime();
      const endTS = values.endDate._d.getTime();
      // submit(startTS, endTS);
    },
  });

  return (
    <StyledSearchForm>
      <FormikProvider value={formik}>
        <Form>
          <Stack direction="row" alignItems={"center"} spacing={1}>
            <div>
              {/* <label htmlFor="">Guests</label> */}
              <Field
                component={Input}
                name="DateRangePickerNormal"
                className="form-control"
                type="number"
                placeHolder="Guests"
              />
            </div>
            <div>
              {/* <label htmlFor="">Guests</label> */}
              <Field
                component={Input}
                name="DateRangePickerNormal"
                className="form-control"
                type="text"
                placeHolder="Location"
              />
            </div>

            {/* <label htmlFor="">Search By Dates:</label> */}
            <Field
              component={DateRangePickerNormal}
              name="DateRangePickerNormal"
              className="form-control"
            />
          </Stack>
        </Form>
      </FormikProvider>
    </StyledSearchForm>
  );
}
