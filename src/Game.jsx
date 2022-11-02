import React from "react";
import Question from "./Question";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  reset,
  checkAnswers,
  playAgain,
  selectData,
  selectCheck,
  selectPlayAgain,
} from "./app/appSlice";
// import data from "./api.json";

// category=17 -> science and nature
// category=23 -> history
// category=25 -> art
const CATEGORY = 25;
const NUM_OF_QUESTIONS = 5;

export default function Game() {
  // Selectors
  const dataStatus = useSelector((state) => state.app.status);
  const data = useSelector(selectData);
  const score = useSelector((state) => state.app.score);
  const doCheckResults = useSelector(selectCheck);
  const intPlayAgain = useSelector(selectPlayAgain);

  const dispatch = useDispatch();

  const apiUrl = `https://opentdb.com/api.php?amount=${NUM_OF_QUESTIONS}&category=${CATEGORY}&type=multiple`;

  React.useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchData(apiUrl));
    }
  }, [intPlayAgain]);

  function callPlayAgain() {
    dispatch(reset());
    dispatch(playAgain());
  }

  let quiz = null;
  if (data) {
    quiz = data.map(
      (elem, index) => (
        <Question
          key={elem.questionId}
          id={index}
        />
      )
    );
  }

  if (dataStatus === "loading") {
    return <h3>loading...</h3>;
  }

  return (
    <div className="Game">
      {quiz}
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
    </div>
  );
}
