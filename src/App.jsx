//CSS
import './css/App.css';

//Componentes
import TelaInicial from './components/TelaInicial'
import TelaGame from './components/TelaGame';
import TelaFinal from './components/TelaFinal';

//Hooks
import { useCallback, useEffect, useState } from 'react';

//Data
import {wordsList} from './data/Words';

const stages = [
  {id: 1, name: 'inicio'},
  {id: 2, name: 'game'},
  {id: 3, name: 'fim'},
];

 const qntTentativas = 3;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [palavras] = useState(wordsList);

  const [palavraEscolhida, setPalavraEscolhida] = useState("");
  const [categoriaPalavra, setCategoriaPalavra] = useState([]);
  const [letras, setLetras] = useState([]);
  const [letrasAdivinhadas, setLetrasAdivinhadas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(qntTentativas);
  const [pontuacao, setPontuacao] = useState(0);

  //Iniciando o jogo
  const iniciarJogo = useCallback(() => {

    limparTodosEstados();

    //pegar palavra
    const{palavra, categoria} = pegaPalavra();

    let letrasPalavra = palavra.split('');
    letrasPalavra = letrasPalavra.map((l) => l.toLowerCase());
    //console.log(letrasPalavra);

    //setar estados
    setPalavraEscolhida(palavra);
    setCategoriaPalavra(categoria);
    setLetras(letrasPalavra);
  

    setGameStage(stages[1].name);
  }, [categoriaPalavra]);
  
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

      setTentativas((tentativasAtuais) => tentativasAtuais - 1);
    }

  };

  const limparTodosEstados = () => {
    setLetrasAdivinhadas([]);
    setLetrasErradas([]);
  }

  //usuario perdeu
  useEffect(() => {
    if(tentativas <= 0){
  
      limparTodosEstados();

      setGameStage(stages[2].name);
    }
  }, [tentativas])

  //usuario ganhou
  useEffect(() => {

    const letrasUnicas = [... new Set(letras)]; //já deixa só letras unicas no array

    if(letrasAdivinhadas.length === letrasUnicas.length){
    
      setPontuacao((pontuacaoAtual) => pontuacaoAtual += 100);

      //restartar o game
      iniciarJogo();
    }

  }, [letrasAdivinhadas, letras, iniciarJogo])

  //Reiniciar o jogo
  const reiniciarJogo = () => {

    setPontuacao(0);
    setTentativas(qntTentativas);

    setGameStage(stages[0].name);
  };

  const pegaPalavra = useCallback(() => {
    //categoria
    const categorias = Object.keys(palavras);
    const categoria = categorias[Math.floor(Math.random() * Object.keys(categorias).length)];
    //console.log(categoria);

    //palavra
    const palavra = palavras[categoria][Math.floor(Math.random() * palavras[categoria].length)];
    //console.log(palavra);

    return {palavra, categoria}
  }, [palavras]);

  return (
    <div className='App'>
      {gameStage === 'inicio' && <TelaInicial iniciarJogo={iniciarJogo} />}
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
      {gameStage === 'fim' && <TelaFinal reiniciarJogo={reiniciarJogo} pontuacao={pontuacao} />}
    </div>
  )
}

export default App
