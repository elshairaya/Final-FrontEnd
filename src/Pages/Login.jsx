import { useState } from "react";
import "../Styles/Login.css";
import { Card, Form, Button } from "react-bootstrap";

function Login(){
    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log({
            username,
            password
        });
    };
    return(
        <div className="login-page">
            <div className="login-wrapper">
                <div className="login-icon">
                    <i className="bi bi-shield"></i>
                </div>
                <h4 className="fw-bold">HTU Visitor Management</h4>
                <p className="text-muted mb-4">Sign in to your account</p>
                <Card className="login-card shadow">
                    <Card.Body className="p-4">
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3 text-start">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                 type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            required
                            />
                            </Form.Group>
                            <Form.Group className="mb-4 text-start">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                 type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            />
                            </Form.Group>
                            <Button
                            type="submit"
                            variant="primary"
                            className="w-100 py-2"                            >
                             Sign In
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};
export default Login;
