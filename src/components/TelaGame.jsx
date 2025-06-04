import { useState, useRef } from 'react';
import '../css/TelaGame.css';

function TelaGame ({
    verificaLetra,
    palavraEscolhida,
    categoriaPalavra,
    letras, letrasAdivinhadas, 
    letrasErradas, 
    tentativas, 
    pontuacao
}) {
    const [letra, setLetra] = useState("");
    const letraInputRef = useRef(null);

    const envioLetra = (e) => {
        e.preventDefault();

        verificaLetra(letra);

        setLetra("");

        letraInputRef.current.focus();
    };

    return (
       <div className='game'>
        <p className='points'>
            <span>Pontuação: {pontuacao}</span>
        </p>
        <h1>Adivinhe a Palavra:</h1>
        <h3 className='tip'>Dica sobre a palavra: <span>{categoriaPalavra}</span></h3>
        <p>Você ainda tem {tentativas} tentativas</p>
        <div className='word-container'>
            {letras.map((letra, indice) => (
                letrasAdivinhadas.includes(letra) ? (
                     <span key={indice} className="letter">{letra}</span>
                ) : (
                    <span key={indice} className="quadrado-branco"></span>
                )
            ) )}
        </div>
        <div className='letter-container'>
            <p>Tente adivinhar uma letra da palavra:</p>
            <form onSubmit={envioLetra}>
                <input
                    type='text' 
                    name='letter' 
                    maxLength={1} 
                    required 
                    value={letra} 
                    onChange={(e) => setLetra(e.target.value)}
                    ref={letraInputRef}
                     />
                <button>Jogar!</button>
            </form>
        </div>
        <div className="wrongLettersContainer">
            <p>Letras já utilizadas:</p>
            {letrasErradas.map((letra, indice) => (
                <span key={indice}>{letra}, </span>
            ))}
        </div>
       </div>
    );
}

export default TelaGame