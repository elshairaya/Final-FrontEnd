import StaffSidebar from "../Components/StaffSidebar";
import { Card, Row, Col, Badge } from "react-bootstrap";
import "../styles/IncidentLog.css";
function IncidentLog(){
     const incidents = [
    {
      id: "17652043951680.13241347085682476",
      visitor: "Aya Elshair",
      email: "elshairaya@gmail.com",
      accessCode: "HTU-2024-HOY5",
      expectedCheckout: "08/12/2025, 17:40:00",
      reportedAt: "08/12/2025, 17:33:15",
      host: "Dr. Razan",
      purpose: "test",
    },
    {
      id: "17652043951500.04181801319423761",
      visitor: "John Smith",
      email: "john.smith@example.com",
      accessCode: "HTU-2024-A1B2",
      expectedCheckout: "08/12/2025, 17:00:00",
      reportedAt: "08/12/2025, 17:33:15",
      host: "Dr. Ahmed Hassan",
      purpose: "Research Collaboration",
    },
  ];

return(
<div className="admin-dashboard">
    <StaffSidebar/>
    <Card className="admin-card">
        <main className="admin-content">
            <h4 className="fw-bold">Incident Log</h4>
            <p className="text-muted mb-4">
                Automatically logged incidents for visitors who did not check out on time
            </p>

            <Row className="mb-4">
                <Col md={4}>
                <Card className="summary-card">
                    <div>Total Incidents</div>
                    <strong>2</strong>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="summary-card">
                    <div>Today</div>
                    <strong>2</strong>
                </Card>
                </Col>
            </Row>

            {incidents.map((i,index)=>(
                <Card key={index} className="incident-card mb-3">
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h6 className="incident-title">
                                    Visitor did not check out by expected time
                                </h6>
                                <div className="text-muted small">
                                    Incident ID: {i.id}
                                </div>
                            </div>

                            <Badge bg="danger" className="auto-badge">
                                Auto-Generated
                            </Badge>
                        </div>
                        <Row className="mb-2">
                            <Col md={6}>
                            <div className="incident-lable">Visitor</div>
                            <div className="fw-semibold">{i.visitor}</div>
                            <div className="text-muted small">{i.email}</div>
                            </Col>
                            <Col md={6}>
                            <div className="incident-lable">Access Code</div>
                            <div className="access-code">{i.accessCode}</div>
                            </Col>
                        </Row>

                        <Row className="mb-2">
                            <Col md={6}>
                            <div className="incident-lable">Expected Check-Out</div>
                            <div>{i.expectedCheckout}</div>
                            </Col>

                             <Col md={6}>
                            <div className="incident-lable">Incident Reported</div>
                            <div>{i.reportedAt}</div>
                            </Col>
                        </Row>
                        <hr/>

                        <Row>
                             <Col md={6}>
                            <div className="incident-lable">Host</div>
                            <div>{i.host}</div>
                            </Col>
                             <Col md={6}>
                            <div className="incident-lable">Purpose</div>
                            <div>{i.purpose}</div>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            ))}
        </main>
    </Card>
</div>
);
}
export default IncidentLog;