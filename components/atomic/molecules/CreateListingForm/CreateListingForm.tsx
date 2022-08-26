import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";

interface MyFormValues {
  submit: (title: string, description: string, cost: number) => void;
}

export function CreateListingForm({ submit }: MyFormValues) {
  const [fileImg, setFileImg] = useState<any>("");

  const uploadFile = async () => {
    console.log("uplaoding to ipfs  ");
    const formData = new FormData();
    formData.append("file", fileImg);
    const url = "https://api.pinata.cloud/pinning/pinFileToIPFS";

    console.log("bitch eis ", process.env.PINATA_API_KEY);

    try {
      const resFile = await fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          pinata_api_key: `b334b52b019250ea2a5f`,
          pinata_secret_api_key:
            "dbc8def6c41f18dee377783af376112ab9bf6605ce14141ad84fa7c8a7a8ad5a",
        },
      });
      // const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      const ImgHash = `ipfs://${resFile}`;

      console.log("niggas love white pussi ", resFile.body);
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      cost: 0,
      photos: [],
    },
    onSubmit: (values) => {
      // console.log(...Object.values(values));
      // submit(values.title, values.description, values.cost);
      uploadFile();
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
      <input
        type="file"
        onChange={(e) => setFileImg(e.target.files[0])}
        required
      />

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
