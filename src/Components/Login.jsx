import { useState } from "react";
import "../Styles/Login.css";
const Login=()=>{
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
            <div className="text-center">
                <div className="login-icon mx-auto mb-3">
                    <i className="bi bi-shield"></i>
                </div>
                <h4 className="fw-bold">HTU Visitor Management</h4>
                <p className="text-muted mb-4">Sign in to your account</p>
                <div className="card login-card p-4 shadow">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label className="form-lable">Username</label>
                            <input
                            type="text"
                            className="form-control"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            required
                            />
                        </div>
                        <div className="mb-4 text-start">
                            <label className="form-lable">Password</label>
                            <input
                            type="password"
                            className="form-control"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                            required
                            />
                        </div>
                        <button className="btn-primary w-100 py-2">
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default Login;
