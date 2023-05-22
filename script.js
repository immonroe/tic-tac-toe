// Create a Gameboard module
const Gameboard = (function() {
    let board = [];
  
    function initializeBoard(size) {
      board = Array(size).fill(null).map(() => Array(size).fill(null));
    }
  
    function getCell(row, col) {
      return board[row][col];
    }
  
    function setCell(row, col, value) {
      board[row][col] = value;
    }
  
    function printBoard() {
      console.log(board);
    }
  
    return {
      initializeBoard,
      getCell,
      setCell,
      printBoard
    };
  })();

// Create a player factory function
const Player = (name, symbol) => {
    function makeMove() {
      // Logic for the player to make a move goes here
      // Example:
      // Prompt the user for input or generate a random move for the computer
    }
  
    return {
      name,
      symbol,
      makeMove
    };
  };

// Create a gameboard and initialize it
Gameboard.initializeBoard(3); //using 3x3 rows for tic-tac-toe board

// Set cells on the game board - examples below
Gameboard.setCell(0, 0, 'X');
Gameboard.setCell(1, 1, 'O');
Gameboard.setCell(2, 2, 'X');

// Print the game board
Gameboard.printBoard();

// Create players using the Player factory function
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

// Make moves
const move1 = player1.makeMove();
const move2 = player2.makeMove();