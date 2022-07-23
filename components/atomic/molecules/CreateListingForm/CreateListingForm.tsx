import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
interface MyFormValues {
  submit: (title: string, description: string, cost: number) => void;
}

export function CreateListingForm({ submit }: MyFormValues) {
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      cost: 0,
    },
    onSubmit: (values) => {
      console.log(...Object.values(values));
      submit(values.title, values.description, values.cost);
      // submit(...Object.values(values));
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">Email Address</label>
      <Input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <Input
        id="cost"
        name="cost"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.cost}
      />
      <Textarea
        id="descripton"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}
