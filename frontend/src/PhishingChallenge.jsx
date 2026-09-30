import { useState } from "react";
import { Link } from "react-router-dom";

function PhishingChallenge() {
  const [selected, setSelected] = useState("");
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);

  const checkAnswer = () => {
    if (selected === "phishing") {
      setResult("✅ Correct! You identified the phishing message.");
      setScore(100);
    } else if (selected === "safe") {
      setResult(
        "❌ Incorrect. This message contains phishing signs."
      );
      setScore(0);
    } else {
      setResult("⚠️ Please select an answer.");
    }
  };

  return (
    <div className="challenge-page">

      <h1>🎣 Phishing Detection</h1>

      <p>
        Read the message below and decide whether it is
        <strong> Phishing </strong> or <strong> Safe</strong>.
      </p>

      <div className="email-box">

        <h2>📧 Security Alert</h2>

        <p>Dear User,</p>

        <p>
          Your account will be suspended today.
          Click the link below immediately to verify your account.
        </p>

        <p>
          👉 <u>http://secure-account-verification.example</u>
        </p>

        <p>
          Thank you,
          <br />
          Security Team
        </p>

      </div>

      <div className="answer-box">

        <h3>What do you think?</h3>

        <label>
          <input
            type="radio"
            name="answer"
            value="phishing"
            onChange={(e) => setSelected(e.target.value)}
          />
          🎣 Phishing
        </label>

        <br />

        <label>
          <input
            type="radio"
            name="answer"
            value="safe"
            onChange={(e) => setSelected(e.target.value)}
          />
          🛡️ Safe
        </label>

        <br />
        <br />

        <button onClick={checkAnswer}>
          Check Answer
        </button>

      </div>

      {result && (
        <div>
          <h3>{result}</h3>

          {score > 0 && (
            <h2>🏆 Score: {score} Points</h2>
          )}
        </div>
      )}

      <br />

      <Link to="/missions">
        ← Back to Missions
      </Link>

    </div>
  );
}

export default PhishingChallenge;