import { useState, useEffect } from "react";
import SecuritySidebar from "../Components/SecuritySidebar";
import { Card, Button, Form, Badge, Row, Col, Alert } from "react-bootstrap";
import "../Styles/SecurityGate.css";
import api from "../API/api.js";

const SecurityGate = () => {
  const [mode, setMode] = useState("checkin"); // checkin | checkout
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visits, setVisits] = useState([]);
useEffect(() => {
  const fetchVisits = async () => {
    try {
      const res = await api.get("/staff/visits");
      setVisits(res.data);
    } catch (err) {
      console.error("Failed to load visits:", err);
    }
  };

  fetchVisits();
}, []);

  const validateCode = async () => {
      if(!code) return;
      setLoading(true);
      setResult(null);
      
      try {
       const endpoint=
       mode === "checkin"
       ? "/security/check-in"
       : "/security/check-out";
       const response = await api.post(endpoint, { access_code: code.trim(), });
       setResult({
        status: "success",
        visits: response.data.visits||response.data,
       });
      } catch (error) {
        console.error("Error validating code:", error);
        const message = error.response?.data?.message || "Invalid access code";
        setResult({ status: "error", message, });
      }
      finally {
        setLoading(false);
      }
  };
 const activeCount = visits.filter(
  (visit) => visit.status === "active"
).length;

const overdueCount = visits.filter(
  (visit) => visit.status === "overdue"
).length;

const checkedOutToday = visits.filter((v) => {
  if (!v.check_out_time) return false;
  const today = new Date().toDateString();
  return new Date(v.check_out_time).toDateString() === today;
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
                <Button onClick={validateCode} disabled={loading}>{loading ? "Loading..." : "Validate"}</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        {/* Result */}
        {result?.status === "success" && (
          <Alert variant="success">
            <div className="fw-semibold mb-2">
             {mode === "checkin" ? "Check-In Successful" : "Check-Out Successful"}
            </div>

            <Row>
              <Col md={6}>
                <div className="info-label">Visitor Name</div>
                <div>{result.visits.visitor_name}</div>
              </Col>
              <Col md={6}>
                <div className="info-label">Host</div>
                <div>{result.visits.host_name}</div>
              </Col>
            </Row>

            <Row className="mt-2">
              <Col md={6}>
                <div className="info-label">Purpose</div>
                <div>{result.visits.purpose}</div>
              </Col>
              <Col md={6}>
                <div className="info-label">Expected Check-Out</div>
                <div>{new Date(result.visits.expected_check_out).toLocaleString()}</div>
              </Col>
            </Row>
          </Alert>
        )}

        {result?.status === "error" && (
          <Alert variant="danger">{result.message}</Alert>
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
