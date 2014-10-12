var socket = io('http://localhost:3000');
var playerName = "Player";
var playerType;

//CONFIGURATIONS
var CELL_WIDTH = 15;
var CELL_MARGIN = 1;
var CELL_ROWS = 40;
var CELL_COLS = 50;
var GRID_WIDTH = CELL_WIDTH * CELL_COLS + CELL_MARGIN * CELL_COLS + CELL_MARGIN;
var GRID_HEIGHT = CELL_WIDTH * CELL_ROWS + CELL_MARGIN * CELL_ROWS + CELL_MARGIN;

var stage;
var overlayContainter = null;

var grid;

var currentTurn;
var lastMove; // last cell invoked by player

var canMove;

function init() {
    initGrid();
    canMove = true;
    currentTurn = null;
    playerType = null;

    $('#mainCanvas').attr({width: GRID_WIDTH, height: GRID_HEIGHT}).css({width: GRID_WIDTH, height: GRID_HEIGHT});

    stage = new createjs.Stage("mainCanvas");
    var bg = new createjs.Shape();
    bg.graphics.beginFill("black").drawRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
    stage.addChild(bg);

    var startX = CELL_MARGIN, startY = CELL_MARGIN;

    for (var i = 0; i < CELL_ROWS; i++) {
        for (var j = 0; j < CELL_COLS; j++)
        {
            var cell = new createjs.Shape();
            cell.graphics.beginFill("#EEEEEE").drawRect(startX, startY, CELL_WIDTH, CELL_WIDTH);
            cell.on("click", evtCellClicked);

            cell.value = null;
            cell.pos = {
                x: j,
                y: i
            };
            cell.txt = new createjs.Text("", "bold " + (CELL_WIDTH + 5) + "px Arial", "#333");
            cell.txt.textBaseline = "alphabetic";
            cell.txt.x = startX + CELL_WIDTH / 8;
            cell.txt.y = startY + 4 / 5 * CELL_WIDTH;

            grid[i].push(cell);
            stage.addChild(cell);
            stage.addChild(cell.txt);
            startX += CELL_WIDTH + CELL_MARGIN;
        }
        startX = CELL_MARGIN;
        startY += CELL_WIDTH + CELL_MARGIN;
    }

    addOverlay("WAIT FOR ANOTHER PLAYER!");

    stage.update();
}

var addOverlay = function (title) {
    overlayContainter = new createjs.Container();
    var bg = new createjs.Shape();
    bg.graphics.beginFill("#000").drawRect(0, 0, GRID_WIDTH, GRID_HEIGHT);
    bg.alpha = 0.9;
    var text = new createjs.Text(title, "bold 50px Arial", "#FFF");
    text.outline = 2;
    text.textBaseline = "alphabetic";
    text.x = (GRID_WIDTH / 2) - text.getMeasuredWidth() / 2;
    text.y = (GRID_HEIGHT / 2) - text.getMeasuredHeight() / 2;
    overlayContainter.addChild(bg, text);
    stage.addChild(overlayContainter);
    stage.update();
};

var removeOverlay = function () {
    stage.removeChild(overlayContainter);
    overlayContainter = null;
    stage.update();
};

var initGrid = function () {
    grid = [];
    for (var i = 0; i < CELL_ROWS; i++)
        grid.push([]);
};

var evtCellClicked = function (event) {
    //return if there is an overlay panel
    if (overlayContainter != null || currentTurn !== playerType || !canMove)
        return false;

    var cell = event.target;
    if (cell.value !== null)
        return;
    
    canMove = false;
    makeAMove(cell.pos.x, cell.pos.y);
};

var setValue = function (x, y, value) {
    if (lastMove) {
        lastMove.graphics.clear().beginFill("#EEEEEE").drawRect(CELL_MARGIN + lastMove.pos.x*(CELL_MARGIN + CELL_WIDTH), CELL_MARGIN + lastMove.pos.y*(CELL_MARGIN + CELL_WIDTH), CELL_WIDTH, CELL_WIDTH).endFill();
    }
    var cell = grid[y][x];
    var text = cell.txt;
    cell.value = value;
    text.text = value;
    text.color = value === "x" ? "#555" : "#FF7777";
    cell.graphics.clear().beginFill("#C0D8FA").drawRect(CELL_MARGIN + cell.pos.x*(CELL_MARGIN + CELL_WIDTH), CELL_MARGIN + cell.pos.y*(CELL_MARGIN + CELL_WIDTH), CELL_WIDTH, CELL_WIDTH).endFill();
    lastMove = cell;
    stage.update();
};

var drawResultLine = function (data) {
    for (var i = 0; i < data.length; i++) {
        var pos = data[i];
        var line = new createjs.Shape();
        line.graphics.setStrokeStyle(3);
        line.graphics.beginStroke("#555555");
        line.graphics.moveTo(CELL_MARGIN + pos[0].x * (CELL_MARGIN + CELL_WIDTH) + CELL_WIDTH * 0.5, CELL_MARGIN + pos[0].y * (CELL_MARGIN + CELL_WIDTH) + CELL_WIDTH * 0.5);
        line.graphics.lineTo(CELL_MARGIN + pos[1].x * (CELL_MARGIN + CELL_WIDTH) + CELL_WIDTH * 0.5, CELL_MARGIN + pos[1].y * (CELL_MARGIN + CELL_WIDTH) + CELL_WIDTH * 0.5);
        line.graphics.endStroke();
        stage.addChild(line);
    }
    stage.update();
};