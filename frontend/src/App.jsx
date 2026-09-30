import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Missions from "./Missions";
import PhishingMission from "./PhishingMission";
import PasswordMission from "./PasswordMission";
import MalwareMission from "./MalwareMission";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/missions" element={<Missions />} />

      <Route
        path="/missions/phishing"
        element={<PhishingMission />}
      />

      <Route
        path="/missions/password"
        element={<PasswordMission />}
      />

      <Route
        path="/missions/malware"
        element={<MalwareMission />}
      />
    </Routes>
  );
}

export default App;