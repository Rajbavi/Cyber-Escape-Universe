import { useState } from "react";
import { Link } from "react-router-dom";

function PhishingMission() {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const checkAnswer = async (answer) => {
    if (answer === "phishing") {
      setResult("✅ Correct! This is a Phishing message. 🎉");
      setScore(10);
      setCompleted(true);

      localStorage.setItem("cyberScore", "10");

      try {
        const token = localStorage.getItem("access_token");

        const response = await fetch(
          "http://127.0.0.1:8000/api/game/progress/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
            body: JSON.stringify({
              mission: 1,
              completed: true,
              score: 10,
              attempts: 1,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          console.log("Progress save failed:", data);
        } else {
          console.log("Progress saved:", data);
        }
      } catch (error) {
        console.log("Error saving progress:", error);
      }
    } else {
      setResult("❌ Wrong! This message is Phishing.");
      setScore(0);
      setCompleted(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: "36px" }}>
            🎣 Phishing Detection
          </h1>

          <p style={{ color: "#cbd5e1", fontSize: "18px" }}>
            Identify suspicious messages and protect yourself
            from phishing attacks.
          </p>
        </div>

        {/* Score */}
        <div
          style={{
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            🏆 Score: {score}/10
          </h2>
        </div>

        {/* Scenario */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "25px",
          }}
        >
          <h2>📧 Security Alert</h2>

          <p
            style={{
              color: "#cbd5e1",
              lineHeight: "1.7",
              fontSize: "17px",
            }}
          >
            Your bank account will be suspended today.
            Click the link below immediately to verify your
            account.
          </p>

          <div
            style={{
              background: "#071521",
              padding: "15px",
              borderRadius: "8px",
              marginTop: "20px",
              color: "#00f5ff",
            }}
          >
            🔗 http://secure-bank-verify.com
          </div>

          <p
            style={{
              color: "#94a3b8",
              marginTop: "20px",
            }}
          >
            ⚠️ Analyze the message carefully before choosing
            your answer.
          </p>

          {/* Answer Buttons */}
          <div
            style={{
              display: "flex",
              gap: "15px",
              marginTop: "25px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() => checkAnswer("phishing")}
              style={{
                padding: "14px 25px",
                border: "none",
                borderRadius: "8px",
                background: "#ef4444",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              🚨 Phishing
            </button>

            <button
              type="button"
              onClick={() => checkAnswer("safe")}
              style={{
                padding: "14px 25px",
                border: "none",
                borderRadius: "8px",
                background: "#22c55e",
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              ✅ Safe
            </button>
          </div>

          {/* Result */}
          {result && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "10px",
                background: completed
                  ? "#14532d"
                  : "#7f1d1d",
              }}
            >
              <h3>{result}</h3>

              {completed && (
                <p style={{ marginBottom: 0 }}>
                  🎉 Mission Completed! +10 Points
                </p>
              )}
            </div>
          )}
        </div>

        {/* Back */}
        <div
          style={{
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <Link to="/missions">
            <button
              type="button"
              style={{
                padding: "12px 22px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              ⬅️ Back to Missions
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PhishingMission;