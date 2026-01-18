import { useEffect, useState } from "react";
import { getPatients } from "../api"; // <-- correct path

const Patients = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await getPatients();
        setPatients(res.data);
      } catch (err) {
        console.error("Network Error:", err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            {p.name} ({p.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patients;
