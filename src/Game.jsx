import React from "react";
import Question from "./Question";
import Results from "./Results";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  selectData,
  selectPlayAgain,
} from "./app/appSlice";
import "./loader.css";
import { NUM_OF_QUESTIONS } from "./prefs";
// import data from "./api.json";

export default function Game(props) {
  // Selectors
  const dataStatus = useSelector((state) => state.app.status);
  const data = useSelector(selectData);
  const intPlayAgain = useSelector(selectPlayAgain);

  const dispatch = useDispatch();

  const apiUrl = `https://opentdb.com/api.php?amount=${NUM_OF_QUESTIONS}&category=${props.topic}&type=multiple`;

  React.useEffect(() => {
    if (dataStatus === "idle") {
      dispatch(fetchData(apiUrl));
    }
  }, [intPlayAgain]);

  let quiz = null;
  if (data) {
    quiz = data.map((elem, index) => (
      <Question key={elem.questionId} id={index} />
    ));
  }

  // Simple CSS loader from 
  // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_loader2
  if (dataStatus === "loading") {
    return <div className="loader"></div>;
  }

  return (
    <div className="Game">
      {quiz}
      <Results />
    </div>
  );
}
