require("dotenv").config();
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");


const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest");

  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    nonce: nonce,
    gas: 500000,
    data: nftContract.methods.mintNFT(PUBLIC_KEY, `ipfs://${tokenURI}`).encodeABI(),
  };
  const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

  signPromise

    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,

        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",

              hash,

              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",

              err
            );
          }
        }
      );
    })

    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

export {mintNFT};
