import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, #123b5c, transparent 35%), #050b16",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "40px 25px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {/* Navigation */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          <h2 style={{ margin: 0 }}>
            🛡️ Cyber Escape Universe
          </h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
            }}
          >
            <Link to="/login">
              <button
                style={{
                  padding: "10px 20px",
                  border: "1px solid #294b60",
                  borderRadius: "8px",
                  background: "transparent",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Login
              </button>
            </Link>

            <Link to="/register">
              <button
                style={{
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#00f5ff",
                  color: "#041018",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Register
              </button>
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section
          style={{
            textAlign: "center",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <div style={{ fontSize: "70px" }}>
            🛡️
          </div>

          <h1
            style={{
              fontSize: "48px",
              margin: "20px 0",
            }}
          >
            Cyber Escape Universe
          </h1>

          <p
            style={{
              color: "#b6c8d4",
              fontSize: "20px",
              lineHeight: "1.7",
            }}
          >
            Learn cybersecurity through interactive missions,
            challenges, and real-world security scenarios.
          </p>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "15px",
              marginTop: "30px",
              flexWrap: "wrap",
            }}
          >
            <Link to="/login">
              <button
                style={{
                  padding: "14px 28px",
                  border: "none",
                  borderRadius: "8px",
                  background: "#00f5ff",
                  color: "#041018",
                  fontWeight: "bold",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                🚀 Start Your Journey
              </button>
            </Link>

            <Link to="/register">
              <button
                style={{
                  padding: "14px 28px",
                  border: "1px solid #294b60",
                  borderRadius: "8px",
                  background: "#071521",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                📝 Create Account
              </button>
            </Link>
          </div>
        </section>

        {/* Mission Highlights */}
        <section
          style={{
            marginTop: "80px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: "30px",
            }}
          >
            🎯 What You'll Learn
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                background: "#091826",
                border: "1px solid #1b5268",
                borderRadius: "15px",
                padding: "25px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px" }}>🎣</div>

              <h3>Phishing Detection</h3>

              <p style={{ color: "#8da8b9" }}>
                Identify fake messages, suspicious links,
                and phishing attacks.
              </p>
            </div>

            <div
              style={{
                background: "#091826",
                border: "1px solid #1b5268",
                borderRadius: "15px",
                padding: "25px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px" }}>🔐</div>

              <h3>Password Security</h3>

              <p style={{ color: "#8da8b9" }}>
                Learn how strong passwords protect your
                online accounts.
              </p>
            </div>

            <div
              style={{
                background: "#091826",
                border: "1px solid #1b5268",
                borderRadius: "15px",
                padding: "25px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "40px" }}>🦠</div>

              <h3>Malware Detection</h3>

              <p style={{ color: "#8da8b9" }}>
                Understand suspicious behavior caused by
                malware.
              </p>
            </div>
          </div>
        </section>

        {/* Score */}
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
            padding: "25px",
            background: "#091826",
            borderRadius: "15px",
            border: "1px solid #1b5268",
          }}
        >
          <h2>🏆 Complete 3 Missions</h2>

          <p
            style={{
              color: "#8da8b9",
              fontSize: "17px",
            }}
          >
            Earn up to <strong>30 points</strong> while improving
            your cybersecurity awareness.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;