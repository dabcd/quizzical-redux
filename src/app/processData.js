import { nanoid } from "nanoid";

function shuffleArray(origArray) {
  let array = origArray.slice();
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function processData(data) {
  return new Promise((resolve, reject) => {
    if (data.response_code !== 0) {
      reject(new Error("Error fetching data!"));
    }
    const newData = data.results.map((elem) => ({
      question: elem.question,
      questionId: nanoid(),
      answers: shuffleArray(
        [].concat(elem.incorrect_answers, elem.correct_answer)
      ),
      answersId: Array.from(Array(4)).map(() => nanoid()),
      correct_answer: elem.correct_answer,
    }));
    resolve(newData);
  });
}
