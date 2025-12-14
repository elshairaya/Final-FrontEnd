import TopNavbar from "../Components/TopNavbar";
import StaffSidebar from "../Components/StaffSidebar";

import { Card, Row, Col, Badge } from "react-bootstrap";
import "../Styles/AdminDashboard.css";
import "../Styles/StaffDashboard.css";

const StaffDashboard=()=>{
    return(
        <>
        <TopNavbar  username="Sarah Johnson" role="Staff"/>
        <div className="admin-dashboard">
            <StaffSidebar/>
            <main className="admin-conternt">
                <div className="  py-3 py-md-4">
                    <h4 className="fw-boald mb-1">Dashboard</h4>
                    <p className="text-muted mb-0">
                        Overview of visitors activity
                    </p>
                </div>
                <Row className="g-3 mb-3">
                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Active Visitors</div>
                                    <div className="stat-value">0</div>
                                </div>
                            </Card>
                            </Col>
                            
                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Completed Today</div>
                                    <div className="stat-value">1</div>
                                </div>
                            </Card>
                            </Col>

                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Overdue</div>
                                    <div className="stat-value">2</div>
                                </div>
                            </Card>
                            </Col>

                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Total Incidents</div>
                                    <div className="stat-value">2</div>
                                </div>
                            </Card>
                            </Col>
                        </Row>
                        <Card className="shadow-sm mb-4">
                            <Card.Body>
                                <h6 className="fw-semibold mb-3">Current Active Visitors</h6>
                                <div className="text-muted text-center py-4">
                                    No active visitors at the moment
                                </div>
                            </Card.Body>
                        </Card>
                        
            <Card className="shadow-sm">
              <Card.Body>
                <h6 className="fw-semibold mb-3">Recent Incidents</h6>

                <div className="incident">
                  <Badge bg="danger" className="me-2">!</Badge>
                  <div>
                    <div className="fw-semibold">
                      Aya Elshair - Visitor did not check out by expected time
                    </div>
                    <div className="text-muted small">
                      Reported: 08/12/2025, 17:33:15
                    </div>
                  </div>
                </div>

                <div className="incident">
                  <Badge bg="danger" className="me-2">!</Badge>
                  <div>
                    <div className="fw-semibold">
                      John Smith - Visitor did not check out by expected time
                    </div>
                    <div className="text-muted small">
                      Reported: 08/12/2025, 17:33:15
                    </div>
                  </div>
                </div>

              </Card.Body>
            </Card>
        </main>
      </div>
    </>
  );
};
export default StaffDashboard;