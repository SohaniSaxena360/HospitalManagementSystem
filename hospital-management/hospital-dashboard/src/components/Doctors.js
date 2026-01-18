import { useEffect, useState } from "react";
import { getDoctors } from "../api"; // make sure path is correct

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await getDoctors();
        setDoctors(res.data);
      } catch (err) {
        console.error("Network Error:", err);
      }
    };
    fetchDoctors();
  }, []);

  return (
    <div>
      <h2>Doctors</h2>
      <ul>
        {doctors.map(d => (
          <li key={d.id}>
            {d.name} ({d.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Doctors;
