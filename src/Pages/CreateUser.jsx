import Sidebar from "../Components/Sidebar";

import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {useState} from "react";
import api from "../API/api.js";
import "../Styles/AdminDashboard.css";//can i use the same style or copy and paste it for thi page
function CreateUser(){
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        username:"",
        password:"",
        role:"Staff",
    });
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await api.post("/admin/users",{
                name:formData.name,
                email:formData.email,
                username:formData.username,
                password:formData.password,
                role:formData.role,
            });
            alert("User created successfully");
            window.location.href="/admin";
        }catch(error){
            console.error("Error creating user:",error);
            alert("Failed to create user. Please try again later.");
        }
    };
    return(
    <>
    <div className="admin-dashboard">
        <Sidebar/>
        <Card className="admin-card">
        <main className="admin-content">
            <div className="shadow-sm">
                <Card.Body>
                    <h5>Create New User</h5>
                    <Form>
                        <Row className="mb-3">
                            <Col mb={6}>
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control placeholder="Enter Full Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            />
                            </Col>
                            <Col mb={6}>
                            <Form.Label>Email *</Form.Label>
                            <Form.Control placeholder="Enter Valid Email"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            />
                            </Col>    
                        </Row>
                        <Row className="mb-3">
                             <Col mb={6}>
                            <Form.Label>Username *</Form.Label>
                            <Form.Control placeholder="Enter A Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            />
                            </Col>
                             <Col mb={6}>
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" placeholder="Enter A Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            />
                            </Col>
                        </Row>
                        <Row className="mb-4">
                             <Col mb={6}>
                            <Form.Label>Role *</Form.Label>
                            <Form.Select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                                >
                                <option value="admin">Admin</option>
                                <option value="staff">Staff</option>
                                <option value="security">Security</option>
                            </Form.Select>
                            </Col>
                            <Col></Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-2">
                            <Button as={Link} to="/admin" variant="outline-secondary">
                            Cancel
                            </Button>
                            <Button type="submit" variant="danger" onClick={handleSubmit}>
                                Create User
                            </Button>
                        </div>
                    </Form> 
                    
                </Card.Body>
            </div>
        </main>
        </Card>
    </div>
    </>
    );
}
export default CreateUser;
