import "./Feedback.css";

function Feedback({ good, neutral, bad, total, positivePercentage }) {
	return (
		<div className="feedback-container">
			<p>Good: {good}</p>
			<p>Neutral: {neutral}</p>
			<p>Bad: {bad}</p>
			<p>Total: {total}</p>
			<p>Positive: {positivePercentage}%</p>
		</div>
	);
}

export default Feedback;
