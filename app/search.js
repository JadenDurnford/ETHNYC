const axios = require("axios").default;
require('dotenv').config();

axios.defaults.headers.common['x-api-key'] = `${process.env.X_API_KEY}`;

const projName = "bored";

async function main() {
    const listResponse = await axios.get(`https://api.reservoir.tools/search/collections/v1?name=${projName}&limit=5`);
    const collList = listResponse.data.collections;
    console.log(collList);
    /*for (let i = 0; i < 5; i++) {

    }*/
}

main();