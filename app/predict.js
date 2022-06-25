const options = {
  method: "GET",
  headers: {
    Accept: "*/*",
    "x-api-key": "b8644c0e-9e85-4fdb-a0d7-55f7f8672cab",
  },
};
const fs = require('fs');

const temp = "0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00";

fetch(
  "https://api.reservoir.tools/users/" + temp + "/activity/v1?limit=20",
  options
)
  .then((response) => response.json())
  .then((response) => {
    const data = JSON.stringify(response);

    fs.writeFile("predictuser.json", data, (err) => {
      if (err) {
        throw err;
      }
      console.log("JSON data is saved.");
    });
  })
  .catch((err) => console.error(err));

const whale_list = [
  "0xE052113bd7D7700d623414a0a4585BCaE754E9d5",
  "0x052564eB0fd8b340803dF55dEf89c25C432f43f4",
  "0x0ed1e02164a2a9fad7a9f9b5b9e71694c3fad7f2",
  "0xC665A60F22dDa926B920DEB8FFAC0EF9D8a17460",
  "0x0E9AED5c7721c642A032812C2c4816f7d6cB87d7",
  "0x53aED391f71BC67d8b5b05a3851f46E742A74768",
  "0x6186290B28D511bFF971631c916244A9fC539cfE",
  "0x65Ba4f92D7DFA813DdBd849D9Faf38a723Dd9b12",
  "0xe1D29d0a39962a9a8d2A297ebe82e166F8b8EC18",
  "0x3612b2e93b49F6c797066cA8c38b7f522b32c7cb",
];
