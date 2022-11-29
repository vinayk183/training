import React, { useContext } from 'react'; 
import './App.css'; 
import { TransactionContext } from './context/TransactionContext'; 
 
function App() { 
  const { connectWallet, formData, sendTransaction, 
handle_change } = useContext(TransactionContext); 
 
  const handleSubmit = (e) => { 
    const { addressTo, amount } = formData; 
    e.preventDefault(); 
    if (!addressTo || !amount) return; 
    sendTransaction(); 
  }; 
 
  return ( 
    <div className="App"> 
      <button class="connectButton" type="button" 
onClick={connectWallet}>Connect to Wallet</button> 
      <div> 
        <input name="addressTo" type="text" placeholder="0x address" 
onChange={e => handle_change(e, 'addressTo')} /> 
        <input name="amount" type="number" placeholder="0.0" onChange={e => 
handle_change(e, 'amount')} /> 
        <button class="sentButton" type="button" 
onClick={handleSubmit}>Send</button> 
      </div> 
    </div> 
  ); 
} 
 
export default App; 