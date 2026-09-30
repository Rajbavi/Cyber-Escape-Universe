
import { useState } from "react";

function Mission({ mission, onBack }) {
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (!mission) {
    return (
      <div className="mission-page">
        <h2>Mission not found</h2>
        <button onClick={onBack}>⬅ Back</button>
      </div>
    );
  }

  const submitAnswer = async () => {
    if (!answer.trim()) {
      setResult({
        correct: false,
        message: "Please enter your answer.",
      });
      return;
    }

    setSubmitting(true);
    setResult(null);

    try {
      const token = localStorage.getItem("access_token");

      const response = await fetch(
        `http://127.0.0.1:8000/api/missions/${mission.id}/submit/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            answer: answer,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResult(data);
      } else {
        console.log("MISSION RESPONSE:", response.status, data);

        setResult({
          correct: false,
          message:
            data.detail ||
            data.message ||
            data.error ||
            "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);

      setResult({
        correct: false,
        message: "Unable to connect to the server.",
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="mission-page">

      <button className="back-btn" onClick={onBack}>
        ⬅ Back to Missions
      </button>

      <div className="mission-box">

        <div className="mission-icon">
          🎯
        </div>

        <h1>{mission.title}</h1>

        <p className="mission-description">
          {mission.description}
        </p>

        <div className="mission-info">

          <span>
            ⭐ Difficulty: {mission.difficulty}
          </span>

          <span>
            🏆 Points: {mission.points}
          </span>

        </div>

        <div className="answer-section">

          <label>Your Answer</label>

          <input
            type="text"
            placeholder="Type your answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <button
            className="submit-btn"
            onClick={submitAnswer}
            disabled={submitting}
          >
            {submitting
              ? "Submitting..."
              : "🚀 Submit Answer"}
          </button>

        </div>

        {result && (
          <div className="result-box">

            <h2>
              {result.correct
                ? "🎉 Correct!"
                : "❌ Incorrect"}
            </h2>

            <p>
              {result.message}
            </p>

            {result.score !== undefined && (
              <p>
                🏆 Score: {result.score}
              </p>
            )}

          </div>
        )}

      </div>

    </div>
  );
}

export default Mission;
```
