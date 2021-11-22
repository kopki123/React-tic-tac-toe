import { useEffect, useState, useCallback } from "react";
import Square from "./Components/Square";
import "./App.css";

const Patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(1);
  const [result, setResult] = useState({ winner: "", state: "" });

  const chooseSquare = (square) => {
    if (player === 1 && !board[square]) {
      const newBoard = [...board];
      newBoard[square] = "O";
      setBoard(newBoard);
      setPlayer(2);
    }

    if (player === 2 && !board[square]) {
      const newBoard = [...board];
      newBoard[square] = "X";
      setBoard(newBoard);
      setPlayer(1);
    }
  };

  const checkWin = useCallback(() => {
    Patterns.forEach((pattern) => {
      const firstPlayer = board[pattern[0]];
      let isWin = true;
      pattern.forEach((index) => {
        if (board[index] !== firstPlayer) {
          isWin = false;
        }
      });

      if (
        isWin &&
        board[pattern[0]] &&
        board[pattern[1]] &&
        board[pattern[2]]
      ) {
        setResult({ winner: firstPlayer === "O" ? 1 : 2, state: "won" });
      }
    });

    const isboardFilled = board.filter((square) => square === "");
    if (!isboardFilled.length) {
      setResult({ winner: "", state: "Tie" });
    }
  }, [board]);

  const restart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setPlayer(1);
    setResult({ winner: "", state: "" });
  };

  useEffect(() => {
    checkWin();
  }, [checkWin]);

  useEffect(() => {
    if (result.state === "won") {
      window.alert(`winner is player${result.winner}`);
      restart();
    }

    if (result.state === "Tie") {
      window.alert("No one is winner");
      restart();
    }
  }, [result]);

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        <Square val={board[0]} chooseSquare={() => chooseSquare(0)} />
        <Square val={board[1]} chooseSquare={() => chooseSquare(1)} />
        <Square val={board[2]} chooseSquare={() => chooseSquare(2)} />
        <Square val={board[3]} chooseSquare={() => chooseSquare(3)} />
        <Square val={board[4]} chooseSquare={() => chooseSquare(4)} />
        <Square val={board[5]} chooseSquare={() => chooseSquare(5)} />
        <Square val={board[6]} chooseSquare={() => chooseSquare(6)} />
        <Square val={board[7]} chooseSquare={() => chooseSquare(7)} />
        <Square val={board[8]} chooseSquare={() => chooseSquare(8)} />
      </div>
    </div>
  );
}

export default App;
