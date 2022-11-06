import React from "react";
import { decode } from "html-entities";
import Answer from "./Answer";
import { useDispatch, useSelector } from "react-redux";
import { increaseScore, selectData, selectCheck } from "./app/appSlice";

function initChoices() {
  const a = [];
  for (let i = 0; i < 4; i++) {
    a.push({ isChosen: false, isCorrect: false });
  }
  return a;
}

export default function Question(props) {
  const [choices, setChoices] = React.useState(initChoices());

  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const doCheckResults = useSelector(selectCheck);

  React.useEffect(() => {
    if (doCheckResults) {
      checkResults();
    }
  }, [doCheckResults]);

  function checkResults() {
    for (let i = 0; i < 4; i++) {
      if (data[props.id].answers[i] === data[props.id].correct_answer) {
        setChoices((prev) =>
          prev.map((elem, index) => {
            return index === i ? { ...elem, isCorrect: true } : elem;
          })
        );
        if (choices[i].isChosen) {
          dispatch(increaseScore());
        }
      }
    }
  }

  function chooseAnswer(id) {
    if (!doCheckResults) {
      setChoices((prev) =>
        prev.map((elem, index) => {
          return index === id
            ? { ...elem, isChosen: true }
            : { ...elem, isChosen: false };
        })
      );
    }
  }

  let answersElements = [];
  for (let i = 0; i < 4; i++) {
    answersElements[i] = (
      <Answer
        key={data[props.id].answersId[i]}
        id={i}
        qId={props.id}
        chooseAnswer={chooseAnswer}
        isChosen={choices[i].isChosen}
        isCorrect={choices[i].isCorrect}
      />
    );
  }

  return (
    <div className="Question">
      <div className="q--question">{decode(data[props.id].question)}</div>
      <div className="q--answers">{answersElements}</div>
    </div>
  );
}
