import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar.jsx";
import Login from "./Pages/Login.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import CreateUser from "./Pages/CreateUser.jsx";
import StaffDashboard from "./Pages/StaffDashboard.jsx";
import VisitorTrack from "./Pages/VisitorTrack.jsx";
import RegisterVisitor from "./Pages/RegisterVisitor.jsx";
import IncidentLog from "./Pages/IncidentLog.jsx";
import SecurityGate from "./Pages/SecurityGate.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
function App() {
  return (
    <BrowserRouter>
            <TopNavbar/>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/create" element={<ProtectedRoute roles={["admin"]}><CreateUser /></ProtectedRoute>}/>

        <Route path="*" element={<Navigate to="/" replace />} />

        <Route path="/staff" element={<ProtectedRoute roles={["staff"]}><StaffDashboard /></ProtectedRoute>}/>
        <Route path="/tracking" element={<ProtectedRoute roles={["staff", "security"]}><VisitorTrack /></ProtectedRoute>}/>
        <Route path="/register" element={<ProtectedRoute roles={["staff"]}><RegisterVisitor /></ProtectedRoute>}/>
        <Route path="/incidents" element={<ProtectedRoute roles={["staff"]}><IncidentLog /></ProtectedRoute>}/>

        <Route path="/gate" element={<ProtectedRoute roles={["security"]}><SecurityGate /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
