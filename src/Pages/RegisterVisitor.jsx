import { useState } from "react";
import StaffSidebar from "../Components/StaffSidebar";
import { Card,Form,Button,Alert,Row,Col } from "react-bootstrap";
import"../Styles/RegisterVisitor.css";

function RegisterVisitor(){
     const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    host: "",
    purpose: "",
    expectedCheckout: "",
  });

  const [accessCode, setAccessCode] = useState("");
  const [success, setSuccess] = useState(false); 
  const handleChange=(e)=>{
    setForm({...form,[e.target.name]: e.target.value});
  };
  const clearForm=()=>{
    setForm({
         fullName: "",
    email: "",
    phone: "",
    host: "",
    purpose: "",
    expectedCheckout: "",
    });
    setSuccess(false);
    setAccessCode("");

  }
  const generateCode=()=>{
    const random=Math.random().toString(36).substring(2.6).toUpperCase();
    return `HTU-2026-${random}`;
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const code=generateCode();
    setAccessCode(code);
    setSuccess(true);
    const payload={
        fullName:form.fullName,
        email:form.email,
        accessCode:code,
        host:form.host,
        purpose:form.purpose,
        expectedCheckout:form.expectedCheckout,
    };
    console.log("Email payload:",payload);
     // 🔴 FUTURE BACKEND CALL
  // await fetch("http://localhost:5000/api/send-access-code", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  }
return(
<div className="admin-dashboard">
    <StaffSidebar/>
    <Card className="admin-card">
        <main className="admin-content">
            <h4 className="fw-bold">Register Visitor</h4>
            <p className="text-muted mb-">
                Create a new visitor registration and generate access code sent the visitor by email
            </p>
            {success&&(
                <Alert variant="success" className="d-flex justify-content-between align-items-center">
                    <div>
                        <strong>Visitor registered successfully!</strong>
                        <div className="mt-1">
                            Access Code Generated:
                            <span className="access-code ms-2">{accessCode}</span>
                        </div>
                        <div>
                            An email contains the access code sent to {form.fullName} successfully!
                        </div>
                    </div>
                </Alert>
            )}

            <Card className="shadow-sm">
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <h6 className="section-title">Visitor Information</h6>
                        <Row className="mb-3">
                            <Col md={6}>
                            <Form.Label>Full Name *</Form.Label>
                            <Form.Control 
                            name="fullName"
                            value={form.fullName}
                            onChange={handleChange}
                            required/>
                            </Col>

                            <Col md={6}>
                            <Form.Label>Email Address *</Form.Label>
                            <Form.Control 
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required/>
                            </Col>
                        </Row>

                        <Row className="mb-3">
                            <Col md={6}>
                            <Form.Label>Phone Number *</Form.Label>
                            <Form.Control 
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required/>
                            </Col>

                            <Col md={6}>
                            <Form.Label>Host Name *</Form.Label>
                            <Form.Control 
                            name="host"
                            value={form.host}
                            onChange={handleChange}
                            required/>
                            </Col>
                        </Row>
                        <h6 className="section-title mt-4">Visit Details</h6>

                        <Row className="mb-3">
                            <Col md={12}>
                            <Form.Label>Purpose of Visit *</Form.Label>
                            <Form.Control
                            as={"textarea"}
                            rows={2}
                            name="purpose"
                            value={form.purpose}
                            onChange={handleChange}
                            required/>
                            </Col>
                        </Row>

                               <Row className="mb-4">
                            <Col md={6}>
                            <Form.Label>Expected Check-Out Time *</Form.Label>
                            <Form.Control
                            type="datetime-local"
                            name="expectedCheckout"
                            value={form.expectedCheckout}
                            onChange={handleChange}
                            required/>
                            </Col>
                        </Row>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={clearForm}
                            disabled={!success && Object.values(form).every(v=>v==="")}>
                                Clear Form
                            </Button>
                            <Button type="submit" variant="primary">
                                Register & Generate Code
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </main>
    </Card>
</div>
);
}
export default RegisterVisitor;