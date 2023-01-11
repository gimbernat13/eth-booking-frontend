require('dotenv').config();
const key = process.env.PINATA_API_KEY;
const secret = process.env.PINATA_API_SECRET;
const axios = require('axios');

export const pinJSONToIPFS = async (JSONBody: any) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
  // making axios POST request to Pinata ⬇️

  console.log('json body ', JSONBody);
  console.log('api body ', key);
  console.log('secret body ', secret);

  return axios
      .post(url, JSONBody, {
        headers: {
          pinata_api_key: key,
          pinata_secret_api_key: secret,
        },
      })
      .then(function(response: any) {
        return {
          success: true,
          pinataUrl:
          'https://gateway.pinata.cloud/ipfs/' + response.data.IpfsHash,
        };
      })
      .catch(function(error: any) {
        console.log(error);
        return {
          success: false,
          message: error.message,
        };
      });
};
