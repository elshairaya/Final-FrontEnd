import StaffSidebar from "../Components/StaffSidebar";

import { Card, Row, Col, Badge } from "react-bootstrap";
import "../Styles/AdminDashboard.css";
import "../Styles/StaffDashboard.css";
import { useState, useEffect} from "react";
import api from "../API/api.js";

function StaffDashboard(){
   const [visits, setVisits] = useState([]);
   const [incidents, setIncidents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitsResponse = await api.get("/staff/visits");
                const incidentsResponse = await api.get("/staff/incidents");
                setVisits(visitsResponse.data);
                setIncidents(incidentsResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                alert("Failed to fetch data. Please try again later.");
            }
        };
        fetchData();
    }, []);
    const activeCount = visits.filter(visit => visit.status === "active").length;
    const OverdueCount = visits.filter(visit => visit.status === "overdue").length;
    const totalIncidentsCount = incidents.length;
    return(
        <>
        <div className="admin-dashboard">
            <StaffSidebar/>
            <Card className="admin-card">
            <main className="admin-content">
                <div>
                    <h4 className="fw-boald mb-1">Dashboard</h4>
                    <p className="text-muted mb-3">
                        Overview of visitors activity
                    </p>
                </div>
                <Row className="g-3 mb-3">
                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Active Visitors</div>
                                    <div className="stat-value">{activeCount}</div>
                                </div>
                            </Card>
                            </Col>
                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Overdue</div>
                                    <div className="stat-value">{OverdueCount}</div>
                                </div>
                            </Card>
                            </Col>

                            <Col mb={3}>
                            <Card className="stat-card">
                                <div>
                                    <div className="stat-title">Total Incidents</div>
                                    <div className="stat-value">{totalIncidentsCount}</div>
                                </div>
                            </Card>
                            </Col>
                        </Row>
                        <Card className="shadow-sm mb-4">
                            <Card.Body>
                                <h6 className="fw-semibold mb-3">Current Active Visitors</h6>
                                {activeCount === 0 ? (
                                <div className="text-muted text-center py-4">
                                    No active visitors at the moment
                                </div>
                                ) : (
                                visits.filter(visit => visit.status === "active").map((visit, incident) => (
                                    <div key={incident} className="mb-3 pb-3 border-bottom">
                                    <strong>{visit.visitor_name}</strong> - {visit.host_name}
                                    </div>
                                ))
                                )}
                            </Card.Body>
                        </Card>
                        
                <h6 className="fw-semibold mb-3">Recent Incidents</h6>
                {incidents.slice(0,3).map((incident, index) => (

                <div key={index} className="incident">
                  <Badge bg="danger" className="me-2">!</Badge>
                  <div>
                    <div className="fw-semibold">
                      {incident.visitorName} - {incident.description}
                    </div>
                    <div className="text-muted small">
                      Reported: {new Date(incident.created_at).toLocaleString()}
                    </div>
                  </div>
                </div>
                ))}

               {incidents.length === 0 && (
                <div className="text-muted text-center py-4">
                    No incidents reported yet
                </div>
               )}
        </main>
        </Card>
      </div>
    </>
  );
};
export default StaffDashboard;