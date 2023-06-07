// Configuração inicial do tabuleiro
const WIDTH = 10;
const HEIGHT = 10;
let board = createBoard();
let isRunning = false;
let intervalId;

// Criação do tabuleiro
function createBoard() {
  const boardElement = document.getElementById('board');
  let newBoard = [];

  for (let i = 0; i < HEIGHT; i++) {
    let row = [];
    let tr = document.createElement('tr');

    for (let j = 0; j < WIDTH; j++) {
      let cell = document.createElement('td');
      cell.addEventListener('click', toggleCellState);
      row.push(0);
      tr.appendChild(cell);
    }

    newBoard.push(row);
    boardElement.appendChild(tr);
  }

  return newBoard;
}

// Função para alternar o estado da célula ao clicar
function toggleCellState() {
  let rowIndex = this.parentNode.rowIndex;
  let cellIndex = this.cellIndex;
  let cellState = board[rowIndex][cellIndex];
  board[rowIndex][cellIndex] = cellState === 0 ? 1 : 0;
  this.classList.toggle('alive');
}

// Função para atualizar o tabuleiro para a próxima geração
function updateBoard() {
  let newBoard = [];

  for (let i = 0; i < HEIGHT; i++) {
    let row = [];

    for (let j = 0; j < WIDTH; j++) {
      let cellState = board[i][j];
      let neighbors = countNeighbors(i, j);
      
      // Regras do Jogo da Vida
      if (cellState === 1 && (neighbors < 2 || neighbors > 3)) {
        row.push(0);
      } else if (cellState === 0 && neighbors === 3) {
        row.push(1);
      } else {
        row.push(cellState);
      }
    }

    newBoard.push(row);
  }

  board = newBoard;
}

// Função para contar o número de vizinhos vivos de uma célula
function countNeighbors(rowIndex, cellIndex) {
  let count = 0;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      if (i === 0 && j === 0) continue;

      let neighborRow = rowIndex + i;
      let neighborCell = cellIndex + j;

      if (
        neighborRow >= 0 &&
        neighborRow < HEIGHT &&
        neighborCell >= 0 &&
        neighborCell < WIDTH &&
        board[neighborRow][neighborCell] === 1
      ) {
        count++;
      }
    }
  }

  return count;
}

// Função para atualizar a exibição do tabuleiro
function renderBoard() {
  const boardElement = document.getElementById('board');

  for (let i = 0; i < HEIGHT; i++) {
    let row = boardElement.rows[i];

    for (let j = 0; j < WIDTH; j++) {
      let cell = row.cells[j];
      let cellState = board[i][j];

      if (cellState === 1) {
        cell.classList.add('alive');
      } else {
        cell.classList.remove('alive');
      }
    }
  }
}

// Função para iniciar a animação
function startGame() {
  if (!isRunning) {
    isRunning = true;
    intervalId = setInterval(() => {
      updateBoard();
      renderBoard();
    }, 500);
  }
}

// Função para parar a animação
function stopGame() {
  if (isRunning) {
    isRunning = false;
    clearInterval(intervalId);
  }
}

// Chamada inicial para renderizar o tabuleiro vazio
renderBoard();
