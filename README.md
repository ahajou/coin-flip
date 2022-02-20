# Coinflip application

The purpose of the project is to demonstrate a full stack application in Web3.

Frontend:
* React
* Web3.js

Backend:
* Hardhat
* Solidity

# How to run

Backend:
* In the root directory of the application, run
  * `npm install`
* Then run
  * `npx hardhat node`
  * This will start a blockchain running on localhost
  * Save the private keys of the pre-loaded account
* Open a new terminal window in the same directory, then run
  * `npx hardhat run .\scripts\deploy.ts --network localhost`
  * This will deploy the coinflip contract to the running blockchain
* Copy the contract address deployed
  * *starting with 0x.....*

Frontend
* In the code editor, navigate to App.tsx in the folder: `\coin-flipper\src`
* Navigate to the subfolder coinflipper in the terminal window
* Run `npm install`
* Run `npm start`
* In metamask browser extension, make sure you are connecting to the local host network
  * Parameters to add if not available
    * RPX URL: `http://127.0.0.1:8545/`
    * Chain id: `31337`
* You can configure one of the preloaded account that are saved earlier

# How to run tests

Backend:
* In the root directory of the application, run
  * `npm install`
* Then run
  * `npx hardhat test`

# Todo/Improvements

- [x] Create a solidity contract to flip a coin
- [x] Create tests to test the functionality of the contract
- [x] Create a frontend react application to interact from the contract
- [x] Implement connect button functionality (instead of just connecting at app start)
- [ ] Replace web3 with web3-react
- [x] Split App.tsx to separate components
- [ ] Styling with Tailwind CSS
- [ ] Deploy backend to one of etherum test networks
- [ ] Deploy frontend to a static hosting service (like github pages)

# Common issues faced and solutions

## Error: nonce too high
This error appears after restarting the local blockchain
To get rid, please reset the account in Metamask, please refer to this [article](https://medium.com/@thelasthash/solved-nonce-too-high-error-with-metamask-and-hardhat-adc66f092cd).
