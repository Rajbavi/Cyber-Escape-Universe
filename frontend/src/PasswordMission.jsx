import { useState } from "react";
import { Link } from "react-router-dom";

function PasswordMission() {
  const [result, setResult] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const checkAnswer = async (answer) => {
    if (answer === "strong") {
      setResult("✅ Correct! This is a strong password. 🎉");
      setScore(10);
      setCompleted(true);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/game/progress/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization:
                "Bearer " +
                localStorage.getItem("access_token"),
            },
            body: JSON.stringify({
              mission: 2,
              completed: true,
              score: 10,
              attempts: 1,
            }),
          }
        );

        if (response.ok) {
          console.log("Password mission progress saved!");
        } else {
          const errorData = await response.text();
          console.log(
            "Progress save failed:",
            response.status,
            errorData
          );
        }
      } catch (error) {
        console.log("Error saving progress:", error);
      }
    } else {
      setResult("❌ Wrong! This password is weak.");
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
            🔐 Password Security
          </h1>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "18px",
            }}
          >
            Learn how to create strong passwords and protect
            your accounts.
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

        {/* Question */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "15px",
            marginTop: "25px",
          }}
        >
          <h2>🔑 Choose the Strongest Password</h2>

          <p
            style={{
              color: "#cbd5e1",
              fontSize: "17px",
              lineHeight: "1.6",
            }}
          >
            Which of the following passwords provides the
            strongest protection?
          </p>

          {/* Password Options */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "25px",
            }}
          >
            <button
              type="button"
              onClick={() => checkAnswer("weak")}
              style={{
                padding: "16px",
                border: "1px solid #475569",
                borderRadius: "8px",
                background: "#111827",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              🔑 password123
            </button>

            <button
              type="button"
              onClick={() => checkAnswer("weak")}
              style={{
                padding: "16px",
                border: "1px solid #475569",
                borderRadius: "8px",
                background: "#111827",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              🔑 12345678
            </button>

            <button
              type="button"
              onClick={() => checkAnswer("strong")}
              style={{
                padding: "16px",
                border: "1px solid #22c55e",
                borderRadius: "8px",
                background: "#052e16",
                color: "white",
                fontSize: "16px",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              🔐 T9@kL#72mQ!x
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

        {/* Back Button */}
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

export default PasswordMission;