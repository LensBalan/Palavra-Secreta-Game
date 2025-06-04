import '../css/TelaFinal.css';

function TelaFinal ({reiniciarJogo}) {
    return (
        <div>
            <h2>Game over</h2>
            <button onClick={reiniciarJogo}>Reiniciar Jogo</button>
        </div>
    );
}

export default TelaFinal