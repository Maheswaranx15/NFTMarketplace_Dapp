import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import collectionContract from '../collectionContract.json';
import { useLocation } from "react-router";
import { db } from "../firebase-config";
import { NFTS, addDoc } from "firebase/firestore";

export default function MintNFT () {
    const NFTDetails = NFTS(db, "NFTS");
    const [formParams, updateFormParams] = useState({ name: '', Symbol: '', royalty: ''});
    const [fileURL, setFileURL] = useState(null);
    const ethers = require("ethers");
    const [message, updateMessage] = useState('');
    const location = useLocation();
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [Symbol, setSymbol] = useState("");
    const [royalty, setroyalty] = useState("");


  

    //This function uploads the NFT image to IPFS
    async function OnChangeFile(e) {
        var file = e.target.files[0];
        //check for file extension
        try {
            //upload the file to IPFS
            const response = await uploadFileToIPFS(file);
            if(response.success === true) {
                console.log("Uploaded image to Pinata: ", response.pinataURL)
                setFileURL(response.pinataURL);
            }
        }
        catch(e) {
            console.log("Error during file upload", e);
        }
    }
    
    //This function uploads the metadata to IPFS
    async function uploadMetadataToIPFS() {
        const {name, Symbol, royalty} = formParams;
        //Make sure that none of the fields are empty
        if( !name || !Symbol || !royalty || !fileURL)
            return;
        const collectionId  = location.pathname.split('/')[2];
        const nftJSON = {
            name, Symbol, royalty, image: fileURL, collectionId,
        }
        try {
            //upload the metadata JSON to IPFS
            const response = await uploadJSONToIPFS(nftJSON);
            if(response.success === true){
                console.log("Uploaded JSON to Pinata: ", response)
                return response.pinataURL;
            }
        }
        catch(e) {
            console.log("error uploading JSON metadata:", e)
        }
    }

    async function listNFT(e) {
        e.preventDefault();

        //Upload data to IPFS
        try {
            const metadataURL = await uploadMetadataToIPFS();
            //After adding your Hardhat network to your metamask, this code will get providers and signers
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            updateMessage("Please wait.. uploading (upto 2 mins)")

            //Pull the deployed contract instance
            let contract = new ethers.Contract(collectionContract.address, collectionContract.abi, signer)

            //actually create the NFT
            let transaction = await contract.createToken(metadataURL, formParams.royalty)
            await transaction.wait()
            alert("Successfully listed your NFT!");
            updateMessage("");
            updateFormParams({ name: '', Symbol: '', royalty: ''});
            window.location.replace("/")
        }
        catch(e) {
            alert( "Upload error"+e )
        }
    }
    async function NftDetails () {
       await listNFT()
       addDoc(NFTDetails,{name:formParams.name, Symbol:formParams.Symbol,royalty: formParams.royalty, image: fileURL}) 
    }
    console.log("Working", process.env);
    return (
        <div className="">
        <div className="flex flex-col place-items-center mt-10" id="nftForm">
            <form className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
            <h3 className="text-center font-bold text-purple-500 mb-8">{location.pathname.split('/')[2]}</h3>
            {/* <h3 className="text-center font-bold text-purple-500 mb-8">Create NFT</h3> */}
         
                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Name</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="NFT name" onChange={e => updateFormParams({...formParams, name: e.target.value})} value={formParams.name}></input>
                </div>

                <div className="mb-4">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="name">NFT Symbol</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="NFT Symbol" onChange={e => updateFormParams({...formParams, Symbol: e.target.value})} value={formParams.Symbol}></input>
                </div>

                <div className="mb-6">
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="Royalty">Royalty</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="number" placeholder="Royalty" step="0.01" value={formParams.royalty} onChange={e => updateFormParams({...formParams, royalty: e.target.value})}></input>
                </div>
                <div>
                    <label className="block text-purple-500 text-sm font-bold mb-2" htmlFor="image">Upload Image</label>
                    <input type={"file"} onChange={OnChangeFile}></input>
                </div>
                <br></br>
                <div className="text-green text-center">{message}</div>
                <button onClick={NftDetails} className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg">
                    Mint NFT
                </button>
            </form>
        </div>
        </div>
    )
}