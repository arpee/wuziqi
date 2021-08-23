
this.game = {};

this.game.size = 13;

this.game.players = [];
this.game.player = 0;


function initialize() {

    this.game.players.push("white");
    this.game.players.push("black");

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
    for (let n = 1; n <= cells; n++) {
        let cell = {};
        cell.sets = {};
        cell.id = n;
        cell.sets.row = Math.ceil(n / x);
        cell.sets.col = ((n - 1) % x) + 1;
        cell.sets.lddiag = (x - cell.sets.col) + cell.sets.row;
        cell.sets.rudiag = cell.sets.row + cell.sets.col - 1;
        cell.owner = "none";
        cell.winner = "no"
        this.game.board.push(cell);
    }
    //console.log(this);
}

function drawBoard(board) {
    boardElement = document.querySelector('.board');
    boardElement.innerHTML = "";
    board.forEach(cell => {
        let el = document.createElement('div');
        el.id = cell.id;
        el.classList.add("owner_" + cell.owner);
        el.classList.add("winner_" + cell.winner);
        boardElement.append(el);
    });
}

function addEvents(board) {
    board.forEach(cell => {
        el = document.getElementById(cell.id);
        if (cell.owner == "none") {
            el.addEventListener("click", (e) => {
                cell.owner = this.game.players[this.game.player];
                // check for winner.
                console.log(findWinner(cell));
                drawBoard(board);
                addEvents(board);
                this.game.player = (this.game.player + 1) % 2;
                console.log(serializeBoard(board));
            });
        }
    });
}

function findWinner(cell) {
    let win = 0;
    let winner = "no winner";
    for (const [key, value] of Object.entries(cell.sets)) {
        let testset = returnCells(key, value);
        if (testset.length > 4) {
            testset.forEach(item => {
                if (item.owner == cell.owner) {
                    win = win + 1;
                    if (win > 4) {
                        showWin(key, value, cell);
                        winner = cell.owner;
                    }
                } else {
                    win = 0;
                }
            });
        }
    };
    return winner;
}

function showWin(key, value, cell) {
    let set = returnCells(key, value);
    addWinners(set, cell);
    set.reverse();
    addWinners(set, cell);
}

function addWinners(set, cell) {
    let draw = false;
    set.forEach(el => {
        if (el.id == cell.id) {
            draw = true;
        }
        if (draw) {
            if (el.owner == cell.owner) {
                el.winner = "yes";
            } else {
                draw = false;
            }
        }
    });
}

function returnCells(type, value) {
    var cells = [];
    this.game.board.forEach(cell => {
        if (cell.sets[type] == value) {
            cells.push(cell);
        }
    });
    return cells;
}

function serializeBoard(board) {
    boardString = "";
    board.forEach(cell => {
        boardString += shortOwner(cell.owner);
    });
    return boardString;
}

function boardFromString(boardString) {
    generateBoard(Math.sqrt(boardString.length));
    this.game.board.forEach(cell, idx => {
        cell.owner = boardString[idx];
    });
}

function shortOwner(s) {
    switch (s) {
        case "black":
            return "B";
            break;
        case "white":
            return "W";
            break;
        default:
            return "N";
            break;
    }
}

initialize();