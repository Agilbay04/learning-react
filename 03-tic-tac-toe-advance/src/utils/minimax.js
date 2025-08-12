import { findTheWinner } from './findTheWinner';

export function minimax(squares, depth, isMaximizing, aiSymbol, humanSymbol) {
  const { winner } = findTheWinner(squares);

  if (winner === aiSymbol) return { score: 10 - depth };
  if (winner === humanSymbol) return { score: depth - 10 };
  if (squares.every(s => s !== null)) return { score: 0 };

  if (isMaximizing) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = aiSymbol;
        const result = minimax(squares, depth + 1, false, aiSymbol, humanSymbol);
        squares[i] = null;
        if (result.score > bestScore) {
          bestScore = result.score;
          move = i;
        }
      }
    }
    return { score: bestScore, move };
  } else {
    let bestScore = Infinity;
    let move;
    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        squares[i] = humanSymbol;
        const result = minimax(squares, depth + 1, true, aiSymbol, humanSymbol);
        squares[i] = null;
        if (result.score < bestScore) {
          bestScore = result.score;
          move = i;
        }
      }
    }
    return { score: bestScore, move };
  }
}
