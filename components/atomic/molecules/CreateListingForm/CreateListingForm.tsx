import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");
interface MyFormValues {
  submit: (title: string, description: string, cost: number) => void;
}

export function CreateListingForm({ submit }: MyFormValues) {
  const [fileImg, setFileImg] = useState("");

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", fileImg);
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    try {
      let promise = fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: `${process.env.PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.log(error);
    }

    return movies;
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      cost: 0,
      photos: [],
    },
    onSubmit: (values) => {
      console.log(...Object.values(values));
      submit(values.title, values.description, values.cost);
      // submit(...Object.values(values));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="title">Listing Name</label>
      <Input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      <label htmlFor="cost">Cost per night</label>

      <Input
        id="cost"
        name="cost"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.cost}
      />

      <label htmlFor="cost">Photos</label>

      {/* <Input
        id="photos"
        name="photos"
        type="file"
        multiple
        onChange={onChange}
      /> */}

      {/* <input type="file" onChange={onChange} /> */}

      <label htmlFor="cost">Description</label>

      <Textarea
        id="descripton"
        name="description"
        onChange={formik.handleChange}
        value={formik.values.description}
      />

      <Button m={"1rem 0"} float={"right"} type="submit">
        Submit
      </Button>
    </form>
  );
}
