import { useState, useEffect } from 'react';
import Board from './components/Board';
import Scoreboard from './components/ScoreBoard';
import { loadScore, saveScore } from './utils/storage';
import { findTheWinner } from './utils/findTheWinner';
import { minimax } from './utils/minimax';

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [playerSymbol, setPlayerSymbol] = useState('X');
  const [score, setScore] = useState(loadScore());

  const aiSymbol = playerSymbol === 'X' ? 'O' : 'X';
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  useEffect(() => {
    saveScore(score);
  }, [score]);

  function handlePlay(nextSquares) {
    setHistory([...history.slice(0, currentMove + 1), nextSquares]);
    setCurrentMove(history.slice(0, currentMove + 1).length);
  }

  function aiMove(squares) {
    const { move } = minimax([...squares], 0, true, aiSymbol, playerSymbol);
    if (move !== undefined) {
      const newSquares = [...squares];
      newSquares[move] = aiSymbol;
      handlePlay(newSquares);
    }
  }

  useEffect(() => {
    const { winner } = findTheWinner(currentSquares);
    if (winner || currentSquares.every(s => s !== null)) {
      if (winner === playerSymbol) setScore(prev => ({ ...prev, win: prev.win + 1 }));
      else if (winner === aiSymbol) setScore(prev => ({ ...prev, lose: prev.lose + 1 }));
      else setScore(prev => ({ ...prev, draw: prev.draw + 1 }));
    } else if (xIsNext !== (playerSymbol === 'X')) {
      setTimeout(() => aiMove(currentSquares), 400);
    }
  }, [currentSquares]);

  function jumpTo(move) {
    setCurrentMove(move);
  }

  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  const moves = history.map((_, move) => {
    let description = move ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <Scoreboard score={score} />

        <div className='symbol-select'>
          <label>Pilih simbol: </label>
          <select value={playerSymbol} onChange={(e) => setPlayerSymbol(e.target.value)}>
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </div>
        
        <button className='reset-btn' onClick={resetGame}>Reset Game</button>
        
        <div className="history">
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}
