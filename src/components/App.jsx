import React, { useState, useEffect } from "react";
import Description from "./Description";
import Options from "./Options";
import Feedback from "./Feedback";
import "./App.css";

function App() {
	const initialFeedback = () => {
		const storedFeedback = localStorage.getItem("feedback");
		return storedFeedback
			? JSON.parse(storedFeedback)
			: { good: 0, neutral: 0, bad: 0 };
	};

	const [feedback, setFeedback] = useState(initialFeedback);

	useEffect(() => {
		localStorage.setItem("feedback", JSON.stringify(feedback));
	}, [feedback]);

	const handleFeedback = (type) => {
		setFeedback((prevFeedback) => ({
			...prevFeedback,
			[type]: prevFeedback[type] + 1,
		}));
	};

	const handleReset = () => {
		const resetFeedback = { good: 0, neutral: 0, bad: 0 };
		setFeedback(resetFeedback);
		localStorage.removeItem("feedback"); // Opcjonalnie, usuń dane z localStorage podczas resetu
	};

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positivePercentage = totalFeedback
		? Math.round((feedback.good / totalFeedback) * 100)
		: 0;

	return (
		<div className="app-container">
			<Description />
			<Options onLeaveFeedback={handleFeedback} onReset={handleReset} />
			<Feedback
				good={feedback.good}
				neutral={feedback.neutral}
				bad={feedback.bad}
				total={totalFeedback}
				positivePercentage={positivePercentage}
			/>
		</div>
	);
}

export default App;
