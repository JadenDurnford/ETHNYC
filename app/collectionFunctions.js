const axios = require("axios").default;
require('dotenv').config();

axios.defaults.headers.common['x-api-key'] = `${process.env.X_API_KEY}`;

async function searchDropdown() {
    const projName = "bored"; //dynamically change with user input
    const plistResponse = await axios.get(`https://api.reservoir.tools/search/collections/v1?name=${projName}&limit=5`);
    const collList = plistResponse.data.collections;
}

async function collectionInfo() {
    const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"; //using address for project user selected
    const infoResponse = await axios.get(`https://api.reservoir.tools/collection/v2?id=${contractAddress}`);
    const attResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/all/v2`);
    const collInfo = infoResponse.data.collection;
    const attributes = attResponse.data.attributes;
    const count = collInfo.tokenCount;
    const traits = [];
    const traitTypes = {};
    // Pulling traits
    for (let i = 0; i < collInfo.attributes.length; i++) {
        traits.push(collInfo.attributes[i].key);
    }
    // Pulling trait types
    for (let i = 0; i < attributes.length; i++) {
        traitTypes[`${attributes[i].key}`] = [];
        for (let j = 0; j < attributes[i].values.length; j++) {
            traitTypes[`${attributes[i].key}`].push(attributes[i].values[j].value);
        }
    }
}

collectionInfo();