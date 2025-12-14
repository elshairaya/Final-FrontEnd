import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useState } from "react";

import "../Styles/AdminDashboard.css";

import { Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";
const AdminDashboard=()=>{
      // Dummy users data (frontend only)
const [users, setUsers] = useState([
    {
      name: "System Administrator",
      email: "admin@htu.edu",
      username: "admin",
      role: "Admin",
      created: "08/12/2025",
    },
    {
      name: "Sarah Johnson",
      email: "sarah.johnson@htu.edu",
      username: "staff1",
      role: "Staff",
      created: "08/12/2025",
    },
    {
      name: "Ahmed Hassan",
      email: "ahmed.hassan@htu.edu",
      username: "security1",
      role: "Security",
      created: "08/12/2025",
    },
  ]);
  const handleDelete = (username) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this user?"
  );

  if (!confirmDelete) return;

  setUsers((prevUsers) =>
    prevUsers.filter((user) => user.username !== username)
  );
};

    return(
        <>
        <TopNavbar/>
        <div className="admin-dashboard">
            <Sidebar/>
            <main className="admin-content">
              <div className="px-3 px-md-4 px-lg-5 py-3 py-md-4">
            <div className="admin-header">
                <div>
            <h4 className="fw-bold">User Management</h4>
            <p className="text-muted mb-0">
                Add and manage staff and security personnel
            </p>
            </div>
            <Button as={Link} to="/admin/create" variant="danger">
                +Add New User
            </Button>
            </div>
            <Form.Control
            type="text"
            placeholder="Search users by name,username,email,or role..."
            className="mb-4"
            />
            <Row className="stats-row">
                <Col md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="fw-semibold">Admins</div>
                        <div className="fs-4 mt-2">1</div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="fw-semibold">Staff</div>
                        <div className="fs-4 mt-2">1</div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="fw-semibold">Security</div>
                        <div className="fs-4 mt-2">1</div>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            <Card className="shadow-sm">
                <Table hover responsive className="admin-table mb-0">
                    <thead>
                        <tr>
                            <th>Users</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index)=>(
                            <tr key={index}>
                                <td>
                                    <div className="fw-semibold">{user.name}</div>
                                    <div className="text-muted small">{user.email}</div>
                                </td>
                                <td>{user.username}</td>
                                <td>
                                    <Badge bg="secondary">{user.role}</Badge>
                                </td>
                                <td>{user.created}</td>
                                <td>
                                    <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.username)}
                                    >
                                    Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card>
            </div>
            </main>

        </div>

        </>
    );
}
export default AdminDashboard;