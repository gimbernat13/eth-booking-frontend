import { Field, Form, FormikProvider, useFormik } from "formik";
import { Box } from "@chakra-ui/react";
import { DatePickerWithFormik } from "../DateRangePicker/DateRangePicker";
import moment from "moment";
interface MyFormValues {
  submit: (_startDate: number, endDate: number) => void;
  reservations: string[];
}

declare global {
  interface Date {
    getDate(start?: number): [Date, Date];
  }
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
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="10px"
      boxShadow={"lg"}
      p={6}
    >
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
