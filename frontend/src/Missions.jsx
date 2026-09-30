import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Missions() {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) return;

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/game/progress/",
          {
            method: "GET",
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.log("Failed to fetch mission progress");
          return;
        }

        const data = await response.json();

        console.log("Mission progress:", data);

        setMissions(data);
      } catch (error) {
        console.log("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, []);

  const isCompleted = (missionId) => {
    const mission = missions.find((item) => {
      const id =
        item.mission?.id ??
        item.mission_id ??
        item.mission;

      return Number(id) === Number(missionId);
    });

    return (
      mission?.completed === true ||
      mission?.completed === 1 ||
      mission?.completed === "true"
    );
  };

  const missionCardStyle = {
    background: "#091826",
    border: "1px solid #1b5268",
    padding: "28px",
    borderRadius: "16px",
    transition: "0.3s",
  };

  const completedStyle = {
    display: "inline-block",
    marginTop: "10px",
    padding: "8px 15px",
    borderRadius: "20px",
    background: "#123d2b",
    color: "#4ade80",
    fontWeight: "bold",
  };

  const buttonStyle = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#00f5ff",
    color: "#041018",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #123b5c, transparent 35%), #050b16",
        color: "white",
        padding: "35px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: "1050px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "45px" }}>
          <div style={{ fontSize: "55px" }}>🎮</div>

          <h1 style={{ fontSize: "40px", margin: "10px 0" }}>
            Cyber Missions
          </h1>

          <p
            style={{
              color: "#8da8b9",
              fontSize: "18px",
              lineHeight: "1.6",
            }}
          >
            Test your cybersecurity knowledge through interactive
            challenges. 🛡️
          </p>
        </div>

        {/* Mission Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "22px",
          }}
        >

          {/* Phishing */}
          <div style={missionCardStyle}>
            <div style={{ fontSize: "45px" }}>🎣</div>

            <h2>Phishing Detection</h2>

            <p
              style={{
                color: "#8da8b9",
                lineHeight: "1.6",
              }}
            >
              Identify fake messages, suspicious links, and
              phishing attacks.
            </p>

            <p>🎯 Difficulty: Beginner</p>
            <p>🏆 Reward: 10 Points</p>

            {isCompleted(1) ? (
              <div style={completedStyle}>
                ✅ Mission Completed
              </div>
            ) : (
              <Link to="/missions/phishing">
                <button style={buttonStyle}>
                  🚨 Start Mission
                </button>
              </Link>
            )}
          </div>

          {/* Password */}
          <div style={missionCardStyle}>
            <div style={{ fontSize: "45px" }}>🔐</div>

            <h2>Password Security</h2>

            <p
              style={{
                color: "#8da8b9",
                lineHeight: "1.6",
              }}
            >
              Learn how to create strong passwords and protect
              your online accounts.
            </p>

            <p>🎯 Difficulty: Beginner</p>
            <p>🏆 Reward: 10 Points</p>

            {isCompleted(2) ? (
              <div style={completedStyle}>
                ✅ Mission Completed
              </div>
            ) : (
              <Link to="/missions/password">
                <button style={buttonStyle}>
                  🔐 Start Mission
                </button>
              </Link>
            )}
          </div>

          {/* Malware */}
          <div style={missionCardStyle}>
            <div style={{ fontSize: "45px" }}>🦠</div>

            <h2>Malware Detection</h2>

            <p
              style={{
                color: "#8da8b9",
                lineHeight: "1.6",
              }}
            >
              Identify suspicious computer behavior caused by
              malware.
            </p>

            <p>🎯 Difficulty: Intermediate</p>
            <p>🏆 Reward: 10 Points</p>

            {isCompleted(3) ? (
              <div style={completedStyle}>
                ✅ Mission Completed
              </div>
            ) : (
              <Link to="/missions/malware">
                <button style={buttonStyle}>
                  🦠 Start Mission
                </button>
              </Link>
            )}
          </div>

        </div>

        {/* Total Score */}
        <div
          style={{
            marginTop: "45px",
            padding: "30px",
            background: "#091826",
            border: "1px solid #1b5268",
            borderRadius: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "40px" }}>🏆</div>

          <h2>Total Available Score</h2>

          <div
            style={{
              fontSize: "38px",
              fontWeight: "bold",
              color: "#00f5ff",
            }}
          >
            30 Points
          </div>

          <p style={{ color: "#8da8b9" }}>
            Complete all 3 missions to achieve 30/30!
          </p>
        </div>

        {/* Back Button */}
        <div
          style={{
            textAlign: "center",
            marginTop: "35px",
          }}
        >
          <Link to="/dashboard">
            <button
              style={{
                padding: "12px 24px",
                border: "1px solid #294b60",
                borderRadius: "8px",
                background: "#071521",
                color: "white",
                cursor: "pointer",
                fontSize: "15px",
              }}
            >
              ⬅️ Back to Dashboard
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Missions;

