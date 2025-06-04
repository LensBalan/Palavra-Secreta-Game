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

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaPalavra, setCategoriaPalavra] = useState([]);
  const [letras, setLetras] = useState([]);
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(3);
  const [pontuacao, setPontuacao] = useState(0);


  //Iniciando o jogo
  const iniciarJogo = () => {
    //pegar palavra
    const{palavra, categoria} = pegaPalavra();

    let letrasPalavra = palavra.split('');
    letrasPalavra = letrasPalavra.map((l) => l.toLowerCase());
    console.log(letrasPalavra);

    //setar estados
    setPalavraEscolhida(palavra);
    setCategoriaPalavra(categoria);
    setLetras(letrasPalavra);
  

    setGameStage(stages[1].name);
  };
  
  //Processar o input de letras 
  const verificaLetra = (letra) => {
    
    const letraNormalizada = letra.toLowerCase();

    //checar se a letra já foi utilizada
    if(letrasAdivinhadas.includes(letraNormalizada) || letrasErradas.includes(letraNormalizada)){
      return;
    }
  

    //colocar letra adivinhada ou perder 1 tentativa
    if(letras.includes(letraNormalizada)){
      setLetrasAdivinhadas((estadoAtualAdivinhadas) => [
        ...estadoAtualAdivinhadas, letraNormalizada //... todos os elementos atuais (spred)
      ])
    } else {
      setLetrasErradas((estadoAtualErradas) => [
        ...estadoAtualErradas, letraNormalizada
      ])
    }

  };

   console.log(letrasAdivinhadas);
   console.log(letrasErradas);

  //Reiniciar o jogo
  const reiniciarJogo = () => {
    setGameStage(stages[0].name);
  };

  const pegaPalavra = () => {
    //categoria
    const categorias = Object.keys(words);
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];
    console.log(categoria);

    //palavra
    const palavra = words[categoria][Math.floor(Math.random() * words[categoria].length)];
    console.log(palavra);

    return {palavra, categoria}
  };

  return (
    <div className='App'>
      {gameStage === 'start' && <TelaInicial iniciarJogo={iniciarJogo} />}
      {gameStage === 'game' && <TelaGame
                                  verificaLetra={verificaLetra}
                                  palavraEscolhida={palavraEscolhida}
                                  categoriaPalavra={categoriaPalavra} 
                                  letras={letras} 
                                  letrasAdivinhadas={letrasAdivinhadas}
                                  letrasErradas={letrasErradas}
                                  tentativas={tentativas}
                                  pontuacao={pontuacao}
                                />}
      {gameStage === 'end' && <TelaFinal reiniciarJogo={reiniciarJogo} />}
    </div>
  )
}

export default App
