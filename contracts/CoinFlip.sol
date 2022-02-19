// code inspired by: https://github.com/mariopino/ethereum-coinflip/blob/master/CoinFlip.sol
pragma solidity ^0.8.0;

contract CoinFlip {
    address payable public owner;
    uint public payPercentage = 90;

    // Maximum amount to bet in WEIs
	uint public max = 200000000000000000; // = 0.2 Ether
	uint public min = 20000000000000000; // = 0.02 Ether

    struct Game {
		address addr;
		uint blocknumber;
		uint blocktimestamp;
        uint bet;
		uint prize;
        bool winner;
    }

    // the played games so far
    Game[] private playedGames;

    event Status(
		string _msg, 
		address user, 
		uint amount,
		bool winner
	);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        if (owner != msg.sender) {
            revert("Only for owner");
        } else {
            _;
        }
    }

    function depositFunds() public onlyOwner payable {
        require(msg.value >= 1 ether, "Deposit at least 1 ether");
    }

    function withdrawFunds(uint amount) public onlyOwner {
        owner.transfer(amount);
    }
	    
    function kill() public onlyOwner {
        selfdestruct(owner);
    }

    function getGameCount() public view returns(uint) {
		return playedGames.length;
	}
    
    function getGameEntry(uint index) public view returns(address addr,
        uint blocknumber,
        uint blocktimestamp, uint bet, uint prize, bool winner) {
		return (
            playedGames[index].addr,
            playedGames[index].blocknumber,
            playedGames[index].blocktimestamp,
            playedGames[index].bet,
            playedGames[index].prize,
            playedGames[index].winner
        );
	}

    function play() public payable {	
        if(msg.value < min) {
            revert("Not enough amount");
        }

		if (msg.value > max) {
			revert("Amount bigger than max");
		}

        string memory _message;
        uint _prize = 0;
        bool _winner;

        if ((block.timestamp % 2) == 0) {
            _winner = true;
            if (address(this).balance < (msg.value * ((100 + payPercentage) / 100))) {                
                _message = "Congratulations, you win! Sorry, not enought funds, everything is deposited!";
                _prize = address(this).balance;                
            } else {
                _prize = msg.value * (100 + payPercentage) / 100;
                _message = "Congratulations, you win!";                
            }
            
            payable(msg.sender).transfer(_prize);                
                
        } else {
            _message = "Sorry, you lose!";
            _winner = false;
        }

        Game memory newGame = Game({
            addr: msg.sender,
            blocknumber: block.number,
            blocktimestamp: block.timestamp,
            bet: msg.value,
            prize: _prize,
            winner: _winner
        });
        playedGames.push(newGame);

        emit Status(_message, msg.sender, _prize, _winner);
    }
}
