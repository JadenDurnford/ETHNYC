const axios = require("axios").default;
const schedule = require('node-schedule');

axios.defaults.headers.common['x-api-key'] = "2572d7d9-d902-49a3-9582-be88a484f552";

<<<<<<< HEAD
async function searchDropdown(value) {
    const plistResponse = await axios.get(`https://api.reservoir.tools/search/collections/v1?name=${value}&limit=5`);
    const collList = plistResponse.data.collections;
    console.log(collList);
=======
export async function searchDropdown(value) {
  const plistResponse = await axios.get(`https://api.reservoir.tools/search/collections/v1?name=${value}&limit=5`);
  return plistResponse.data.collections;
>>>>>>> 8f5d49fe45eb5e58af6e4aaba4aa663e1b1bd1bd
}

async function collectionInfo() {
  const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"; //using address for project user selected
  const infoResponse = await axios.get(`https://api.reservoir.tools/collection/v2?id=${contractAddress}`);
  const attResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/attributes/all/v2`);
  const collInfo = infoResponse.data.collection;
  const attributes = attResponse.data.attributes;
  const collCount = collInfo.tokenCount; // ex. 10000
  const collAddress = collInfo.id; // ex. 0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d
  const collName = collInfo.name; // ex. Bored Ape Yacht Club
  const collUrls = collInfo.metadata; // ex. imageurl, discordurl, description, externalurl, bannerimageurl, twitterusername
  const collOwnerCount = collInfo.ownerCount; // 6456
  const collFloor = collInfo.floorAsk; // id, price, maker, token
  const collRank = collInfo.rank; // 1 day, 7 day, 30 day, all time
  const collVolume = collInfo.volume; // 1 day, 7 day, 30 day, all time
  const collVolChange = collInfo.volumeChange; // 1 day, 7 day, 30 day
  const collRoyalty = collInfo.royalties.bps; // 250 -- divide by 100 to get percent
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

async function rarityCalculator() {
  const contractAddress = "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D"; //address for project user started sniping

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

    // Pulling the count for each specific trait in the collection
    for (let i = 0; i < attributes.length; i++) {
      uniqueTraits.push(attributes[i].key);
      let numbDefined = 0;
      for (let j = 0; j < attributes[i].values.length; j++) {
        numbDefined += attributes[i].values[j].count;
        traitCounts[`${attributes[i].key}-${attributes[i].values[j].value}`] = attributes[i].values[j].count;
      }
      traitCounts[`${attributes[i].key}-None`] = collNum - numbDefined;
    }

    // Pulling the traits for each token in the collection
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

    // Calculating the rarity for each token in the collection
    for (let i = 0; i < collNum; i++) {
      let rarity = 0;
      for (let j = 0; j < uniqueTraits.length; j++) {
        if (uniqueTraits[j] in tokenTraits[i.toString()]) {
          const traitName = `${uniqueTraits[j.toString()]}-${tokenTraits[i.toString()][uniqueTraits[j.toString()]]}`;
          rarity += 1 / (traitCounts[traitName] / collNum);
        } else {
          const traitName = `${uniqueTraits[j.toString()]}-None`;
          rarity += 1 / (traitCounts[traitName] / collNum);
        }
      }
      tokenRarity[i] = rarity;
    }
    rarities = Object.entries(tokenRarity).sort((a, b) => b[1] - a[1]);
  } catch (error) {
    console.error(error);
  }
}

const snipeParams = {
  snipeID: "1234",
  contractAddress: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  buyPrice: 120,
  gasPrice: "500",
  rarityMax: "500",
  quantity: "2"
};
let counter = 0;
let check = true;

function scheduler(snipeParams) {
  let job = schedule.scheduleJob(snipeParams.snipeID, '*/1 * * * * *', () => snipeWatcher(snipeParams));
}

async function snipeWatcher(snipeParams) {
  const contractAddress = snipeParams.contractAddress //using address for project selected
  const activityResponse = await axios.get(`https://api.reservoir.tools/collections/${contractAddress}/activity/v1?limit=10&types=ask`);
  const collActivity = activityResponse.data.activities;
  if (check) {
    for (i = 0; i < collActivity.length; i++) {
      if (collActivity[i].price <= snipeParams.buyPrice) {
        console.log(`sending tx for token ${collActivity[i].token.tokenId} at price of ${collActivity[i].price}`);
        check = false;
        return;
      }
    }
  } else {
    console.log("transaction confirmed, snipe complete");
    let current_job = schedule.scheduledJobs[snipeParams.snipeID];
    current_job.cancel();
  }
};
export async function txSender() {
<<<<<<< HEAD
    axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
    axios.defaults.headers.post['Content-Type'] = "json";
    const txResponse = await axios.get("http://api-rinkeby.reservoir.tools/execute/buy/v2?token=0x9799b44622224ea7bc27629fb7f284ced9c83eeb%3A65&taker=0xA63EF71bd5971C65C84dA2602d2903510b140f8F&onlyQuote=false&partial=false&skipBalanceCheck=false");
    const txData = txResponse.data.steps[0].data;
}; 
=======
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = "*";
  axios.defaults.headers.post['Content-Type'] = "json";
  const txResponse = await axios.get("http://api-rinkeby.reservoir.tools/execute/buy/v2?token=0x9799b44622224ea7bc27629fb7f284ced9c83eeb%3A65&taker=0xA63EF71bd5971C65C84dA2602d2903510b140f8F&onlyQuote=false&partial=false&skipBalanceCheck=false");
  console.log(txResponse.data);
};
>>>>>>> 8f5d49fe45eb5e58af6e4aaba4aa663e1b1bd1bd


