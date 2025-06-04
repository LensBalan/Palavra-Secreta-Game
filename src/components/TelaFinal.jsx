import '../css/TelaFinal.css';

function TelaFinal ({reiniciarJogo, pontuacao}) {
    return (
        <div>
            <h2>Fim do Jogo!</h2>
            <h2>A sua Pontuação foi: <span>{pontuacao}</span></h2>
            <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
        </div>
    );
}

export default TelaFinal