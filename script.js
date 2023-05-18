// You’re going to store the gameboard as an array inside of a Gameboard object
function Gameboard() {
    // Initialize the game board as an empty array
    this.board = [];
  
    // Method to initialize the game board with empty cells
    this.initializeBoard = function(size) {
      this.board = Array(size).fill(null).map(() => Array(size).fill(null));
    };
  
    // Method to retrieve the value of a specific cell on the game board
    this.getCell = function(row, col) {
      return this.board[row][col];
    };
  
    // Method to set the value of a specific cell on the game board
    this.setCell = function(row, col, value) {
      this.board[row][col] = value;
    };
  
    // Method to print the current game board
    this.printBoard = function() {
      console.log(this.board);
    };
  }
  
  // Usage
  const gameboard = new Gameboard();
  gameboard.initializeBoard(3);
  gameboard.setCell(0, 0, 'X');
  gameboard.setCell(1, 1, 'O');
  gameboard.printBoard();

// Your players are also going to be stored in objects

// you’re probably going to want an object to control the flow of the game itself.


// Your main goal here is to have as little global code as possible. Try tucking everything away inside of a module or factory.
// Rule of thumb: if you only ever need ONE of something (gameBoard, displayController), use a module.If you need multiples of something (players!), create them with factories.
