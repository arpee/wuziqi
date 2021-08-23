
this.game = {};

this.game.size = 9;

this.game.players = [];
this.game.players.push("white");
this.game.players.push("black");
this.game.player = 0;


function initialize() {

    document.querySelector('.board').style.gridTemplateColumns = 'repeat(' + this.game.size + ', 1fr)';

    if (!this.game.board) {
        generateBoard(this.game.size);
    }
    drawBoard(this.game.board);
    addEvents(this.game.board);
}

function generateBoard(x) {
    var cells = x * x;
    this.game.board = [];
    for (let n = 1; n <= cells; n ++) {
      let cell = {};
      cell.id = n;
      cell.sets.row = Math.ceil(n/x);
      cell.sets.col = ((n -1) % x) + 1;
      cell.sets.lddiag = (x - cell.col) + cell.row;
      cell.sets.rudiag = cell.row + cell.col - 1;
      cell.owner = "none";
      this.game.board.push(cell);
    }
    console.log(this);
}

function drawBoard(board){
    boardElement = document.querySelector('.board');
    boardElement.innerHTML = "";
    board.forEach(cell => {
        let el = document.createElement('div');
        el.id = cell.id;
        el.classList.add("row_" + cell.sets.row);
        el.classList.add("col_" + cell.sets.col);
        el.classList.add("lddiag_" + cell.sets.lddiag);
        el.classList.add("rudiag_" + cell.sets.rudiag);
        el.classList.add("owner_" + cell.sets.owner);
        boardElement.append(el);
    });
}

function addEvents(board){
    board.forEach(cell => {
        el = document.getElementById(cell.id);
        if (cell.owner == "none") {
            el.addEventListener("click", (e) => {
                cell.owner = this.game.players[this.game.player];
                // check for winner.
                drawBoard(board);
                addEvents(board);
                this.game.player = (this.game.player + 1) % 2;
            });    
        }
    });
}

function findWinner(cell){
    let win = 0;
    cell.sets.forEach(set => {
        document.querySelectorAll(set).forEach(item => {
            if(item.classList.contains("owner_" + cell.owner)) {
                win ++;
                if (win > 4) {
                    return = "win";
                }
            } else {
                win = 0;
            }
        });
    });
    return "no_win";
}

initialize();