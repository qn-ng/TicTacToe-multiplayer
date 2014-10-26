# Multiplayer Tic-Tac-Toe

_Simple realtime multiplayer Tic-Tac-Toe game with instant messaging._

**Demo: [CLICK HERE](http://nquocnghia.github.io/TicTacToe-multiplayer/)**

## Features
* Classic 5-in-a-row game
* Pairing randomly from the queue (every x seconds)
* Realtime IM between players in a same game

## Setup

Be sure you have `nodejs`, `npm`, `bower` and `grunt-cli` pre-installed. To install all the project's dependencies, run the following commands:

#### Server

1. `cd nodejs/tictactoe/`
2. `npm install`
3. `node tictactoe.js`

#### Client

1. `cd html/tictactoe/`
2. `npm install`
3. `grunt --url={YOUR_URL}:3000`. Ex `grunt --url=http://my.domain:3000`

_If you leave the `--url` parameter empty or simply run `grunt`, the default url `http://localhost:3000` will be used._

Open `html/tictactoe/index.html` to start the game.

## Technology
* NodeJS + Socket.IO
* EaselJS + jQuery
* Bootstrap

## License
See [LICENSE](LICENSE)

_Tweet me [@nquocnghia](https://twitter.com/nquocnghia "nquocnghia on twitter")_

[![Flattr this git repo](http://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=nquocnghia&url=https://github.com/nquocnghia&title=TicTacToe-multiplayer&language=&tags=github&category=software)
