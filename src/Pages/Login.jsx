import { useState ,useEffect} from "react";
import "../Styles/Login.css";
import api from "../API/api.js";
import { Card, Form, Button } from "react-bootstrap";

function Login(){

    const[username,setUsername]=useState("");
    const[password,setPassword]=useState("");
    
useEffect(() => {
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const user = JSON.parse(savedUser);
    if(user.role === "Admin") {
      window.location.href = "/admin";
    } 
    if(user.role === "Staff") {
      window.location.href = "/staff";
    }
    if(user.role === "Security") {
      window.location.href = "/gate";
    }
  }
}, []);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await api.post("/auth/login",{username,password});
            console.log(response.data);
            localStorage.setItem("user",JSON.stringify(response.data.user));
            const role=response.data.user.role;
            if(role === "admin"){
                window.location.href="/admin";
            }
            else if(role === "staff"){
                window.location.href="/staff";
            }
            else if(role === "security"){
                window.location.href="/gate";
            }
            else {
                alert("Unknown role. Access denied.");
            }
        }catch(error){
            console.error("Login failed:",error);
            alert("Login failed. Please check your credentials and try again.");
        }
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
                            <Button onClick={handleSubmit}
                            type="submit"
                            variant="primary"
                            className="w-100 py-2"   
                            >
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
