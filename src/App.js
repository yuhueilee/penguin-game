import { Client } from "boardgame.io/react";
import { PenguinFive } from "./Game";
import { PenguinFiveBoard } from "./Board";

const App = Client({
    game: PenguinFive,
    board: PenguinFiveBoard,
});

export default App;
