import Sidebar from "../Components/Sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../API/api.js";

import "../Styles/AdminDashboard.css";

import { Card, Table, Button, Form, Row, Col, Badge } from "react-bootstrap";
function AdminDashboard(){
const [users, setUsers] = useState([]);
useEffect(() => {
  const fetchUsers = async () => {
  try {
    const response = await api.get("/admin/users");
    setUsers(response.data);
    } catch (error) {
    console.error("Error fetching users:", error);
    alert("Failed to fetch users. Please try again later.");
    }
};
fetchUsers();
}, []);
const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
        await api.delete(`/admin/users/${id}`);
        setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again later.");
    }
};
const adminCount = users.filter(user => user.role === 'admin').length;
const staffCount = users.filter(user => user.role === 'staff').length;
const securityCount = users.filter(user => user.role === 'security').length;
    return(
        <>
        <div className="admin-dashboard">
            <Sidebar/>
            <Card className="admin-card">
            <main className="admin-content">
              <div >
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
                        <div className="fs-4 mt-2">{adminCount}</div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="fw-semibold">Staff</div>
                        <div className="fs-4 mt-2">{staffCount}</div>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={4}>
                <Card className="shadow-sm">
                    <Card.Body>
                        <div className="fw-semibold">Security</div>
                        <div className="fs-4 mt-2">{securityCount}</div>
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
                                <td>
                                    <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
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
     </Card>
 </div>

</>
);
}
export default AdminDashboard;