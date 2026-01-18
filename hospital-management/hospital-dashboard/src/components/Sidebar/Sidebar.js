import React from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./sidebar.css";

const Sidebar = ({ active, setActive }) => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;

  const sections = [
    { key: "dashboard", label: "Dashboard", icon: "fas fa-home" },
    { key: "patients", label: "Patients", icon: "fas fa-user-injured" },
          { key: "appointments", label: "Appointments", icon: "fas fa-calendar-check" },
          { key: "doctors", label: "Doctors", icon: "fas fa-user-md" },
          { key: "staff", label: "Staff", icon: "fas fa-users" },
          { key: "reports", label: "Reports", icon: "fas fa-file-alt" },
          { key: "settings", label: "Settings", icon: "fas fa-cog" }
  ];

  if (role === "ADMIN") {
    sections.push(
      { key: "patients", label: "Patients", icon: "fas fa-user-injured" },
      { key: "appointments", label: "Appointments", icon: "fas fa-calendar-check" },
      { key: "doctors", label: "Doctors", icon: "fas fa-user-md" },
      { key: "staff", label: "Staff", icon: "fas fa-users" },
      { key: "reports", label: "Reports", icon: "fas fa-file-alt" },
      { key: "settings", label: "Settings", icon: "fas fa-cog" }
    );
  } else if (role === "DOCTOR") {
    sections.push(
      { key: "patients", label: "Patients", icon: "fas fa-user-injured" },
      { key: "appointments", label: "Appointments", icon: "fas fa-calendar-check" }
    );
  } else if (role === "NURSE") {
    sections.push(
      { key: "patients", label: "Patients", icon: "fas fa-user-injured" }
    );
  }

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    navigate("/login");               // redirect to login
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <i className="fas fa-hospital"></i>
        <span>MediCare</span>
      </div>

      <ul className="sidebar-menu">
        {sections.map((item) => (
          <li
            key={item.key}
            className={active === item.key ? "active" : ""}
            onClick={() => setActive(item.key)}
          >
            <i className={item.icon}></i>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>

      {/* ✅ Logout button */}
      <div className="sidebar-logout" onClick={handleLogout}>
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </div>
    </aside>
  );
};

export default Sidebar;