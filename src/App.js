import { Client } from 'boardgame.io/react';
import { PenguinFive } from './Game';

const App = Client({ game: PenguinFive });

export default App;