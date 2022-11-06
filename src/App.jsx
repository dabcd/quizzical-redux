import React from "react";
import Start from "./Start";
import Game from "./Game";

export default function App() {
  const [topic, setTopic] = React.useState(null);

  return (
    <div className="App">
      {topic ? (
        <Game topic={topic} />
      ) : (
        <Start getTopic={(t) => setTopic(t)} />
      )}
    </div>
  );
}
