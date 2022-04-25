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
      <Paper className="class-paper">
        <div className="class-details class-labels">Account:</div>
        <div className="class-details">{account}</div>
      </Paper>
      <Paper className="class-paper">
        <div className="class-details class-labels">Balance:</div>
        <div className="class-details">{balance}</div>
      </Paper>
      <div className="betting-table">
        <Box className="bet-input">
          <TextField
            id="outlined-number"
            type="number"
            label="number"
            onChange={(e) => setAmountToBet(+e.target.value)}
            value={amountToBet}
            inputProps={inputProps}
          />
        </Box>
        <Button className="bet-btn" variant="contained" onClick={bet}>
          Bet
        </Button>
      </div>

      <Games games={games} />
    </>
  );
};
