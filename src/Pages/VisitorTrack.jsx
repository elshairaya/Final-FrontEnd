import { Table, Card, Form, Button, Badge, Row, Col } from "react-bootstrap";
import "../styles/VisitorTrack.css";
import"../Styles/AdminDashboard.css"
import StaffSidebar from "../Components/StaffSidebar";
import SecuritySidebar from "../Components/SecuritySidebar";

function VisitorTrack({role}){
    const visits = [
  {
    visitor: "Aya Elshair",
    email: "elshairaya@gmail.com",
    host: "Dr. Razan",
    purpose: "test",
    code: "HTU-2024-HOY5",
    checkIn: "08/12/2025 05:31 PM",
    checkOut: "-",
    status: "Overdue",
  },
  {
    visitor: "John Smith",
    email: "john.smith@example.com",
    host: "Dr. Ahmed Hassan",
    purpose: "Research Collaboration",
    code: "HTU-2024-A1B2",
    checkIn: "08/12/2025 09:00 AM",
    checkOut: "-",
    status: "Active",   // ✅ NEW
  },
  {
    visitor: "Sarah Johnson",
    email: "sarah@company.com",
    host: "Prof. Laila Mansour",
    purpose: "Guest Lecture",
    code: "HTU-2024-C3D4",
    checkIn: "08/12/2025 10:30 AM",
    checkOut: "08/12/2025 02:00 PM",
    status: "Completed",
  },
];
const getStatusVariant = (status) => {
  switch (status) {
    case "Active":
      return "primary";
    case "Overdue":
      return "danger";
    case "Completed":
      return "success";
    default:
      return "secondary";
  }
};
  return(
    <div className="admin-dashboard">
    {role === "Security" && <SecuritySidebar />}
    {role === "Staff" && <StaffSidebar />}
        <Card className="admin-card">
            <main className="admin-content">
                <h4 className="fw-bold">Visit Tracking</h4>
                <p className="text-muted mb-4">
                    View and manage all visitor records
                </p>
                <Row className="mb-3 align-items-center">
                    <Col md={6}>
                    <Form.Control
                    placeholder="Search by name, host, or access code..."/>
                    </Col>
                    <Col md={3}>
                    <Form.Select>
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Overdue</option>
                    <option>Completed</option>
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
                                <th>Check-out</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visits.map((v,i)=>(
                                <tr key={i}>
                                    <td>
                                        <div className="fw-semibold">{v.visitor}</div>
                                        <div className="text-muted small">{v.email}</div>
                                    </td>
                                    <td>{v.host}</td>
                                    <td>{v.purpose}</td>
                                    <td className="access-code">{v.code}</td>
                                    <td>{v.checkIn}</td>
                                    <td>{v.checkOut}</td>
                                   <td>
                                    <Badge bg={getStatusVariant(v.status)}>
                                        {v.status}
                                    </Badge>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card>
            </main>
        </Card>
    </div>
  );

}export default VisitorTrack;