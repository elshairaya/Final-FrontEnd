import { NavLink } from "react-router-dom";
import "../Styles/Sidebar.css";

const Sidebar=()=>{
    return(
      <div className="sidebar">
        <div className="sidebar-title">Admin Menu</div>
            <NavLink 
            to="/admin" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
              User Management
            </NavLink>
            <NavLink 
            to="/admin/create" end className={({isActive}) =>
            isActive ? "sidebar-link active": "sidebar-link"
            }
            >
              Add Users
            </NavLink>
      </div>

    );
}
export default Sidebar;