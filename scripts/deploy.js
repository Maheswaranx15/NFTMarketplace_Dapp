const { ethers } = require("hardhat");
const hre = require("hardhat");
const fs = require("fs");

let name= "TestContract721"
let symbol= 'Test721'
let _baseTokenURI= "https://ipfs.io/"

async function main() {
  const [deployer] = await ethers.getSigners();

  // const ERC721 = await hre.ethers.getContractFactory("NFTMarketplace");
  // const erc721 = await ERC721.deploy();
  // await erc721.deployed();

  // const ERC1155 = await hre.ethers.getContractFactory("LootmogulUser1155Token");
  // const erc1155 = await ERC1155.deploy(name,symbol,_baseTokenURI);
  // await erc1155.deployed();

  // const TransferProxy = await hre.ethers.getContractFactory("TransferProxy");
  // const proxy = await TransferProxy.deploy();
  // await proxy.deployed();
  // await proxy.changeOperator('0x7437243620d140D64E63613df030b6C6A93b085d')

  // const Trade = await hre.ethers.getContractFactory("Trade");
  // const trade = await Trade.deploy(25,25,proxy.address);
  // await trade.deployed();

  // console.log(`ERC721` , erc721.address);
  // console.log(`TransferProxy` , proxy.address);
  // console.log(`Trade` , trade.address);

  // const erc721data = {
  //   address: erc721.address,
  //   abi: JSON.parse(erc721.interface.format('json'))
  // }
  // const proxydata = {
  //   address: proxy.address,
  //   abi: JSON.parse(proxy.interface.format('json'))
  // }
  // const tradedata = {
  //   address: trade.address,
  //   abi: JSON.parse(trade.interface.format('json'))
  // }
  //  const erc1155data = {
  //   address: erc1155.address,
  //   abi: JSON.parse(erc1155.interface.format('json'))
  // }
  // fs.writeFileSync('./src/erc1155.json', JSON.stringify(erc1155data))
  // fs.writeFileSync('./src/proxy.json', JSON.stringify(proxydata))
  // fs.writeFileSync('./src/trade.json', JSON.stringify(tradedata))

  // await hre.run("verify:verify", {
  //     address: "0xE30f3096deFe694ABfAb55BF42898Bd78E1E8AEB",
  //     constructorArguments: [name,symbol,_baseTokenURI],
  // });

  // await hre.run("verify:verify", {
  //   address: "0x31fa01a4b8b7b966b43E1C5aaDF344fAc2575406",
  //   constructorArguments: [],
  // });

  // await hre.run("verify:verify", {
  //   address: "0x7437243620d140D64E63613df030b6C6A93b085d",
  //   constructorArguments: [25,25,"0xDEC2c7865BBDA2aBC0e9a58F44B0EAE899787533"],
  // });

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});
