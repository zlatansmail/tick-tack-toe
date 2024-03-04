import { useEffect, useState } from 'react';
import './App.css';
import { WINNING_COMBINATIONS } from './constants';

const App = () => {
  const [activePlayer, setActivePlayer] = useState('X');
  const [boardValues, setBoardValues] = useState(Array(9).fill(null));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    DRAWS: 0
  });

  const checkForWinner = () => {
    let userWon = null;
    const haveWinner = WINNING_COMBINATIONS.some((combination) => {
      // array destructing
      const [firstIndex, secondIndex, thirdIndex] = combination;
      // ako a === b i a === c => b === c
      if (boardValues[firstIndex] &&
        boardValues[firstIndex] === boardValues[secondIndex] &&
        boardValues[firstIndex] === boardValues[thirdIndex]) {
        userWon = boardValues[firstIndex];
        return true;
      }

      return false;
    })

    if (haveWinner) {
      const scoreCopy = {...score};
      scoreCopy[userWon] += 1;
      console.log(scoreCopy);

      setScore(scoreCopy)
      setWinner(userWon);
      setGameOver(true);

      return;
    }
    
    const allFieldsFilled = boardValues.every((value) => value);
    if(!haveWinner && allFieldsFilled) {
      const scoreCopy = {...score};
      scoreCopy.DRAWS += 1;
      console.log(scoreCopy);
      
      setScore(scoreCopy);
      setGameOver(true);
    }
  }


  const handleClick = (index) => {
    // null => falsy
    // string => truthy
    if (boardValues[index] || gameOver) {
      return;
    }
    // shallow copy
    const boardValuesCopy = [...boardValues];

    //dynamically set activePlayer value based on index
    boardValuesCopy[index] = activePlayer;

    setBoardValues(boardValuesCopy);
    setActivePlayer(activePlayer === 'X' ? 'O' : 'X');

  };

  const resetGame = () => {
    setActivePlayer('X');
    setBoardValues(Array(9).fill(null));
    setGameOver(false);
    setWinner(null);
  }

  useEffect(() => {
    checkForWinner();
    // eslint-disable-next-line
  }, [boardValues]);

  return (
    <div className="App">
      <div className="App-header">
        <h3>Tic tac toe</h3>
        <div className="board">
          <div className="row-1">
            <div className="field" onClick={() => handleClick(0)}>{boardValues[0]}</div>
            <div className="field" onClick={() => handleClick(1)}>{boardValues[1]}</div>
            <div className="field" onClick={() => handleClick(2)}>{boardValues[2]}</div>
          </div>
          <div className="row-2">
            <div className="field" onClick={() => handleClick(3)}>{boardValues[3]}</div>
            <div className="field" onClick={() => handleClick(4)}>{boardValues[4]}</div>
            <div className="field" onClick={() => handleClick(5)}>{boardValues[5]}</div>
          </div>
          <div className="row-3">
            <div className="field" onClick={() => handleClick(6)}>{boardValues[6]}</div>
            <div className="field" onClick={() => handleClick(7)}>{boardValues[7]}</div>
            <div className="field" onClick={() => handleClick(8)}>{boardValues[8]}</div>
          </div>
        </div>
        {gameOver &&
          <div className="game-over-wrapper">
            <p>Game over</p>
            {winner ? <p>Winner is: <b>{winner}</b></p>: <p>Draw</p>}
            <button className="new-game" onClick={resetGame}>Play new game</button>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
