import * as React from "react";
import { Game } from "../Models/Game";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export const Games = ({ games }: { games: Game[] }) => {
  const gamess: Game[] = [
    {
      addr: "0x243598876345sd",
      blocknumber: 23,
      blocktimestamp: 45,
      winner: true,
      bet: 0.02,
      prize: 0.03,
    },
    {
      addr: "0x243598876345sd",
      blocknumber: 23,
      blocktimestamp: 45,
      winner: false,
      bet: 0.02,
      prize: 0.03,
    },
  ];
  if (!games || !games.length) {
    gamess.map((games, index) => {
      console.log(games);
    });
    return (
      <div
        role="alert"
      >
        No previous games
      </div>
      //   <div className="flex flex-col">
      //     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
      //       <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      //         <div className="overflow-hidden">
      //           <TableContainer component={Paper}>
      //             <Table sx={{ minWidth: 650 }} aria-label="simple table">
      //               <TableHead>
      //                 <TableRow>
      //                   <TableCell align="center">Address</TableCell>
      //                   <TableCell>Block</TableCell>
      //                   <TableCell>Heading</TableCell>
      //                   <TableCell>Winner</TableCell>
      //                   <TableCell>Bet</TableCell>
      //                   <TableCell>Prize</TableCell>
      //                 </TableRow>
      //               </TableHead>
      //               <TableBody>
      //                 {gamess.map((games) => {
      //                   <TableRow
      //                     className={`border-b ${
      //                       games.winner
      //                         ? "bg-green-100 border-green-200"
      //                         : "bg-red-100 border-red-200"
      //                     }`}
      //                     key={games.addr}
      //                     sx={{
      //                       "&:last-child td, &:last-child th": { border: 0 },
      //                     }}
      //                   >
      //                     <TableCell component="th" scope="row">
      //                       {games.addr}
      //                     </TableCell>
      //                     <TableCell>{games.blocknumber}</TableCell>
      //                     <TableCell>{games.blocktimestamp}</TableCell>
      //                     <TableCell>{games.winner.toString()}</TableCell>
      //                     <TableCell>{games.bet}</TableCell>
      //                     <TableCell>{games.prize}</TableCell>
      //                   </TableRow>;
      //                 })}
      //               </TableBody>
      //             </Table>
      //           </TableContainer>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
    );
  }

  return (
    // <div>
    //   <TableContainer component={Paper}>
    //     <Table>
    //       <TableHead>
    //         <TableRow>
    //           <TableCell align="center">Address</TableCell>
    //           <TableCell>Block</TableCell>
    //           <TableCell>Heading</TableCell>
    //           <TableCell>Winner</TableCell>
    //           <TableCell>Bet</TableCell>
    //           <TableCell>Prize</TableCell>
    //         </TableRow>
    //       </TableHead>
    //     </Table>
    //   </TableContainer>
    // </div>
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Address
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    block
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    Heading
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    winner
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    bet
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4"
                  >
                    prize
                  </th>
                </tr>
              </thead>
              <tbody>
                {games.map((game, index) => (
                  <tr
                    className={`border-b ${
                      game.winner
                        ? "bg-green-100 border-green-200"
                        : "bg-red-100 border-red-200"
                    }`}
                    key={index}
                  >
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
};
