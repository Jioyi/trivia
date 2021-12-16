import React, { useState, useEffect } from 'react';
import triviaData from './data';
import './Trivia.css';
//components
import ProgressBar from '../ProgressBar';
import Countdown from '../Countdown';
//hooks
import useAsyncState from '../../hooks/useAsyncState';

const App = () => {
	const [selectedAnswer, setSelectedAnswer] = useState('');
	const [checkT, setCheckT] = useState(false);
	const [seconds, setSeconds] = useState(15);
	const [triviaState, setTriviaState] = useState('');
	const [DataTrivia, setDataTrivia] = useState({});
	const [currentQuestion, setAsyncCurrentQuestion] = useAsyncState(0);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [show, setShow] = useState(false);

	const loadTrivia = () => {
		setDataTrivia({
			title: triviaData.title,
			image: triviaData.image,
			questions: triviaData.questions,
			totalQuestions: triviaData.questions.length,
		});
		setTriviaState('start');
	};

	const startTimer = (question) => {
		setSeconds(DataTrivia.questions[question].lifetimeSeconds);
		let timer = DataTrivia.questions[question].lifetimeSeconds;
		let myInterval = setInterval(() => {
			if (timer > 0) {
				console.log('timer:', timer);
				timer--;
				tick(timer);
			}
			if (timer === 0) {
				clearInterval(myInterval);
				setCheckT(true);
			}
		}, 1000);
	};

	const tick = (timer) => {
		setSeconds(timer);
	};

	const startTrivia = () => {
		setTriviaState('answering');
		startTimer(0);
	};

	const checkAnswer = async () => {
		setCheckT(false);
		const options = DataTrivia.questions[currentQuestion].options;
		const check = options.find((question) => question.text === selectedAnswer);
		if (check && check.correct) {
			setCorrectAnswers(correctAnswers + 1);
		}

		if (DataTrivia.totalQuestions === currentQuestion + 1) {
			console.log('end');
			setTriviaState('end');
		} else {
			const currentState = await setAsyncCurrentQuestion(currentQuestion + 1);
			startTimer(currentState);
		}
	};

	const showResult = () => {
		setShow(true);
		let timer = 3;
		let myInterval = setInterval(() => {
			if (timer > 0) {
				timer--;
			}
			if (timer === 0) {
				clearInterval(myInterval);
				setShow(false);
				checkAnswer();
			}
		}, 1000);
	};

	useEffect(() => {
		if (checkT) {
			showResult();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkT]);

	useEffect(() => {
		loadTrivia();
	}, []);

	if (triviaState === 'start') {
		return (
			<div className="Trivia">
				<span className="title">{DataTrivia.title}</span>
				<img
					src={DataTrivia.image}
					alt={DataTrivia.title}
					className="responsive-image"
				/>
				<button className="button-start" onClick={startTrivia}>
					Comenzar
				</button>
			</div>
		);
	} else if (triviaState === 'answering') {
		return (
			<div className="Trivia">
				<Countdown
					bgcolor="#413779"
					color="#836ff2"
					total={DataTrivia.questions[currentQuestion].lifetimeSeconds}
					current={seconds}
				/>
				<span className="question-text">
					{`${DataTrivia.questions[currentQuestion].text}?`}
				</span>
				{DataTrivia.questions[currentQuestion].options.map((option, index) => (
					<button
						key={index}
						className={`question-button ${
							selectedAnswer === option.text ? 'selected' : null
						} ${show && option.correct ? 'show' : null}`}
						onClick={() => setSelectedAnswer(option.text)}
					>
						{option.text}
					</button>
				))}
				<span className="question-number">{`${currentQuestion + 1} de ${
					DataTrivia.totalQuestions
				} preguntas`}</span>
				<ProgressBar
					bgcolor="#413779"
					color="#836ff2"
					total={DataTrivia.totalQuestions}
					current={currentQuestion + 1}
				/>
			</div>
		);
	} else if (triviaState === 'end') {
		return (
			<div className="Trivia">
				<span className="question-text">Resultados:</span>
				<span className="question-text">{`cantidad de aciertos: ${correctAnswers}`}</span>
				<span className="question-number">{`${currentQuestion + 1} de ${
					DataTrivia.totalQuestions
				} preguntas`}</span>
				<ProgressBar
					bgcolor="#413779"
					color="#836ff2"
					total={DataTrivia.totalQuestions}
					current={currentQuestion + 1}
				/>
			</div>
		);
	} else {
		return <div className="Trivia">loadding</div>;
	}
};

export default App;
