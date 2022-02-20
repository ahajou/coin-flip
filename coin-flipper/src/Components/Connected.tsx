import { useState } from "react";
import { Game } from "../Models/Game";
import { Games } from "./Games";

export const Connected = ({ games, account, balance, placeBet }:
    {
        games: Game[],
        account: string,
        balance: number,
        placeBet: (amountToBet: number) => Promise<void>
    }) => {
        const [amountToBet, setAmountToBet] = useState<number>(0.1);

        const bet = async () => {
            await placeBet(amountToBet);
        };

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

                <Games games={games} />
            </>
        );
}
