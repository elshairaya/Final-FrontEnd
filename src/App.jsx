import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Login from "./Components/Login.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import CreateUser from "./Components/CreateUser.jsx";
import StaffDashboard from "./Components/StaffDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateUser/>}/>
        <Route path="*" element={<Link to="/login" />} />
        <Route path="/staff" element={<StaffDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
