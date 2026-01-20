import { useEffect, useState } from "react";
import StaffSidebar from "../Components/StaffSidebar";
import { Card, Row, Col, Badge } from "react-bootstrap";
import "../styles/IncidentLog.css";
import api from "../API/api";

function IncidentLog() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        const incidentsResponse = await api.get("/staff/incidents");
        setIncidents(incidentsResponse.data);
      } catch (error) {
        console.error("Failed to load incidents:", error);
        alert("Failed to load incident log");
      }
    };

    fetchIncidents();
  }, []);

  // statistics
  const totalIncidents = incidents.length;

  const todayCount = incidents.filter((i) => {
    const today = new Date().toDateString();
    return new Date(i.created_at).toDateString() === today;
  }).length;

  return (
    <div className="admin-dashboard">
      <StaffSidebar />

      <Card className="admin-card">
        <main className="admin-content">
          <h4 className="fw-bold">Incident Log</h4>
          <p className="text-muted mb-4">
            Automatically logged incidents for visitors who did not check out on time
          </p>

          {/* Summary */}
          <Row className="mb-4">
            <Col md={4}>
              <Card className="summary-card">
                <div>Total Incidents</div>
                <strong>{totalIncidents}</strong>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="summary-card">
                <div>Today</div>
                <strong>{todayCount}</strong>
              </Card>
            </Col>
          </Row>

          {/* Incident Cards */}
          {incidents.map((i) => (
            <Card key={i.id} className="incident-card mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <h6 className="incident-title">
                      {i.description}
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
                    <div className="incident-label">Visitor</div>
                    <div className="fw-semibold">{i.visitor_name}</div>
                    <div className="text-muted small">
                      {i.visitor_email}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="incident-label">Access Code</div>
                    <div className="access-code">{i.access_code}</div>
                  </Col>
                </Row>

                <Row className="mb-2">
                  <Col md={6}>
                    <div className="incident-label">Expected Check-Out</div>
                    <div>
                      {new Date(i.expected_check_out).toLocaleString()}
                    </div>
                  </Col>

                  <Col md={6}>
                    <div className="incident-label">Incident Reported</div>
                    <div>
                      {new Date(i.created_at).toLocaleString()}
                    </div>
                  </Col>
                </Row>

                <hr />

                <Row>
                  <Col md={6}>
                    <div className="incident-label">Host</div>
                    <div>{i.host_name}</div>
                  </Col>

                  <Col md={6}>
                    <div className="incident-label">Purpose</div>
                    <div>{i.purpose}</div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}

          {incidents.length === 0 && (
            <div className="text-muted text-center py-4">
              No incidents found
            </div>
          )}
        </main>
      </Card>
    </div>
  );
}

export default IncidentLog;
