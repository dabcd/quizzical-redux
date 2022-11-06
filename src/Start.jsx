import React from "react";
import { topics } from "./prefs";

export default function Start(props) {

  const quizTopics = topics.map((elem, index) => (
    <button key={index} className="start--topic-button" onClick={() => props.getTopic(elem.id)}>
      {elem.topic}
    </button>
  ));
  return (
    <div className="Start">
      <h1 className="start--title">Quizzical</h1>
      <p className="start--desc">Choose the quiz topic</p>
      <div className="start--topics">
        {quizTopics}
      </div>
    </div>
  );
}
