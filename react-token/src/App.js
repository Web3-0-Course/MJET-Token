import React, { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import { CONTRACT_ABI, CONTRACT_ADDRESS} from './config';

const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
const MyJetContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);


function App() {
  const [account, setAccount] = useState();
  const [tokenBalance,setTokenBalance] = useState(0);
  const [newAddress, setNewAddress] = useState();
  const [amount, setAmount] = useState(0);
  const [connectionStatus, setConnection] = useState('Not Connected!!');
  

  const connect = async () => {
    const accounts = await web3.eth.requestAccounts();
    const balance = await MyJetContract.methods.balanceOf(accounts[0]).call();
    setConnection(`Connected to ${accounts[0]}`)
    setAccount(accounts[0]);
    setTokenBalance(balance)
    }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(amount,newAddress);
    const accounts = await web3.eth.requestAccounts();
    const sentTokens  = await MyJetContract.methods.transfer(newAddress,amount).send({from: accounts[0]});
    console.log(sentTokens);
    try{
      setTokenBalance(tokenBalance - amount)
    }catch(e)
    {console.log(e)}
    setAmount('');
    setNewAddress('');
  }

  const disconnect = () => {
    setAccount(null);
    setTokenBalance(0);
    setConnection("Not Connected!!")
  }



  return (
    <div className="App">
      <header className='App-header'>
      <h2>Account : {account}</h2>
      <div className='App-button-box'>
        <div className='App-connection'>
           {connectionStatus}
        </div>
      <button onClick={account ? disconnect : connect}> {account ?  'Disconnect' : 'Connect'}</button>
      <p><span>Token : </span>{tokenBalance} MJET</p>
      </div>
     

      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='Your Address' value={newAddress || ''} onChange={(e) => setNewAddress(e.target.value)} />
        <br />
        <input type='number' placeholder='Amount' value={amount || ''} onChange={(e) => setAmount(e.target.value)} />
        <br />
        <input type='text' value='MJET' disabled={true} />
        <br />
        <button type='submit'>Send MJET</button>

      </form>
      </header>
    </div>
  );
}

export default App;
