import { Client } from 'boardgame.io/react';

import { PenguinBattleBoard } from './Board';
import { PenguinBattle } from './Game';

const App = Client({
    game: PenguinBattle,
    board: PenguinBattleBoard,
});

export default App;
