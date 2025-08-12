export function loadScore() {
  const saved = localStorage.getItem('tic-tac-toe-score');
  return saved ? JSON.parse(saved) : { win: 0, lose: 0, draw: 0 };
}

export function saveScore(score) {
  localStorage.setItem('tic-tac-toe-score', JSON.stringify(score));
}
