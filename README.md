<h1>About</h1>

This is the backend of a game Tic-Tac-Toe. The frontend can be found [here](https://github.com/ViliusZur/tic-tac-toe-frontend).

Frontend displays the game board, game state, and logs. Every event in the game is sent to the backend API to store in the session. Backend API also determines if there is a winner with the current game state. After every event, frontend sends a GET request to backend API to retrieve current game state and logs. If the page is refreshed, frontend sends a GET request to the API to retrieve logs and game state at which point the game resumes. Frontend also has two buttons - New Game, for clearing the game state and starting a new game, and Clear Logs, which starts a new session in the backend clearing the logs and game state.

[Git flow](https://danielkummer.github.io/git-flow-cheatsheet/), [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/), and [Airbnb's ESLint](https://www.npmjs.com/package/eslint-config-airbnb-base) were used in this project to produce better quality code and keep this git repository organized. [Jest](https://jestjs.io/en/) was used or unit testing.

<h2>How to run the project</h2>

Please note: the game will render, but will not work if [backend](https://github.com/ViliusZur/tic-tac-toe-backend) is not running.

### If you have [docker desktop](https://www.docker.com/products/docker-desktop) installed on your machine:

Run the [backend](https://github.com/ViliusZur/tic-tac-toe-backend):
* `git clone https://github.com/ViliusZur/tic-tac-toe-backend.git` to clone the repository
* `cd tic-tac-toe-backend` change directory into project
* `docker-compose up -d` to run the project
* The API will be accessible via `http://localhost:8080`

Run the [frontend](https://github.com/ViliusZur/tic-tac-toe-frontend):
* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `docker-compose up -d` to run the project
* The website will be located at `http://localhost:3000`

### If you do not have [docker desktop](https://www.docker.com/products/docker-desktop) installed:

Run the [backend](https://github.com/ViliusZur/tic-tac-toe-backend):
* `git clone https://github.com/ViliusZur/tic-tac-toe-backend.git` to clone the repository
* `cd tic-tac-toe-backend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm start` to run the project
* The API will be accessible via `http://localhost:8080`

Run the [frontend](https://github.com/ViliusZur/tic-tac-toe-frontend):
* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm start` to run the project
* The website will be located at `http://localhost:3000`

<h2>Unit tests</h2>

### [Backend](https://github.com/ViliusZur/tic-tac-toe-backend)

To run the tests, run:
* `git clone https://github.com/ViliusZur/tic-tac-toe-backend.git` to clone the repository
* `cd tic-tac-toe-backend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm test` to run the tests

### [Frontend](https://github.com/ViliusZur/tic-tac-toe-frontend)

To run the tests, run:
* `git clone https://github.com/ViliusZur/tic-tac-toe-frontend.git` to clone the repository
* `cd tic-tac-toe-frontend` change directory into project
* `npm install` to download the package and its' dependencies
* `npm test` to run the tests
