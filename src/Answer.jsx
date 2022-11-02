import React from "react";
import { decode } from "html-entities";
import { useSelector } from "react-redux";
import { selectData, selectCheck } from "./app/appSlice";

export default function Answer(props) {
  const data = useSelector(selectData);
  const doCheckResults = useSelector(selectCheck);

  let classes = "Answer";
  props.isChosen && (classes = classes + " answer--chosen");
  props.isCorrect && (classes = classes + " answer--correct");
  doCheckResults && !props.isCorrect && (classes = classes + " answer--wrong");
  doCheckResults && (classes = classes + " answer--overlay");

  return (
    <button className={classes} onClick={() => props.chooseAnswer(props.id)}>
      {decode(data[props.qId].answers[props.id])}
    </button>
  );
}
