import React from "react";
import EMRForm from "./EMRForm";
import { addMedicalRecord } from "../api";

const PatientPage = ({ selectedPatientId }) => {
  const handleSubmit = async (data) => {
    await addMedicalRecord({ patientId: data.patientId, record: data.record });
    alert("EMR saved successfully!");
  };

  return (
    <div>
      <h2>Patient EMR</h2>
      {selectedPatientId ? (
        <EMRForm patientId={selectedPatientId} onSubmit={handleSubmit} />
      ) : (
        <p>Please select a patient first</p>
      )}
    </div>
  );
};

export default PatientPage;
