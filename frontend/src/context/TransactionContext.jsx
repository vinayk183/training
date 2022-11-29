import React, { useState } from "react"; 
import { ethers } from "ethers"; 
import { contractABI, contractAddress } from "../utils/constants"

export const TransactionContext = React.createContext(); 
 
const getEthereumContract = () => { 
  const provider = new ethers.providers.Web3Provider(window.ethereum); 
  const signer = provider.getSigner(); 
  const transactionContract = new ethers.Contract( 
    contractAddress, 
    contractABI, 
    signer 
  ); 
  return transactionContract; 
}; 
 
export const TransactionProvider = ({ children }) => { 
  const [currentAccount, setCurrentAccount] = useState();
  const [formData, setFormData] = useState({ 
    addressTo: "", 
    amount: "", 
  }); 
 
  const handle_change = (e, name) => { 
    setFormData(prevState => ({ ...prevState, [name]: e.target.value })); 
  }; 
 
  const connectWallet = async () => { 
    if (typeof window.ethereum !== 'undefined') { 
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); 
      setCurrentAccount(accounts[0]); 
    } else { 
      window.open("https://metamask.io"); 
    } 
  }; 
 
  const sendTransaction = async (connectedAccount = currentAccount) => {
    try {
      if (!window.ethereum) return alert("Please install Metamask.");

      const { addressTo, amount } = formData;
      const transactionContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      const _txHash = await window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [{
            from: connectedAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          }],
        });

      console.log(_txHash);

      const transactionHash = await transactionContract.addToBlockchain(
        addressTo,
        parsedAmount
      );
      console.log(`Loading - ${transactionHash.hash}`);
      await transactionHash.wait();
      console.log(`Success - ${transactionHash.hash}`);
    } catch (error) {
      console.error(error);
    }
  };
 
  return ( 
    <TransactionContext.Provider value={{ 
      connectWallet, 
      currentAccount, 
      formData, 
      setFormData, 
      handle_change, 
      sendTransaction 
    }}> 
      {children} 
    </TransactionContext.Provider> 
  ); 
}; 