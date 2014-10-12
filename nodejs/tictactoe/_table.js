var CELL_ROWS = 40;
var CELL_COLS = 50;

var _playerX;
var _playerO;
var _currentTurn;

var _grid;

function Table(playerX, playerO) {
    _playerX = playerX;
    _playerO = playerO;
    _grid = [];
    _currentTurn = Math.floor(Math.random() * 2) + 1 === 2 ? "x" : "o";
    _createNewGrid();
};

function _createNewGrid() {
    for (var i = 0; i < CELL_ROWS; i++) {
        _grid.push([]);
        for (var j = 0; j < CELL_COLS; j++) {
            _grid[i].push({
                value: null
            });
        }
    }
};

function _isWinningMove(x, y, value) {
    var n_s = _N_SCheck(x, y, value);
    var ne_sw = _NE_SWCheck(x, y, value);
    var e_w = _E_WCheck(x, y, value);
    var se_nw = _SE_NWCheck(x, y, value);

    var result = [];
    if (n_s.status)
        result.push(n_s.data);
    if (ne_sw.status)
        result.push(ne_sw.data);
    if (e_w.status)
        result.push(e_w.data);
    if (se_nw.status)
        result.push(se_nw.data);

    return {status: result.length > 0, data: result};
};

//North-South check
function _N_SCheck(x, y, value) {
    var pos = [
        {x: x, y: y},
        {x: x, y: y}
    ];
    var counter = 1;

    for (var i = 1; i <= 5; i++) {
        var _y = y - i;
        if (_y < 0 || _grid[_y][x].value !== value)
            break;
        pos[1].x = x;
        pos[1].y = _y
        counter++;
    }
    if (counter >= 5) {
        return {status: true, data: pos};
    }
    for (var i = 1; i <= 5; i++) {
        var _y = y + i;
        if (_y >= CELL_ROWS || _grid[_y][x].value !== value)
            break;
        pos[0].x = x;
        pos[0].y = _y
        counter++;
    }
    return {status: counter >=5, data: pos};

};

//East-West check
function _E_WCheck(x, y, value) {
    var pos = [
        {x: x, y: y},
        {x: x, y: y}
    ];
    var counter = 1;

    for (var i = 1; i < 5; i++) {
        var _x = x - i;
        if (_x < 0 || _grid[y][_x].value !== value)
            break;
        pos[1].x = _x;
        pos[1].y = y
        counter++;
    }
    if (counter >= 5) {
        return {status: true, data: pos};
    }
    for (var i = 1; i < 5; i++) {
        var _x = x + i;
        if (_x >= CELL_COLS || _grid[y][_x].value !== value)
            break;
        pos[0].x = _x;
        pos[0].y = y
        counter++;
    }
    return {status: counter >=5, data: pos};

};

//NorthEast-SouthWest check
function _NE_SWCheck(x, y, value) {
    var pos = [
        {x: x, y: y},
        {x: x, y: y}
    ];
    var counter = 1;

    for (var i = 1; i <= 5; i++) {
        var _y = y - i;
        var _x = x - i;
        if (_x < 0 || _y < 0 || _grid[_y][_x].value !== value)
            break;
        pos[1].x = _x;
        pos[1].y = _y
        counter++;
    }
    if (counter >= 5) {
        return {status: true, data: pos};
    }
    for (var i = 1; i <= 5; i++) {
        var _y = y + i;
        var _x = x + i;
        if (_x >= CELL_COLS || _y >= CELL_ROWS || _grid[_y][_x].value !== value)
            break;
        pos[0].x = _x;
        pos[0].y = _y
        counter++;
    }
    return {status: counter >=5, data: pos};

};

//SouthEast-NorthWest check
function _SE_NWCheck(x, y, value) {
    var pos = [
        {x: x, y: y},
        {x: x, y: y}
    ];
    var counter = 1;

    for (var i = 1; i <= 5; i++) {
        var _y = y + i;
        var _x = x - i;
        if (_x < 0 || _y >= CELL_ROWS || _grid[_y][_x].value !== value)
            break;
        pos[1].x = _x;
        pos[1].y = _y
        counter++;
    }
    if (counter >= 5) {
        return {status: true, data: pos};
    }
    for (var i = 1; i <= 5; i++) {
        var _y = y - i;
        var _x = x + i;
        if (_x >= CELL_COLS || _y < 0 || _grid[_y][_x].value !== value)
            break;
        pos[0].x = _x;
        pos[0].y = _y
        counter++;
    }
    return {status: counter >=5, data: pos};

};

//Set cell target value, return 1 if it's winning move; return 0 if succeed; otherwise return -1
Table.prototype.makeAMove = function (x, y) {
    var cell = _grid[y][x];
    if (cell.value == null) {
        cell.value = _currentTurn;
        var isWinningMove = _isWinningMove(x, y, _currentTurn);
        if (isWinningMove.status)
            return {status: 1, data: isWinningMove.data};
        return {status: 0, data: null};
    }
    return {status: -1, data: null};
};

Table.prototype.getPlayerX = function () {
    return _playerX;
}

Table.prototype.getPlayerO = function () {
    return _playerO;
}

Table.prototype.nextTurn = function () {
    _currentTurn = _currentTurn === "x" ? "o" : "x";
    return _currentTurn;
};

Table.prototype.getCurrentTurn = function () {
    return _currentTurn;
};

module.exports = Table;