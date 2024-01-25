import { Client } from 'boardgame.io/react';

import { PenguinFiveBoard } from './Board';
import { PenguinFive } from './Game';

const App = Client({
    game: PenguinFive,
    board: PenguinFiveBoard,
});

export default App;
