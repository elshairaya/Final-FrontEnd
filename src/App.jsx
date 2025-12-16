import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import TopNavbar from "./Components/TopNavbar.jsx";
import Login from "./Pages/Login.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import CreateUser from "./Pages/CreateUser.jsx";
import StaffDashboard from "./Pages/StaffDashboard.jsx";
import VisitorTrack from "./Pages/VisitorTrack.jsx";
import RegisterVisitor from "./Pages/RegisterVisitor.jsx";

function App() {
  return (
    <BrowserRouter>
            <TopNavbar  username="System Administrator" role="Admin"/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateUser/>}/>
        <Route path="*" element={<Link to="/login" />} />
        <Route path="/staff" element={<StaffDashboard/>}/>
        <Route path="/tracking" element={<VisitorTrack role="Security"/>}/>
        <Route path="/register" element={<RegisterVisitor/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
