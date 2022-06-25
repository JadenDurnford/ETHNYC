const axios = require("axios").default;
require('dotenv').config();

axios.defaults.headers.common['x-api-key'] = `${process.env.X_API_KEY}`;

const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D";

async function main() {
    traitCounts = {};
    tokenTraits = {};
    uniqueTraits = [];
    tokenRarity = {};
    try {
        const collResponse = await axios.get(`https://api.reservoir.tools/collection/v2?id=${contractAddress}`);
        const attResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/all/v2`);
        const tokenResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/static/v1`);

        const collNum = collResponse.data.collection.tokenCount;
        const attributes = attResponse.data.attributes;
        const tokenAttributes = tokenResponse.data.attributes;

        for (let i = 0; i < attributes.length; i++) {
            uniqueTraits.push(attributes[i].key);
            let numbDefined = 0;
            for (let j = 0; j < attributes[i].values.length; j++) {
                numbDefined += attributes[i].values[j].count;
                traitCounts[`${attributes[i].key}-${attributes[i].values[j].value}`] = attributes[i].values[j].count;
            }
            traitCounts[`${attributes[i].key}-None`] = collNum - numbDefined;
        }

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
        for (let i = 0; i < collNum; i++) {
            let rarity = 0;
            for (let j = 0; j < uniqueTraits.length; j++) {
                if (uniqueTraits[j] in tokenTraits[i.toString()]) {
                    const traitName = `${uniqueTraits[j.toString()]}-${tokenTraits[i.toString()][uniqueTraits[j.toString()]]}`;
                    rarity += 1/(traitCounts[traitName]/collNum);
                } else {
                    const traitName = `${uniqueTraits[j.toString()]}-None`;
                    rarity += 1/(traitCounts[traitName]/collNum);
                }
            }
            tokenRarity[i] = rarity;
        }
        rarities = Object.entries(tokenRarity).sort((a,b) => b[1]-a[1]);
      } catch (error) {
        console.error(error);
      }
}

main();