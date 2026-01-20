import { useEffect, useState } from "react";
import { Table, Card, Form, Badge, Row, Col } from "react-bootstrap";
import "../Styles/AdminDashboard.css";
import StaffSidebar from "../Components/StaffSidebar";
import SecuritySidebar from "../Components/SecuritySidebar";
import api from "../API/api";

// safe user reader
const getUser = () => {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

function VisitorTrack() {
  const [visits, setVisits] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const user = getUser();

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const res = await api.get("/staff/visits");
        setVisits(res.data);
      } catch (error) {
        console.error("Failed to load visits:", error);
        alert("Failed to load visitor records");
      }
    };

    fetchVisits();
  }, []);

  const getStatusVariant = (status) => {
    switch (status) {
      case "active":
        return "primary";
      case "overdue":
        return "danger";
      case "completed":
        return "success";
      default:
        return "secondary"; // pending
    }
  };

  const filteredVisits = visits.filter((v) => {
    const matchesSearch =
      `${v.visitor_name} ${v.host_name} ${v.access_code}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || v.status === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-dashboard">
      {/* Sidebar based on role */}
      {user?.role === "security" ? <SecuritySidebar /> : <StaffSidebar />}

      <Card className="admin-card">
        <main className="admin-content">
          <h4 className="fw-bold">Visit Tracking</h4>
          <p className="text-muted mb-4">
            View and manage all visitor records
          </p>

          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <Form.Control
                placeholder="Search by name, host, or access code..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Col>

            <Col md={3}>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="active">Active</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
              </Form.Select>
            </Col>
          </Row>

          <Card className="shadow-sm">
            <Table hover responsive className="mb-0">
              <thead>
                <tr>
                  <th>Visitor</th>
                  <th>Host</th>
                  <th>Purpose</th>
                  <th>Access Code</th>
                  <th>Check-In</th>
                  <th>Check-Out</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredVisits.map((v) => (
                  <tr key={v.id}>
                    <td>
                      <div className="fw-semibold">{v.visitor_name}</div>
                      <div className="text-muted small">
                        {v.visitor_email}
                      </div>
                    </td>

                    <td>{v.host_name}</td>
                    <td>{v.purpose}</td>
                    <td className="access-code">{v.access_code}</td>

                    <td>
                      {v.check_in_time
                        ? new Date(v.check_in_time).toLocaleString()
                        : "—"}
                    </td>

                    <td>
                      {v.check_out_time
                        ? new Date(v.check_out_time).toLocaleString()
                        : "—"}
                    </td>

                    <td>
                      <Badge bg={getStatusVariant(v.status)}>
                        {v.status}
                      </Badge>
                    </td>
                  </tr>
                ))}

                {filteredVisits.length === 0 && (
                  <tr>
                    <td
                      colSpan="7"
                      className="text-center text-muted py-4"
                    >
                      No visits found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card>
        </main>
      </Card>
    </div>
  );
}

export default VisitorTrack;
