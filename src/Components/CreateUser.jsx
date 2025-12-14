import TopNavbar from "../Components/TopNavbar";
import Sidebar from "../Components/Sidebar";

import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import "../Styles/AdminDashboard.css";//can i use the same style or copy and paste it for thi page
const CreateUser=()=>{
    return(
    <>
    <TopNavbar/>
    <div className="admin-dashboard">
        <Sidebar/>
        <main className="admin-content">
            <div className="shadow-sm create-user-card">
                <Card.Body>
                    <h5>Create New User</h5>
                    <Form>
                        <Row className="mb-3">
                            <Col mb={6}>
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control placeholder="Enter Full Name"/>
                            </Col>
                            <Col mb={6}>
                            <Form.Label>Email *</Form.Label>
                            <Form.Control placeholder="Enter Valid Email"/>
                            </Col>
                            
                            
                        </Row>


                        <Row className="mb-3">
                             <Col mb={6}>
                            <Form.Label>Username *</Form.Label>
                            <Form.Control placeholder="Enter A Username"/>
                            </Col>
                             <Col mb={6}>
                            <Form.Label>Password *</Form.Label>
                            <Form.Control type="password" placeholder="Enter A Password"/>
                            </Col>
                        </Row>
                        <Row className="mb-4">
                             <Col mb={6}>
                            <Form.Label>Role *</Form.Label>
                            <Form.Select defaultValue="Staff">
                                <option>Admin</option>
                                <option>Staff</option>
                                <option>Security</option>
                            </Form.Select>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-2">
                            <Button as={Link} to="/admin" variant="outline-secondary">
                            Cancel
                            </Button>
                            <Button variant="danger">
                                Create User
                            </Button>
                        </div>
                    </Form> 
                    
                </Card.Body>
            </div>
        </main>
    </div>
    </>
    );
}
export default CreateUser;
