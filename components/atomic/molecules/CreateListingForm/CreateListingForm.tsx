import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
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

      console.log("niggas love white pussi ", resFile);
    } catch (error) {
      console.log(error);
    }
  };
  const pinFolder = async () => {
    var data = new FormData();
    for (const file of fileImg) {
      data.append(`file`, file);
    }
    data.append("pinataOptions", '{"cidVersion": 1}');
    data.append(
      "pinataMetadata",
      '{"name": "MyFile", "keyvalues": {"company": "Pinata"}}'
    );
    var config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
      headers: {
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI2NjdjMDU1Yy00ZGFmLTQ5MzYtOGU3NC0zNWFmNTI2MWI2ZTEiLCJlbWFpbCI6ImdpbWJlcm5hdDEzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiJiMzM0YjUyYjAxOTI1MGVhMmE1ZiIsInNjb3BlZEtleVNlY3JldCI6ImRiYzhkZWY2YzQxZjE4ZGVlMzc3NzgzYWYzNzYxMTJhYjliZjY2MDVjZTE0MTQxYWQ4NGZhN2M4YTdhOGFkNWEiLCJpYXQiOjE2NjEyOTc0MzR9.JoDZ-w4yVB3ikj_ztvPNcOCQFiGTPWIthyW7H1KKk6U",
      },
      data: data,
    };

    const res = await axios(config);

    console.log("bitch nigger response is ", res);
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
        onChange={(e) => setFileImg(e.target.files)}
        required
        multiple
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
