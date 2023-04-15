import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SellNFT from './components/SellNFT';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import NFTPage from './components/NFTpage';
import Form from './components/CollectionCreation';
import CollectionDetails from './components/collectiondetails';
import TradeContract from './components/Trade';
import MultipleNFT from './components/MultipleNFT';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Marketplace />}/>

        <Route path="/nftPage/:tokenId" element={<NFTPage />}/>        
        <Route path="/collections/:id" element={<CollectionDetails/>}/>        
        <Route path="/profile" element={<Profile />}/> 
        <Route path='/create' element={<Form/>}/>
        <Route path='/trade' element={<TradeContract/>}/>
        <Route path='/multiple' element={<MultipleNFT/>}/> 

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
