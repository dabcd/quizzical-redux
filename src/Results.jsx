import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  reset,
  checkAnswers,
  playAgain,
  selectCheck,
} from "./app/appSlice";
import { NUM_OF_QUESTIONS } from "./prefs";

export default function Results() {

  const score = useSelector((state) => state.app.score);
  const doCheckResults = useSelector(selectCheck);

  const dispatch = useDispatch();

  function callPlayAgain() {
    dispatch(reset());
    dispatch(playAgain());
  }

  return (
    <>
      {doCheckResults ? (
        <div className="game--results">
          <div className="game--score">
            You scored {score}/{NUM_OF_QUESTIONS} correct answers
          </div>
          <button className="game--button" onClick={callPlayAgain}>
            Play again
          </button>
        </div>
      ) : (
        <button
          className="game--button"
          onClick={() => dispatch(checkAnswers())}
        >
          Check answers
        </button>
      )}
    </>
  );
}
