import { ChangeEvent, useEffect, useState } from 'react';
import './App.css';
import Web3 from 'web3';
import contract from './CoinFlip.json';
import { Contract } from 'web3-eth-contract';

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI:any = contract.abi;

interface Game {
  addr: string;
  blocknumber: number;
  blocktimestamp: number;
  bet: number;
  prize: number;
  winner: boolean;
}

function App() {
  const [account, setAccount] = useState<string>();
  const [balance, setBalance] = useState<number>();

  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<Contract>();
  const [games, setGames] = useState<Game[]>();
  
  const [amountToBet, setAmountToBet] = useState<number>(0.1);

  const refreshGames = async (cc: Contract) => {
    const newGamesList:Game[] = [];

    const gameCount = await cc.methods.getGameCount().call();
    for (var i = gameCount - 1; i >= 0; i--) {
      const game = await cc.methods.getGameEntry(i).call();
      newGamesList.push({
        addr: game.addr,
        blocknumber: game.blocknumber,
        blocktimestamp: game.blocktimestamp,
        bet: game.bet,
        prize: game.prize,
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
    await refreshGames(gameContract);
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

  const bet = async () => {
    if(!contract || !web3 || !account) {
      return;
    }

    const response = await contract.methods.play().send({from: account, value: web3.utils.toWei(amountToBet.toString(), 'ether')});
    console.log(response);

    await refreshGames(contract);
    await refreshBalance(web3, account);
  }

  const displayPreviousGames = () => {
    if(!games) {
      return (<div>No previous games</div>);
    }

    return (
      <table className='games'>
        <thead>
          <tr>
            <th>Address</th>
            <th>block</th>
            <th>timestamp</th>
            <th>winner</th>
            <th>bet</th>
            <th>prize</th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
            <tr className='game' key={index}>
              <td>{game.addr}</td>
              <td>{game.blocknumber}</td>
              <td>{game.blocktimestamp}</td>
              <td>{game.winner.toString()}</td>
              <td>{web3?.utils.fromWei(game.bet.toString(), 'ether')}</td>
              <td>{web3?.utils.fromWei(game.prize.toString(), 'ether')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const getConnectedHtml = () => {
    return (
      <>
        <div>Your account is: {account}</div>
        <div>Your balance is: {balance} ethers.</div>

        <br />
        <br />

        <input 
          value={amountToBet}
          onChange={e => setAmountToBet(+e.target.value)}
          type="number"
          step="0.001"
          min={0.02}
          max={0.2}
          />
        <button onClick={bet}>Place bet</button>

        <br />
        <br />

        {displayPreviousGames()}
      </>
    );
  }
  

  return (
    <div className='main-app'>
      <h1>Coin Flip application</h1>
      {account 
        ? getConnectedHtml()
        : <div><i>No account connected.</i> <button onClick={connect}>Connect</button></div>
      }
    </div>
  );
}

export default App;
