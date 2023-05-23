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
// Gameboard.initializeBoard(3); //using 3x3 rows for tic-tac-toe board

// Set cells on the game board - examples below
// Gameboard.setCell(0, 0, 'X');
// Gameboard.setCell(1, 1, 'O');
// Gameboard.setCell(2, 2, 'X');

// Print the game board
Gameboard.printBoard();

// Create players using the Player factory function
const player1 = Player('Player 1', 'X');
const player2 = Player('Player 2', 'O');

// Make moves
const move1 = player1.makeMove();
const move2 = player2.makeMove();


// proof of concept

let playerSymbol = '';
let aiSymbol = '';
let cells = document.querySelectorAll(".cell")

cells.forEach(function(node){
  node.addEventListener('click', function(){
    if (playerSymbol == '') {
      playerSymbol = window.prompt('Would you like to be X or O?', 'X')
    }

    if (playerSymbol !== 'X' && playerSymbol !== 'O') {
      alert(`${playerSymbol} is not valid`)
      playerSymbol = ''
      return 1; 
    }

    aiSymbol = playerSymbol === 'X' ? 'O' : 'X'
    node.innerText = playerSymbol;

    let availableCellCount = 9;
    let aiPick = 0;
    let isValidAiPick = false;

    do {
      availableCellCount = Array.from(cells).filter(cell => cell.innerText == '').length

      aiPick = Math.floor(Math.random() * 9)
      isValidAiPick = cells[aiPick].innerText === '';
    }
    while (!isValidAiPick && availableCellCount > 1);

    console.log(aiPick)

    // create a function call to check symbols too see if player or CPU won - pass in a string inside node to see values
    // 
    // cells[0].innerText has won!

    if (cells[0].innerText === cells[1].innerText && cells[1].innerText === cells[2].innerText) console.log('winner')
    if (cells[3].innerText === cells[4].innerText && cells[4].innerText === cells[5].innerText) console.log('winner')
    if (cells[6].innerText === cells[7].innerText && cells[7].innerText === cells[8].innerText) console.log('winner')
    
    if (cells[0].innerText === cells[3].innerText && cells[3].innerText === cells[6].innerText) console.log('winner')
    if (cells[1].innerText === cells[4].innerText && cells[4].innerText === cells[7].innerText) console.log('winner')
    if (cells[2].innerText === cells[5].innerText && cells[5].innerText === cells[8].innerText) console.log('winner')
    
    if (cells[0].innerText === cells[1].innerText && cells[1].innerText === cells[2].innerText) console.log('winner')
    if (cells[0].innerText === cells[1].innerText && cells[1].innerText === cells[2].innerText) console.log('winner')

    if (availableCellCount > 1) {
      cells[aiPick].innerText = aiSymbol;
    }
  })
})
