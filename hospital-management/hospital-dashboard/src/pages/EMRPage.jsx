
import React, { useState } from "react";
import { useParams } from "react-router-dom"; // Get patientId from route
import EMRForm from "../components/EMRForm";
import { addMedicalRecord } from "../api";

const EMRPage = () => {
  const { patientId } = useParams(); // e.g., /emr/:patientId
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Function to handle EMR form submission
  const handleEMRSubmit = async (data) => {
    setLoading(true);
    setMessage("");
    try {
      // Send EMR data to backend
      await addMedicalRecord({
        patientId: Number(patientId),
        record: data.record
      });
      setMessage("EMR saved successfully!");
    } catch (err) {
      console.error("Failed to save EMR:", err);
      setMessage("Error saving EMR. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // If patientId is not available
  if (!patientId) {
    return <p>Please select a patient to view their EMR.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Electronic Medical Record (EMR) for Patient {patientId}</h2>

      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            backgroundColor: message.includes("Error") ? "#f8d7da" : "#d4edda",
            color: message.includes("Error") ? "#721c24" : "#155724",
            borderRadius: "5px"
          }}
        >
          {message}
        </div>
      )}

      <EMRForm
        patientId={patientId}
        onSubmit={handleEMRSubmit}
      />

      {loading && <p>Saving EMR, please wait...</p>}
    </div>
  );
};

export default EMRPage;
