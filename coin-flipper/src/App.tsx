import { useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import contract from './CoinFlip.json';
import { Contract } from 'web3-eth-contract';
import { Game } from './Models/Game';
import { Connected } from './Components/Connected';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI:any = contract.abi;

function App() {
  const [account, setAccount] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);

  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<Contract>();
  const [games, setGames] = useState<Game[]>([]);
  
  const refreshGames = async (web3: Web3, cc: Contract) => {
    const newGamesList:Game[] = [];

    const gameCount = await cc.methods.getGameCount().call();
    for (var i = gameCount - 1; i >= 0; i--) {
      const game = await cc.methods.getGameEntry(i).call();
      newGamesList.push({
        addr: game.addr,
        blocknumber: game.blocknumber,
        blocktimestamp: game.blocktimestamp,
        bet: +web3.utils.fromWei(game.bet, 'ether'),
        prize: +web3.utils.fromWei(game.prize, 'ether'),
        winner: game.winner
      });
    }

    setGames(newGamesList);
  }

  const refreshBalance = async (web3: Web3, account: string) => {
    const bb = await web3.eth.getBalance(account);
    setBalance(+web3.utils.fromWei(bb, 'ether'));
  }

  const initConnection = async (web3: Web3, account: string) => {
    setAccount(account);

    const gameContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    setContract(gameContract);

    await refreshBalance(web3, account);
    await refreshGames(web3, gameContract);
  };

  const connect = async () => {
    if(!web3) {
      return;
    }

    const accounts = await web3?.eth.requestAccounts();
    if(!accounts) {
      return;
    }

    await initConnection(web3, accounts[0]);
  }

  useEffect(() => {
    const checkConnection = async function () {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      setWeb3(web3);
      
      try {
        const accounts = await web3.eth.getAccounts();
        await initConnection(web3, accounts[0]);
      }
      catch {

      }
    }

    checkConnection();
  }, []);

  const bet = async (amountToBet: number) => {
    if(!contract || !web3 || !account) {
      return;
    }

    await contract.methods.play().send({from: account, value: web3.utils.toWei(amountToBet.toString(), 'ether')});
    // console.log(response);

    await refreshGames(web3, contract);
    await refreshBalance(web3, account);
  }

  return (
    <div className='main-app'>
      <h1>Coin Flip application</h1>
      {account 
        ? <Connected games={games} account={account} balance={balance} placeBet={bet} />
        : <div><i>No account connected.</i> <button onClick={connect}>Connect</button></div>
      }
    </div>
  );
}

export default App;
