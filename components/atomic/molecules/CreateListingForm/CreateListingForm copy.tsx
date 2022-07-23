import * as React from "react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
import { Button, Input, Textarea } from "@chakra-ui/react";

interface MyFormValues {
  title: string;
  description: string;
  cost: number;
}

export const CreateListingForm: React.FC<{
  submit: any;
}> = ({ submit }) => {
  const initialValues: MyFormValues = {
    title: "",
    description: "",
    cost: 0,
  };
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          // console.log({ values, actions });
          // alert(JSON.stringify(values, null, 2));
          // actions.setSubmitting(false);
          submit(values);
        }}
      >
        <Form>
          <label htmlFor="title">tt </label>

          <Input id="title" name="title" placeholder="title" />
          <label htmlFor="cost">Cost</label>
          <Input id="number" type="number" name="cost" placeholder="Cost" />

          <label htmlFor="description">description</label>

          <Input
            id="description "
            name="description"
            placeholder="Description"
          />
          <Button colorScheme="purple" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
};
