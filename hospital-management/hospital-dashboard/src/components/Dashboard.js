import React ,{ useEffect, useState } from "react";
import { getCounts } from "../api";
import "./Dashboard.css";
import BedOccupancy from "./BedOccupancy";

const Dashboard = ({ totalPatients, totalAppointments, totalDoctors, totalRooms }) => {
  return (
    <div>
      <h2>Dashboard</h2>
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon patients"><i className="fas fa-user-injured"></i></div>
          <div className="stat-info">
            <h3>{totalPatients}</h3>
            <p>Total Patients</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon appointments"><i className="fas fa-calendar-check"></i></div>
          <div className="stat-info">
            <h3>{totalAppointments}</h3>
            <p>Today's Appointments</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon doctors"><i className="fas fa-user-md"></i></div>
          <div className="stat-info">
            <h3>{totalDoctors}</h3>
            <p>Available Doctors</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon rooms"><i className="fas fa-procedures"></i></div>
          <div className="stat-info">
            <h3>{totalRooms}</h3>
            <p>Available Rooms</p>
          </div>
        </div>
        <div className="dashboard-section">
          <h3>Bed Occupancy</h3>
          <BedOccupancy />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
