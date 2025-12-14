import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar=()=>{
    return(
      <div className="sidebar">
        <div className="sidebar-title">Admin Menu</div>
            <NavLink 
            to="/admin" className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
              User Management
            </NavLink>
      </div>

    );
}
export default Sidebar;