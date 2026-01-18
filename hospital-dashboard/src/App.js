import { Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {useState, useEffect} from 'react';

import Dashboard from "./components/Dashboard";
import Patients from "./components/Patients";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import EMRPage from "./pages/EMRPage";
import LoginPage from "./pages/LoginPage";
import Sidebar from "./components/Sidebar/Sidebar";

import { getPatients, getDoctors, getAppointments } from "./api";

function ProtectedLayout({ role }) {
  const [active, setActive] = useState("dashboard");
  const [totalPatients, setTotalPatients] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const patients = await getPatients();
        const doctors = await getDoctors();
        const appointments = await getAppointments();

        setTotalPatients(patients.data.length);
        setTotalDoctors(doctors.data.length);
        setTotalAppointments(appointments.data.length);
      } catch (err) {
        console.error("Cannot fetch counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar active={active} setActive={setActive} />

      <div style={{ flex: 1, padding: "20px" }}>
        {active === "dashboard" && (
          <Dashboard
            totalPatients={totalPatients}
            totalDoctors={totalDoctors}
            totalAppointments={totalAppointments}
            totalRooms={42}
          />
        )}

        {active === "patients" && (role === "ADMIN" || role === "DOCTOR") && (
          <Patients />
        )}

        {active === "doctors" && role === "ADMIN" && <Doctors />}

        {active === "appointments" && (
          role === "ADMIN" || role === "DOCTOR"
        ) && <Appointments />}

        {active === "emr" && (
          role === "ADMIN" || role === "DOCTOR"
        ) && <EMRPage />}
      </div>
    </div>
  );
}

function App() {
  const token = localStorage.getItem("token");

  let role = null;
  if (token) {
    try {
      role = jwtDecode(token).role;
    } catch {
      localStorage.removeItem("token");
    }
  }

  return (
    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={<LoginPage />}
      />

      {/* Protected dashboard */}
      <Route
        path="/*"
        element={
          token && role ? (
            <ProtectedLayout role={role} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;