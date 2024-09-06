import { useState, useEffect } from "react";
import Description from "./Description.jsx";
import Options from "./Options.jsx";
import Feedback from "./Feedback.jsx";
import Notification from "./Notification.jsx";
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

	const updateFeedback = (feedbackType) => {
		setFeedback((prevFeedback) => ({
			...prevFeedback,
			[feedbackType]: prevFeedback[feedbackType] + 1,
		}));
	};

	const handleReset = () => {
		const resetFeedback = { good: 0, neutral: 0, bad: 0 };
		setFeedback(resetFeedback);
		localStorage.removeItem("feedback");
	};

	const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
	const positivePercentage = totalFeedback
		? Math.round(((feedback.good + feedback.neutral) / totalFeedback) * 100)
		: 0;

	return (
		<div className="app-container">
			<Description />
			<Options onLeaveFeedback={updateFeedback} onReset={handleReset} />

			{totalFeedback > 0 ? (
				<Feedback
					good={feedback.good}
					neutral={feedback.neutral}
					bad={feedback.bad}
					total={totalFeedback}
					positivePercentage={positivePercentage}
				/>
			) : (
				<Notification />
			)}
		</div>
	);
}

export default App;
