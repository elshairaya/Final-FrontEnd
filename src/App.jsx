import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login.jsx";
import AdminDashboard from "./Components/AdminDashboard.jsx";
import CreateUser from "./Components/CreateUser.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateUser/>}/>
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
