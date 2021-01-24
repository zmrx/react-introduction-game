import React from 'react';
import { Board } from './Board';
import { Status } from "./Status";
import { Moves } from "./Moves";

export class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.current().squares}
            onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <Status
            status={this.status()}
          />
          <Moves
            history={this.state.history}
          />
        </div>
      </div>
    );
  }

  current() {
    return this.state.history[this.state.stepNumber];
  };
  winner() {
    return this.calculateWinner(this.current().squares);
  };
  status() {
    if (this.winner()) {
      return `Выйграл: ${this.winner()}`;
    }
    return `Следующий ход: ${this.state.xIsNext ? "X" : "O"}`;
  };

  handleClick(i) {
    const history = this.state.history.slice(
      0,
      this.state.stepNumber +1
    );
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';

    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  };

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
}
