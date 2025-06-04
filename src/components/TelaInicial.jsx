import '../css/TelaInicial.css';

function TelaInicial ({iniciarJogo}) {
    return (
        <div className='inicio'>
            <h1>Secret Word</h1>
            <p>CLique no Botão abaixo para começar a jogar</p>
            <button onClick={iniciarJogo}>Começar o Jogo</button>
        </div>
    );
}

export default TelaInicial