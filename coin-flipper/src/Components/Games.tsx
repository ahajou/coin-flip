import { Game } from "../Models/Game";

export const Games = ({ games }: {games: Game[]}) => {
    if(!games || !games.length) {
        return (
            <div className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
                No previous games
            </div>
        );
    }
  
    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full text-center">
                    <thead className="border-b">
                        <tr>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                Address
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                block
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                Heading
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                winner
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                bet
                            </th>
                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                                prize
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {games.map((game, index) => (
                            <tr className={`border-b ${game.winner ? "bg-green-100 border-green-200" : "bg-red-100 border-red-200"}`} key={index}>
                                <td className="text-sm text-gray-900 font-medium px-6 py-4 whitespace-nowrap">
                                    {game.addr}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {game.blocknumber}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {game.blocktimestamp}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {game.winner.toString()}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {game.bet}
                                </td>
                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                    {game.prize}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
}
