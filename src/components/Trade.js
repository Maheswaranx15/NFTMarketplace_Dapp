import Navbar from "./Navbar";
import { useLocation, useParams } from 'react-router-dom';
import { useState } from "react";
import MarketplaceJSON from "../erc721.json";
import tradeJSON from "../trade.json";
import proxyJSON from "../proxy.json"
import maticJSON from "../wmatic.json"
import axios from "axios";


export default function Trade (tokenId) {
    const [formParams, updateFormParams] = useState({ name: '', description: '', price: ''});
    const [data, updateData] = useState({});
    const [dataFetched, updateDataFetched] = useState(false);
    const [message, updateMessage] = useState("");
    const [currAddress, updateCurrAddress] = useState("0x");

    async function setApprovalForAll(tokenId) {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    let setapproval = await contract.setApprovalForAll(tradeJSON.address,true)
    }

    async function changeOperator(){
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        let contract = new ethers.Contract(proxyJSON.address, proxyJSON.abi, signer)
        let changeOperator = await contract.changeOperator(tradeJSON.address)
    }

    async function wrappedETHtransfer(){
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        let price = formParams.price * 1e18
        let contract = new ethers.Contract(maticJSON.address, maticJSON.abi, signer)
        let deposit = await contract.deposit({value:formParams.price})
    }

    async function approve() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        let contract = new ethers.Contract(maticJSON.address, maticJSON.abi, signer)
        console.log(signer);
        let approve = await contract.approve(proxyJSON.address,formParams.price)
        
    }

    async function NFTapprove() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        let approve = await contract.approve(tradeJSON.address,formParams.tokenId)


    }
    async function ExecuteBid(tokenId){
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const addr = await signer.getAddress();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        const tokenURI = await contract.tokenURI(tokenId);
        const listedToken = await contract.getListedTokenForId(tokenId);
        let meta = await axios.get(tokenURI);
        meta = meta.data;
        console.log(listedToken);
    
        let item = {
            price: meta.price,
            tokenId: tokenId,
            seller: listedToken.seller,
            owner: listedToken.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        console.log(item);
        updateData(item);
        updateDataFetched(true);
        console.log("address", addr)
        updateCurrAddress(addr);
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        // address seller;
        // address buyer;
        // address erc20Address;
        // address nftAddress;
        // BuyingAssetType nftType;
        // uint256 unitPrice;
        // bool skipRoyalty;
        // uint256 amount;
        // uint256 tokenId;
        // string tokenURI;
        // uint256 supply;
        // uint96 royaltyFee;
        // uint256 qty;

        console.log(addr);
        console.log(formParams.BuyerAddress);
        console.log(MarketplaceJSON.address);
        console.log(formParams.tokenId);
        console.log(meta.tokenURI);
        let salePrice = formParams.listingprice * 1e18
        // let bid = await contract.executeBid([addr,formParams.BuyerAddress, MarketplaceJSON.address,1,1,1,1,formParams.tokenId,meta.tokenURI,1,10,1])
    }   
    return (
        <div className="">
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Deposit amount</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.price} onChange={e => updateFormParams({...formParams, price: e.target.value})}></input>
                </div>
                <div className="mb-6">
                <button onClick={wrappedETHtransfer} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                deposit
                </button>
                </div>
                <div className="mb-6">
                <button onClick={approve} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                approve
                </button>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price"> token id</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="token id" value={formParams.tokenId} onChange={e => updateFormParams({...formParams, tokenId: e.target.value})}></input>
                </div>
                <div className="mb-6">
                <button onClick={NFTapprove} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                NFTapprove
                </button>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">Listing Price</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Min 0.01 ETH" step="0.01" value={formParams.listingprice} onChange={e => updateFormParams({...formParams, listingprice: e.target.value})}></input>
                </div>
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price">BuyerAddress</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="BuyerAddress" step="0.01" value={formParams.BuyerAddress} onChange={e => updateFormParams({...formParams, BuyerAddress: e.target.value})}></input>
                </div>
                <div className="mb-6">
                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="price"> token id</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="token id" value={formParams.tokenId} onChange={e => updateFormParams({...formParams, tokenId: e.target.value})}></input>
                </div>
                <button onClick={ExecuteBid} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                ExecuteBid
                </button>
                </div>
        </div>
        </div>

    )
}


