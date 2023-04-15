import Navbar from "./Navbar";
import { useState } from "react";
import { uploadFileToIPFS } from "../pinata";
import { db } from "../firebase-config";
import { collection, addDoc } from "firebase/firestore";
// import deployCollection from '../Factory.json'
import FactoryContract from '../NewFactory.json'

export default function Form() {
  var contractAddr ;
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [fileURL, setFileURL] = useState("");
  const [message] = useState("");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [collectionAddr, setcollectionAddr] = useState("");
  const categoryCollectionRef = collection(db, "category");
  async function deploy() {
    const ethers = require("ethers");
    let baseURI = 'https://gateway.pinata.cloud/ipfs/'
    let salt = ethers.utils.formatBytes32String(name);
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(FactoryContract.address, FactoryContract.abi, signer)
    let transaction = await contract.deploy()
    var receipt = await transaction.wait();
    console.log("contractAddress",receipt.events[2].args["contractAddress"])
    contractAddr = receipt.events[2].args["contractAddress"];
    await setcollectionAddr(contractAddr);

  }


  const createCategory = async () => {
    deploy();
    await addDoc(categoryCollectionRef, { name: name, des: desc, url:fileURL , collectionAddress : contractAddr });
  };

  //This function uploads the NFT image to IPFS
  async function OnChangeFile(e) {
    var file = e.target.files[0];
    //check for file extension
    try {
      //upload the file to IPFS
      const response = await uploadFileToIPFS(file);
      if (response.success === true) {
        console.log("Uploaded image to Pinata: ", response.pinataURL);
        setFileURL(response.pinataURL);
      }
    } catch (e) {
      console.log("Error during file upload", e);
    }
  }

  console.log("Working", process.env);

  
  return (
    <div className="">
      <Navbar></Navbar>
      <div className="flex flex-col place-items-center mt-10" id="nftForm">
      <div className="bg-white shadow-md rounded px-8 pt-4 pb-8 mb-4">
          <h3 className="text-center font-bold text-purple-500 mb-8">
            Create Collection
          </h3>
          <div className="mb-4">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="name"
              required
            >
              CollectionName
            </label>
            <input
              onChange={(event) => {
                setName(event.target.value);
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Collection name"
            ></input>
          </div>
          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="description"
              required
            >
              CollectionDescription
            </label>
            <textarea
              onChange={(event) => setDesc(event.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              cols="40"
              rows="5"
              id="description"
              type="text"
              placeholder="Collection description"
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="TokenURL"
              required
            >
              TokenURL
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="https://ipfs.io/TokenURL"
              value={formParams.price}
              onChange={(e) =>
                updateFormParams({ ...formParams, price: e.target.value })
              }
            ></input>
          </div>

          <div>
            <label
              className="block text-purple-500 text-sm font-bold mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input type={"file"} onChange={OnChangeFile}></input>
          </div>
          <br></br>
          <div className="text-green text-center">{message}</div>
          <button
            onClick={createCategory}
            type="submit"
            className="font-bold mt-10 w-full bg-purple-500 text-white rounded p-2 shadow-lg"
          >
            Create Collection
          </button>
          </div>
      </div>
    </div>
  );
}
