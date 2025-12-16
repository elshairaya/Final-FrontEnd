import { Navbar, Container, Button } from "react-bootstrap";
import "../Styles/TopNavbar.css";

function TopNavbar ({username,role}) {
  return (
    <Navbar className="top-navbar" expand="lg">
      <Container fluid className="d-flex align-items-center">

        <div className="brand-block d-flex align-items-center gap-2">
          <div className="logo-box">
            <i className="bi bi-shield"></i>
          </div>

          <div className="brand-text">
            <div className="system-title">HTU Visitor Management</div>
            <div className="system-subtitle">{role} Portal</div>
          </div>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="user-name">{username}</div>

          <Button variant="outline-danger" size="sm">
            Logout
          </Button>
        </div>

      </Container>
    </Navbar>
  );
};

export default TopNavbar;
