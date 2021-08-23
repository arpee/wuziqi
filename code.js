
this.game = {};

this.game.size = 13;


function initialize() {

    document.querySelector('.board').style.gridTemplateColumns = 'repeat(' + this.game.size + ', 1fr)';

    if (!this.game.board) {
        generateBoard(this.game.size);
    }
    drawBoard(this.game.board);
}

function generateBoard(x) {
    var cells = x * x;
    this.game.board = [];
    for (let n = 1; n <= cells; n ++) {
      let cell = {};
      cell.id = n;
      cell.row = Math.ceil(n/x);
      cell.col = ((n -1) % x) + 1;
      cell.lddiag = (x - cell.col) + cell.row;
      cell.rudiag = cell.row + cell.col - 1;
      this.game.board.push(cell);
    }
    console.log(this);
}

function drawBoard(board){
    board.forEach(cell => {
        let el = document.createElement('div');
        el.id = cell.id;
        el.classList.add("row_" + cell.row);
        el.classList.add("col_" + cell.col);
        el.classList.add("lddiag_" + cell.lddiag);
        el.classList.add("rudiag_" + cell.rudiag);
        document.querySelector('.board').append(el);
    });
}

initialize();