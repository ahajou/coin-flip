import contract from "../../CoinFlip.json";
import { Contract } from "web3-eth-contract";

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const CONTRACT_ABI = contract.abi;

export const getContract = (library, account) => {
  const signer = library.getSigner(account).connectUnchecked();
  var contract = new Contract(CONTRACT_ABI, contractAddress, signer);
  return contract;
};
