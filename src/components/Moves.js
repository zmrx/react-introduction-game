import React from "react";

export const Moves = (props) => {
  const movesList = props.history.map( (step, move) => {
    return(
      <li key={move}>
        <button onClick={()=> this.jumpTo(move)}>{move ? `Перейти к ходу ${move}` : `К началу игры`}</button>
      </li>
      );
  });

  return (
    <ol>{movesList}</ol>
  );
}
