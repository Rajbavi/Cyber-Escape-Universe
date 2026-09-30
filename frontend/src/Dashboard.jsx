import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [score, setScore] = useState(0);
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const fetchProgress = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
        return;
      }

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
          console.log("Failed to fetch progress:", response.status);
          return;
        }

        const data = await response.json();

        setMissions(data);

        const totalScore = data.reduce(
          (total, mission) =>
            total + (mission.completed ? 10 : 0),
          0
        );

        setScore(totalScore);
      } catch (error) {
        console.log("Error fetching progress:", error);
      }
    };

    fetchProgress();
  }, [navigate]);

  const completedMissions = missions.filter(
    (mission) => mission.completed
  ).length;

  const totalMissions = missions.length;

  const progressPercentage =
    totalMissions > 0
      ? (completedMissions / totalMissions) * 100
      : 0;

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("cyberScore");

    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #123b5c, transparent 35%), #050b16",
        color: "white",
        padding: "30px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "32px",
              }}
            >
              🛡️ Cyber Escape Universe
            </h1>

            <p
              style={{
                color: "#8da8b9",
                marginTop: "8px",
              }}
            >
              Welcome back! Continue your cybersecurity journey.
            </p>
          </div>

          <button
            onClick={handleLogout}
            style={{
              padding: "10px 20px",
              border: "1px solid #294b60",
              borderRadius: "8px",
              background: "#071521",
              color: "white",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </button>
        </div>

        {/* Score + Progress */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Score Card */}
          <div
            style={{
              background: "#091826",
              border: "1px solid #1b5268",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "35px" }}>🏆</div>

            <h2>Your Score</h2>

            <div
              style={{
                fontSize: "42px",
                fontWeight: "bold",
                color: "#00f5ff",
              }}
            >
              {score}/30
            </div>

            <p style={{ color: "#8da8b9" }}>
              Cybersecurity Points
            </p>
          </div>

          {/* Progress Card */}
          <div
            style={{
              background: "#091826",
              border: "1px solid #1b5268",
              borderRadius: "15px",
              padding: "30px",
            }}
          >
            <div style={{ fontSize: "35px" }}>🎯</div>

            <h2>Mission Progress</h2>

            <p
              style={{
                color: "#c8dce8",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {completedMissions} / {totalMissions} Completed
            </p>

            <div
              style={{
                width: "100%",
                height: "12px",
                background: "#172a3a",
                borderRadius: "10px",
                overflow: "hidden",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: `${progressPercentage}%`,
                  height: "100%",
                  background: "#00f5ff",
                  borderRadius: "10px",
                  transition: "width 0.5s ease",
                }}
              ></div>
            </div>

            <p
              style={{
                color: "#8da8b9",
                marginBottom: 0,
              }}
            >
              {Math.round(progressPercentage)}% completed
            </p>
          </div>
        </div>

        {/* Completion Message */}
        {completedMissions === totalMissions &&
          totalMissions > 0 && (
            <div
              style={{
                marginTop: "25px",
                padding: "20px",
                borderRadius: "12px",
                background: "#091826",
                border: "1px solid #1b5268",
                textAlign: "center",
              }}
            >
              <h2 style={{ margin: 0 }}>
                🎉 All Missions Completed!
              </h2>

              <p
                style={{
                  color: "#8da8b9",
                  marginBottom: 0,
                }}
              >
                Excellent work! You completed your
                cybersecurity training.
              </p>
            </div>
          )}

        {/* Missions */}
        <div style={{ marginTop: "40px" }}>
          <h2 style={{ fontSize: "26px" }}>
            🎯 Your Missions
          </h2>

          <div
            style={{
              display: "grid",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            {missions.map((mission) => (
              <div
                key={mission.id}
                style={{
                  background: "#091826",
                  border: "1px solid #1b5268",
                  borderRadius: "12px",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                <div>
                  <h3 style={{ margin: 0 }}>
                    {mission.mission_title}
                  </h3>

                  <p
                    style={{
                      color: "#8da8b9",
                      marginBottom: 0,
                    }}
                  >
                    Cybersecurity Mission
                  </p>
                </div>

                <span
                  style={{
                    padding: "8px 14px",
                    borderRadius: "20px",
                    background: mission.completed
                      ? "#123d2b"
                      : "#302b12",
                    color: mission.completed
                      ? "#4ade80"
                      : "#facc15",
                    fontWeight: "bold",
                  }}
                >
                  {mission.completed
                    ? "✅ Completed"
                    : "⏳ Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore Button */}
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
          }}
        >
          <Link to="/missions">
            <button
              style={{
                padding: "14px 30px",
                border: "none",
                borderRadius: "8px",
                background: "#00f5ff",
                color: "#041018",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              🎯 Explore Missions
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
