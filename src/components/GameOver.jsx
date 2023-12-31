import "./GameOver.scss"

const GameOver = ({ restartGame, score }) => {
  return (
    <div>
      <h1>Fim do jogo</h1>
      <h2>A sua pontuação foi: <span>{score}</span></h2>
      <button onClick={restartGame}>Reiniciar o jogo</button>
    </div>
  )
}

export default GameOver