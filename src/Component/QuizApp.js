import React, { useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import Review from './Review';



function QuizApp(props) {
  var questions=props.question
  var firstQ = props.firstQ
  var currentQuestion = props.currentQuestion
  var setCurrentQuestion = props.setCurrentQuestion
  

  console.log("currentQuestion",currentQuestion)
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [arr, setArr] = useState([]);
  const [show, setShow] = useState(false)


  useEffect(() => {
    if (showScore) {
      const calculatedScore = calculateScore();
      setScore(calculatedScore);
    }
  }, [showScore, answers]);

  const handleAnswerClick = (selectedOption) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedOption;
    setAnswers(newAnswers);

  };

  const handleNextClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
    const newArr = [...answers];
    setArr(newArr);
    props.setAns(answers)
    console.log(answers,"answessss")
    setCurrentQuestion(0)

  };

  const calculateScore = () => {
    let calculatedScore = 0;
    for (let i = 0; i < questions.length; i++) {
      if (answers[i] === questions[i].correctAnswer) {
        calculatedScore++;
      } 
    }
    return calculatedScore;
  };

  const handelreview =()=>{
    setShow(true)
    redirect("/review")
  }
  console.log("show",show)


  return (
    <div>
      {showScore  ? (
        <div>
          <h2>Your Score: {score} out of {questions.length}</h2>
          <Link to="/review" onClick={handelreview}>Review</Link>
        </div>
      ) : currentQuestion == 0 || (
        <div>

          <h3>
            {currentQuestion }. {questions[currentQuestion].question}
          </h3>
          <ul>
            { questions[currentQuestion].options.map((option, index) => (
              <li key={index}>
                <button onClick={() => handleAnswerClick(option)}>{option}</button>
              </li>
            ))}
          </ul>
          <button onClick={handlePrevClick} disabled={currentQuestion === 1}>
            Previous
          </button>
          <button onClick={handleNextClick} disabled={currentQuestion === questions.length - 1}>
            Next
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
