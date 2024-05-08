import React from "react";
import { NavLink } from "react-router-dom";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import "./Sidebar.scss";

const sidebarItems = [
  { to: "/dashboard", Icon: MdOutlineSpaceDashboard, text: "Dashboard" },
  { to: "/cars", Icon: FaUsers, text: "Car Brand" },
  // { to: "/create_contest", iconClass: "fa-solid fa-table-list", text: "Contest Listing" },
  // { to: "/users", iconClass: "fa-solid fa-users", text: "User Listing" },
];

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="scroll-sidebar">
        <ul className="list-unstyled sidebarnav">
          {sidebarItems.map((item, index) => (
            <li className="sidebar-item" key={index}>
              <NavLink className="sidebar-link" to={item.to}>
                <item.Icon /> {item.text}
              </NavLink>
            </li>
          ))}
          <li className="list-divider"></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
