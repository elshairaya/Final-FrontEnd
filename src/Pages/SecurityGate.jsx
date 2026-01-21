import { useState, useEffect } from "react";
import SecuritySidebar from "../Components/SecuritySidebar";
import { Card, Button, Form, Badge, Row, Col, Alert } from "react-bootstrap";
import "../Styles/SecurityGate.css";
import api from "../API/api.js";

const SecurityGate = () => {
  const [mode, setMode] = useState("checkin");
  const [code, setCode] = useState("");
  const [visit, setVisit] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([]);

  const formatDate = (d) => (d ? new Date(d).toLocaleString() : "-");

  const fetchVisits = async () => {
    try {
      const res = await api.get("/security/visits");
      setVisits(res.data);
    } catch (err) {
      console.error("Failed to load visits:", err);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

  const validateCode = async () => {
    if (!code) return;

    setLoading(true);
    setError("");
    setVisit(null);

    try {
      const endpoint =
        mode === "checkin"
          ? "/security/check-in"
          : "/security/check-out";

      const res = await api.put(endpoint, {
        access_code: code.trim(),
      });

      setVisit(res.data.visit); // ✅ direct & simple
      setCode("");
      fetchVisits(); // refresh stats
    } catch (err) {
      setError(err.response?.data?.message || "Invalid access code");
    } finally {
      setLoading(false);
    }
  };

  const activeCount = visits.filter(v => v.status === "active").length;
  const overdueCount = visits.filter(v => v.status === "overdue").length;
  const checkedOutToday = visits.filter(v => {
    if (!v.check_out_time) return false;
    return (
      new Date(v.check_out_time).toDateString() ===
      new Date().toDateString()
    );
  }).length;

  return (
    <div className="admin-dashboard">
      <SecuritySidebar />

      <main className="admin-content">
        <h4 className="fw-bold">Security Gate</h4>
        <p className="text-muted mb-3">
          Validate access codes for visitor check-in/check-out
        </p>

        {/* Mode Switch */}
        <div className="mb-3">
          <Button
            variant={mode === "checkin" ? "primary" : "outline-secondary"}
            className="me-2"
            onClick={() => setMode("checkin")}
          >
            Check-In
          </Button>

          <Button
            variant={mode === "checkout" ? "primary" : "outline-secondary"}
            onClick={() => setMode("checkout")}
          >
            Check-Out
          </Button>
        </div>

        {/* Code Input */}
        <Card className="shadow-sm mb-4">
          <Card.Body>
            <Form>
              <Form.Label>Enter Access Code</Form.Label>
              <div className="d-flex gap-2">
                <Form.Control
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="HTU-XXXXXX"
                />
                <Button onClick={validateCode} disabled={loading}>
                  {loading ? "Loading..." : "Validate"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Error */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Success */}
        {visit && (
          <Alert variant="success">
            <div className="fw-semibold mb-2">
              {mode === "checkin"
                ? "Check-In Successful"
                : "Check-Out Successful"}
            </div>

            <Row>
              <Col md={6}>
                <div className="info-label">Visitor Name</div>
                <div>{visit.visitor_name}</div>
              </Col>
              <Col md={6}>
                <div className="info-label">Host</div>
                <div>{visit.host_name}</div>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <div className="info-label">Purpose</div>
                <div>{visit.purpose}</div>
              </Col>
              <Col md={6}>
                <div className="info-label">Expected Check-Out</div>
                <div>{formatDate(visit.expected_check_out)}</div>
              </Col>
            </Row>
          </Alert>
        )}

        {/* Stats */}
        <Row className="mt-4">
          <Col md={4}>
            <Card className="stat-card">
              <Badge bg="success">Active Visitors</Badge>
              <div className="stat-number">{activeCount}</div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="stat-card">
              <Badge bg="primary">Checked Out Today</Badge>
              <div className="stat-number">{checkedOutToday}</div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="stat-card">
              <Badge bg="danger">Overdue</Badge>
              <div className="stat-number">{overdueCount}</div>
            </Card>
          </Col>
        </Row>
      </main>
    </div>
  );
};

export default SecurityGate;
