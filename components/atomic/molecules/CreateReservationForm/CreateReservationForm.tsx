import { Field, Form, FormikProvider, useFormik } from "formik";
import { Input, Button, Textarea, Box } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment, { Moment } from "moment";
interface MyFormValues {
  submit: (_startDate: number, endDate: number) => void;
  reservations: string[];
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
}
function convertToTimestamp(date: any) {
  return date.getTime();
}
export function CreateReservationForm({ submit, reservations }: MyFormValues) {
  const formik = useFormik({
    initialValues: {
      startDate: moment(),
      endDate: moment(),
    },
    onSubmit: (values) => {
      const startTS = values.startDate._d.getTime();
      const endTS = values.endDate._d.getTime();
      submit(startTS, endTS);
      
    },
  });


  return (
    <Box border={"1px solid black"} p={6}>
      <FormikProvider value={formik}>
        <Form>
          <label htmlFor="">Create a Reservation</label>
          <Field
            component={DatePickerWithFormik}
            reservations={reservations}
            // name="DatePickerWithFormik"
            className="form-control"
          />
        </Form>
      </FormikProvider>
    </Box>
  );
}
