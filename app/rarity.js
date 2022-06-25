const axios = require("axios").default;
require('dotenv').config();


axios.defaults.headers.common['x-api-key'] = `${process.env.X_API_KEY}`;

const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

async function main() {
    traitCounts = {};
    tokenTraits = {};
    try {
        const attResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/all/v2`);
        const attributes = attResponse.data.attributes;
        for (let i = 0; i < attributes.length; i++) {
            for (let j = 0; j < attributes[i].values.length; j++) {
                traitCounts[`${attributes[i].key}-${attributes[i].values[j].value}`] = attributes[i].values[j].count;
            }
        }

        const tokenResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/static/v1`);
        const tokenAttributes = tokenResponse.data.attributes;
        for (let i = 0; i < tokenAttributes.length; i++) {
            for (let j = 0; j < tokenAttributes[i].values.length; j++) {
                for (let k = 0; k < tokenAttributes[i].values[j].tokens.length; k++) {
                    if (tokenAttributes[i].values[j].tokens[k] in tokenTraits) {
                        tokenTraits[tokenAttributes[i].values[j].tokens[k]][tokenAttributes[i].key] = tokenAttributes[i].values[j].value;
                    } else {
                        tokenTraits[tokenAttributes[i].values[j].tokens[k]] = {};
                        tokenTraits[tokenAttributes[i].values[j].tokens[k]][tokenAttributes[i].key] = tokenAttributes[i].values[j].value;
                    } 
                }
            }
        }
        
      } catch (error) {
        console.error(error);
      }
}

main();