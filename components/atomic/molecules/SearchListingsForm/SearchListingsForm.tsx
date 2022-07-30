import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Button, Textarea, Box } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment, { Moment } from "moment";
import { DateRangePickerNormal } from "../DateRangePickerNormal/DateRangePickerNormal";
interface MyFormValues {
  submit?: (_startDate: number, endDate: number) => void;
  // reservations: string[];
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}

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
    <Box bg={"white"} borderRadius={"xl"} boxShadow={"xl"} p={6}>
      <FormikProvider value={formik}>
        <Form>
          <label htmlFor="">Guests</label>

          <Field
            component={Input}
            name="DateRangePickerNormal"
            className="form-control"
            type="number"
            placeHolder="Number of Guests"
          />
          <label htmlFor="">Search By Dates:</label>
          <Field
            component={DateRangePickerNormal}
            name="DateRangePickerNormal"
            className="form-control"
          />
        </Form>
      </FormikProvider>
    </Box>
  );
}
