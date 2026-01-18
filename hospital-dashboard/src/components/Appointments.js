import React, { useEffect, useState } from "react";
import {
  getAppointments,
  getPatients,
  getDoctors,
  addAppointment
} from "../api";
import MedicalRecords from "./MedicalRecords";
import EMRForm from "./EMRForm";
import "./Appointments.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState(""); // for EMR form

  // Fetch appointments, patients, doctors
  const fetchData = async () => {
    try {
      setAppointments((await getAppointments()).data || []);
      setPatients((await getPatients()).data || []);
      setDoctors((await getDoctors()).data || []);
    } catch (err) {
      alert("Backend API error. Check console.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Add appointment with conflict detection
  const handleAddAppointment = async () => {
    if (!patientId || !doctorId || !date || !time) {
      return alert("Please fill all fields");
    }

    try {
      await addAppointment({
        patientId: Number(patientId),
        doctorId: Number(doctorId),
        date,
        time
      });

      alert("Appointment added successfully!");
      fetchData();

      // Reset form fields
      setPatientId("");
      setDoctorId("");
      setDate("");
      setTime("");
      setSelectedPatientId("");
    } catch (err) {
      // If backend returns 409 Conflict
      if (err.response?.status === 409) {
        alert("Conflict: Doctor is already booked at this time!");
      } else {
        alert("Error adding appointment. Check console.");
        console.error(err);
      }
    }
  };

  return (
    <div className="appointment-container">

      {/* ADD APPOINTMENT CARD */}
      <div className="card">
        <h2>Add Appointment</h2>
        <div className="form-row">

          {/* Patient select */}
          <select
            value={selectedPatientId}
            onChange={e => {
              setSelectedPatientId(e.target.value);
              setPatientId(e.target.value);
            }}
          >
            <option value="">Select Patient</option>
            {patients.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>

          {/* Doctor select */}
          <select value={doctorId} onChange={e => setDoctorId(e.target.value)}>
            <option value="">Select Doctor</option>
            {doctors.map(d => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>

          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
          <button onClick={handleAddAppointment}>Add</button>
        </div>
      </div>

      {/* APPOINTMENTS TABLE */}
      <div className="card table-container">
        <h2>Appointments List</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(a => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{patients.find(p => p.id === a.patientId)?.name || "Unknown"}</td>
                <td>{doctors.find(d => d.id === a.doctorId)?.name || "Unknown"}</td>
                <td>{a.date}</td>
                <td>{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MEDICAL RECORDS */}
      {patientId && (
        <div className="card">
          <MedicalRecords patientId={patientId} />
        </div>
      )}

      {/* EMR FORM */}
      {selectedPatientId && (
        <div className="card">
          <h2>EMR Form for Patient {selectedPatientId}</h2>
          <EMRForm
            patientId={selectedPatientId}
            onSubmit={data => {
              console.log("EMR submitted:", data);
            }}
          />
        </div>
      )}

    </div>
  );
};

export default Appointments;
