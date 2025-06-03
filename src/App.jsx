//CSS
import './App.css'

//Componentes
import TelaInicial from './components/TelaInicial'
import TelaGame from './components/TelaGame';
import TelaFinal from './components/TelaFinal';
//Hooks
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from './data/Words';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'},
];

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList);

  return (
    <div className='App'>
      {gameStage === 'start' && <TelaInicial />}
      {gameStage === 'game' && <TelaGame />}
      {gameStage === 'end' && <TelaFinal />}
    </div>
  )
}

export default App
