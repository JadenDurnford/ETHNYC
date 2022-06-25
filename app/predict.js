const sdk = require("api")("@reservoirprotocol/v1.0#1qqrk1pl4stynuh");

sdk.auth("b8644c0e-9e85-4fdb-a0d7-55f7f8672cab");
sdk.server("https://api.reservoir.tools");
sdk
  .getUsersUserActivityV1({
    limit: "20",
    user: "0xF296178d553C8Ec21A2fBD2c5dDa8CA9ac905A00",
    Accept: "*/*",
  })
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
