import { useState } from "react";
import { Game } from "../Models/Game";
import { Games } from "./Games";
import { Button, Input, Paper, TextField, Box } from "@mui/material";
import "../App.css";

export const Connected = ({
  games,
  account,
  balance,
  placeBet,
}: {
  games: Game[];
  account: string;
  balance: number;
  placeBet: (amountToBet: number) => Promise<void>;
}) => {
  const [amountToBet, setAmountToBet] = useState<number>(0.1);

  const inputProps = {
    step: 0.001,
    min: 0.002,
    max: 0.2,
  };

  const bet = async () => {
    await placeBet(amountToBet);
  };

  return (
    <>
      <Paper className="account-paper">{account}</Paper>
      <Paper className="balance-paper">{balance}</Paper>
      {/* <div className="flex space-x-2 justify-center">
                    <div className="bg-white shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
                        <div className=" bg-white flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-gray-200 rounded-t-lg">
                            <p className="font-bold text-gray-500">Account</p>
                            <div className="flex items-center">
                                <p className="text-gray-600 text-xs">{account}</p>
                            </div>
                        </div>
                    </div>
                </div> */}
      {/* <div className="flex space-x-2 justify-center">
                    <div className="bg-white shadow-lg mx-auto w-96 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block" id="static-example" role="alert" aria-live="assertive" aria-atomic="true" data-mdb-autohide="false">
                        <div className=" bg-white flex justify-between items-center py-2 px-3 bg-clip-padding border-b border-gray-200 rounded-t-lg">
                            <p className="font-bold text-gray-500">Balance</p>
                            <div className="flex items-center">
                                <p className="text-gray-600 text-xs">{balance}</p>
                            </div>
                        </div>
                    </div>
                </div> */}

      <br />
      <br />

      <div className="flex space-x-2 justify-center">
        {/* <input
          value={amountToBet}
          onChange={(e) => setAmountToBet(+e.target.value)}
          type="number"
          step="0.001"
          min={0.02}
          max={0.2}
          className="border border-black appearance-none"
        /> */}
        <Box>
          <TextField
            id="outlined-number"
            type="number"
            label="number"
            onChange={(e) => setAmountToBet(+e.target.value)}
            value={amountToBet}
            inputProps={inputProps}
          />
        </Box>
        {/* <button
          type="button"
          onClick={bet}
          className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          Place bet
        </button> */}
        <Button variant="contained" onClick={bet}>
          Contained
        </Button>
      </div>

      <Games games={games} />
    </>
  );
};
