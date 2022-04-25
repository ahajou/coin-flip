import { useEffect, useState } from "react";
import "./App.css";
import Web3 from "web3";
import contract from "./CoinFlip.json";
import { Contract } from "web3-eth-contract";
import { Game } from "./Models/Game";
import { Connected } from "./Components/Connected";
import { useWeb3React } from "@web3-react/core";
import { injected } from "./Components/wallet/WalletConnector";
import { getContract } from "./Components/wallet/Contract";

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI: any = contract.abi;

function HomePage() {
  const web3ReactContext = useWeb3React();

  //   const [accounts, setAccount] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);

  const [web3, setWeb3] = useState<Web3>();
  const [contract, setContract] = useState<Contract>();
  const [games, setGames] = useState<Game[]>([]);

  const refreshGames = async (web3: Web3, cc: Contract) => {
    const newGamesList: Game[] = [];

    const gameCount = await cc.methods.getGameCount().call();
    for (var i = gameCount - 1; i >= 0; i--) {
      const game = await cc.methods.getGameEntry(i).call();
      newGamesList.push({
        addr: game.addr,
        blocknumber: game.blocknumber,
        blocktimestamp: game.blocktimestamp,
        bet: +web3.utils.fromWei(game.bet, "ether"),
        prize: +web3.utils.fromWei(game.prize, "ether"),
        winner: game.winner,
      });
    }

    setGames(newGamesList);
  };

  const refreshBalance = async (web3: Web3) => {
    if (
      web3ReactContext.account !== undefined &&
      web3ReactContext.account !== null
    ) {
      const bb = await web3.eth.getBalance(web3ReactContext.account);
      setBalance(+web3.utils.fromWei(bb, "ether"));
    }
  };

  const initConnection = async (web3: Web3) => {
    // setAccount(account);
    try {
      await web3ReactContext.activate(injected);
    } catch (err) {
      console.log(err);
    }
    const gameContract = getContract(
      web3ReactContext.library,
      web3ReactContext.account
    );
    setContract(gameContract);

    await refreshBalance(web3);
    await refreshGames(web3, gameContract);
  };

  const connect = async () => {
    // if (!web3) {
    //   return;
    // }
    // const accounts = await web3?.eth.requestAccounts();
    // if (!accounts) {
    //   return;
    // }
    // await initConnection(web3, accounts[0]);
    // if (!active) {
    //   return;
    // }
    // if (!account) {
    //   return;
    // }
    // if (web3 != undefined) {
    //   try {
    //     await initConnection(web3);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
  };

  useEffect(() => {
    // const checkConnection = async function () {
    //   const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    //   setWeb3(web3);

    //   try {
    //     const accounts = await web3.eth.getAccounts();
    //     await initConnection(web3, accounts[0]);
    //   } catch {}
    // };

    // checkConnection();

    const checkConnection = async function () {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      setWeb3(web3);

      try {
        await initConnection(web3);
      } catch {}
    };
    checkConnection();
  }, []);

  const bet = async (amountToBet: number) => {
    // if (!contract || !web3 || !account) {
    //   return;
    // }
    // await contract.methods.play().send({
    //   from: account,
    //   value: web3.utils.toWei(amountToBet.toString(), "ether"),
    // });
    // console.log(response);
    // await refreshGames(web3, contract);
    // await refreshBalance(web3);
  };

  return (
    <div
      style={{
        textAlign: "center",
      }}
    >
      <h1
        style={{
          color: "blue",
        }}
      >
        Coin Flipper
      </h1>
      {web3ReactContext.active ? (
        <Connected
          games={games}
          account={!web3ReactContext.account ? "" : web3ReactContext.account}
          balance={balance}
          placeBet={bet}
        />
      ) : (
        <div>
          <div role="alert">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="exclamation-triangle"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path
                fill="currentColor"
                d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
              ></path>
            </svg>
            No account connected.
          </div>
          <button onClick={connect}>Connect</button>
        </div>
      )}
    </div>
  );
}

export default HomePage;
