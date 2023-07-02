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

let playerSymbol = '';
let aiSymbol = '';
let cells = document.querySelectorAll(".cell")

// Function to check the winning conditions
function checkWin(symbol) {
  if (
    (cells[0].innerText === symbol && cells[1].innerText === symbol && cells[2].innerText === symbol) ||
    (cells[3].innerText === symbol && cells[4].innerText === symbol && cells[5].innerText === symbol) ||
    (cells[6].innerText === symbol && cells[7].innerText === symbol && cells[8].innerText === symbol) ||
    (cells[0].innerText === symbol && cells[3].innerText === symbol && cells[6].innerText === symbol) ||
    (cells[1].innerText === symbol && cells[4].innerText === symbol && cells[7].innerText === symbol) ||
    (cells[2].innerText === symbol && cells[5].innerText === symbol && cells[8].innerText === symbol) ||
    (cells[0].innerText === symbol && cells[4].innerText === symbol && cells[8].innerText === symbol) ||
    (cells[2].innerText === symbol && cells[4].innerText === symbol && cells[6].innerText === symbol)
  ) {
    return true; // Winning condition is met
  }
  return false; // Winning condition is not met
}

let arr = []

function onClick(node){
  if (playerSymbol === '') {
    playerSymbol = window.prompt('Would you like to be X or O?', 'X')
  } else if (playerSymbol !== 'X' && playerSymbol !== 'O') {
    playerSymbol = ''
    return 1; 
  }

  if (node.innerText !== '') {
    // Cell already has a symbol, do not replace
    return;
  }

  aiSymbol = playerSymbol === 'X' ? 'O' : 'X'
  node.innerText = playerSymbol;

  let availableCellCount = Array.from(cells).filter(cell => cell.innerText === '').length;
  let aiPick = 0;
  let isValidAiPick = false;

  do {
    availableCellCount = Array.from(cells).filter(cell => cell.innerText === '').length;

    aiPick = Math.floor(Math.random() * 9);
    isValidAiPick = cells[aiPick].innerText === '';
  }
  while (!isValidAiPick && availableCellCount > 1);

  if (checkWin(playerSymbol)) {
    endGame('Player wins!');
  } else if (availableCellCount > 1) {
    cells[aiPick].innerText = aiSymbol;
    if (checkWin(aiSymbol)) {
      endGame('Computer wins!');
    } else {
      // No winner yet, check for a draw
      if (availableCellCount === 1) {
        endGame('Draw!');
      }
    }
  } else {
    endGame('Draw!');
  }
  // if no more available cells and no winner - draw();
  // if no more available cells, after player/AI move then call the draw()
}

cells.forEach(function(node){
  let listener = () => {onClick(node)}

  node.addEventListener('click', listener)

  let cell = {
    'cell': node,
    'listener': listener
  }
  arr.push(cell)
})

// if win condition is met, cannot make another turn.
function endGame(message){
  console.log(message)

  arr.forEach(function(item){
    item.cell.removeEventListener('click', item.listener)
  }) 
}

// modal on startup asking if user would like to be X or O
window.addEventListener('DOMContentLoaded', function() {
  var modal = document.getElementById('modal');
  var xButton = document.getElementById('x-button');
  var oButton = document.getElementById('o-button');

  xButton.addEventListener('click', function() {
    modal.style.display = 'none';
    // Call a function to start the game with 'X' as the player's choice
    startGame('X');
  });

  oButton.addEventListener('click', function() {
    modal.style.display = 'none';
    // Call a function to start the game with 'O' as the player's choice
    startGame('O');
  });

  modal.style.display = 'block';
});

function startGame(playerChoice) {
  // Your logic to start the tic-tac-toe game with the player's choice
  playerSymbol = playerChoice;
  console.log('Player chose:', playerChoice);
}

// impossible difficulty
function minimax(game, depth) {
  if (game.over()) {
      return score(game);
  }
  depth += 1;
  var scores = [];
  var moves = [];

  var availableMoves = game.get_available_moves();
  for (var i = 0; i < availableMoves.length; i++) {
      var move = availableMoves[i];
      var possible_game = game.get_new_state(move);
      scores.push(minimax(possible_game, depth));
      moves.push(move);
  }

  if (game.active_turn === player) {
      var max_score_index = 0;
      var max_score = scores[0];
      for (var j = 1; j < scores.length; j++) {
          if (scores[j] > max_score) {
              max_score = scores[j];
              max_score_index = j;
          }
      }
      choice = moves[max_score_index];
      return scores[max_score_index];
  } else {
      var min_score_index = 0;
      var min_score = scores[0];
      for (var k = 1; k < scores.length; k++) {
          if (scores[k] < min_score) {
              min_score = scores[k];
              min_score_index = k;
          }
      }
      choice = moves[min_score_index];
      return scores[min_score_index];
  }
}