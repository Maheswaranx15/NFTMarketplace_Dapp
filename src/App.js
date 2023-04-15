import './App.css';
import Navbar from './components/Navbar.js';
import Marketplace from './components/Marketplace';
import Profile from './components/Profile';
import SellNFT from './components/SellNFT';
import NFTPage from './components/NFTpage';
import Form from './components/CollectionCreation'
import TradeContract from './components/Trade';
import MultipleNFT from './components/MultipleNFT';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="container">
        <Routes>
          <Route path="/" element={<Marketplace />}/>
          <Route path="/nftPage" element={<NFTPage />}/>        
          <Route path="/profile" element={<Profile />}/>
          <Route path='/create' element={<Form/>}/> 
          <Route path='/trade' element={<TradeContract/>}/> 
          <Route path='/multiple' element={<MultipleNFT/>}/> 
        </Routes>
    </div>
  );
}

export default App;
