import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// -------------------- PATIENTS --------------------
export const getPatients = () => API.get("/patients");

// -------------------- DOCTORS --------------------
export const getDoctors = () => API.get("/doctors");

// -------------------- APPOINTMENTS --------------------
export const getAppointments = () => API.get("/appointments");
export const addAppointment = (data) => API.post("/appointments", data);
export const deleteAppointment = (id) => API.delete(`/appointments/${id}`);
export const getCounts = () => API.get("/counts");

// -------------------- MEDICAL RECORDS --------------------
export const getMedicalRecords = (patientId) =>
  API.get(`/medical-records/${patientId}`);

export const addMedicalRecord = (data) =>
  API.post(`/medical-records`, data);

export default API;
