import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

function StaffSidebar(){
    return(
      <div className="sidebar">
        <div className="sidebar-title">Staff Menu</div>
            <NavLink 
            to="/staff" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
                Dashboard
            </NavLink>
            <NavLink 
            to="/staff/register" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
                Register Visitor
            </NavLink>
            <NavLink 
            to="/tracking" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
                Visit Tracking
            </NavLink>
            <NavLink 
            to="/staff/incidents" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
                Incident Log
            </NavLink>
      </div>

    );
}
export default StaffSidebar;