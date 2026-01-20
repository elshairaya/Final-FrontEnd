import { Navbar, Container, Button } from "react-bootstrap";
import "../Styles/TopNavbar.css";
  const getUser=()=>{
   try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
  const logout=()=>{
    localStorage.removeItem("user");
    window.location.href="/";
  };
function TopNavbar () {
    const user=getUser();
    if(!user)return null;

  return (
    <Navbar className="top-navbar" expand="lg">
      <Container fluid className="d-flex align-items-center">

        <div className="brand-block d-flex align-items-center gap-2">
          <div className="logo-box">
            <i className="bi bi-shield"></i>
          </div>

          <div className="brand-text">
            <div className="system-title">HTU Visitor Management</div>
            <div className="system-subtitle">{user.role} Portal</div>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="user-name">{user.username}</div>

          <Button variant="outline-danger" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>

      </Container>
    </Navbar>
  );
};

export default TopNavbar;
