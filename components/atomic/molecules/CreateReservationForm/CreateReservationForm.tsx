import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment, { Moment } from "moment";
interface MyFormValues {
  submit: (_startDate: string, endDate: number) => void;
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}
function convertToTimestamp(date: any) {
  return date.getTime();
}
export function CreateReservationForm({ submit }: MyFormValues) {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      // console.log(...Object.values(values));
      const startTS = values.startDate._d.getTime();
      const endTS = values.endDate._d.getTime();

      submit(startTS, endTS);
      // submit(...Object.values(values));
      alert(JSON.stringify(values, null, 2));

      // console.log(convertToTimestamp(values.startDate));
      // convertToTimestamp(values.endDate);
    },
  });

  // do other stuff with `formik` as necessary, but don't destructure it above because the full object is necessary

  return (
    <FormikProvider value={formik}>
      <Form>
        <label htmlFor="">Email Address</label>
        <Field
          component={DatePickerWithFormik}
          // name="DatePickerWithFormik"
          className="form-control"
        />{" "}
      </Form>
    </FormikProvider>
  );
}
