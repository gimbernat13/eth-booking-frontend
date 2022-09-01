import { useFormik } from "formik";
import { Input, Button, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
interface MyFormValues {
  submit: (
    title: string,
    description: string,
    cost: number,
    ipfsHash: string
  ) => void;
}

export function CreateListingForm({ submit }: MyFormValues) {
  const [fileImg, setFileImg] = useState<any>("");

  const sendFilesToIPFS = async () => {
    if (fileImg) {
      try {
        const formData = new FormData();
        formData.append(`file`, fileImg);
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `b334b52b019250ea2a5f`,
            pinata_secret_api_key: `dbc8def6c41f18dee377783af376112ab9bf6605ce14141ad84fa7c8a7a8ad5a`,
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        console.log(ImgHash);
        return resFile.data.IpfsHash;
        //Take a look at your Pinata Pinned section, you will see a new file added to you list.
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      cost: 0,
      photos: [],
    },
    onSubmit: async (values) => {
      const ipfsHash = await sendFilesToIPFS();
      // console.log("ipfshash", ipfsHash);

      submit(values.title, values.description, values.cost, ipfsHash);
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
        onChange={(e: any) => setFileImg(e.target.files[0])}
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
