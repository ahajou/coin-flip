import { Game } from "../Models/Game";

export const Games = ({ games }: {games: Game[]}) => {
    if(!games || !games.length) {
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
                        <td>{game.bet}</td>
                        <td>{game.prize}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
