import { useLocation } from "react-router-dom";
import MarketplaceJSON from "../erc721.json";
import axios from "axios";
import { useState } from "react";
import NFTTile from "./NFTTile";
import SellNFT from "./SellNFT";

export default function CollectionDetails(props) {
  let location = useLocation();

  const sampleData = [
    {
        "name": "NFT#1",
        "description": "Demo's First NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmNX9fDDAVJSB99ChSok8AA2dUaep31StD8YumhoWUw6GP",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        "category":location.pathname.split("/")[2]
    },
    {
        "name": "NFT#2",
        "description": "Demo's Second NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmNX9fDDAVJSB99ChSok8AA2dUaep31StD8YumhoWUw6GP",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        "category":location.pathname.split("/")[2]
    },
    {
        "name": "NFT#3",
        "description": "Demo's Third NFT",
        "website":"http://axieinfinity.io",
        "image":"https://gateway.pinata.cloud/ipfs/QmNX9fDDAVJSB99ChSok8AA2dUaep31StD8YumhoWUw6GP",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
        "category":location.pathname.split("/")[2]
    },
  ];
  const [data, updateData] = useState(sampleData);
  const [dataFetched, updateFetched] = useState(false);
  
  async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))
    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();
  return (
    <div className="flex flex-col place-items-center mt-20">
      <div className="md:text-xl font-bold text-white">
        {location.pathname.split("/")[2]}
      </div>
      <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
      <SellNFT></SellNFT>
    </div>
  );
}
