import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";
function SecuritySidebar(){
return(
    <div className="sidebar">
        <div className="sidebar-title">Security Menu</div>
       <NavLink
        to="/gate" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }>
            Security Gate
        </NavLink>
        <NavLink 
        to="/tracking" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }>
            Visits Tracking
        </NavLink>
    </div>
);
}
export default SecuritySidebar;