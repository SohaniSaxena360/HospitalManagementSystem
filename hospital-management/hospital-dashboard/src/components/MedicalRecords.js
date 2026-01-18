import React, { useState, useEffect } from "react";
import { getMedicalRecords, addMedicalRecord } from "../api";

const MedicalRecords = ({ patientId }) => {
  const [records, setRecords] = useState([]);

  const [vitals, setVitals] = useState({
    bp: "",
    pulse: ""
  });

  const [diagnosis, setDiagnosis] = useState("");
  const [allergies, setAllergies] = useState("");
  const [labHb, setLabHb] = useState("");

  // ================= FETCH RECORDS =================
  const fetchRecords = async () => {
    if (!patientId) return;
    try {
      const res = await getMedicalRecords(patientId);
      setRecords(res.data || []);
    } catch (err) {
      console.error("Error fetching medical records", err);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [patientId]);

  // ================= ADD RECORD =================
  const handleAdd = async () => {
    if (!patientId) {
      alert("Please select a patient first");
      return;
    }

    try {
      await addMedicalRecord({
        patientId: Number(patientId),
        record: {
          vitals: {
            bp: vitals.bp,
            pulse: vitals.pulse
          },
          diagnosis: diagnosis ? diagnosis.split(",") : [],
          allergies: allergies ? allergies.split(",") : [],
          labResults: {
            hb: Number(labHb) || 0
          }
        }
      });

      alert("Medical record added successfully");

      setVitals({ bp: "", pulse: "" });
      setDiagnosis("");
      setAllergies("");
      setLabHb("");

      fetchRecords();
    } catch (err) {
      console.error("Error adding medical record", err);
    }
  };

  // ================= PDF DOWNLOAD =================
  const downloadPDF = () => {
    if (!patientId) return;

    window.open(
      `/api/medical-records/export-pdf/${patientId}?password=1234`,
      "_blank"
    );
  };

  return (
    <div className="medical-records" style={{ padding: "20px" }}>
      <h3>Medical Records for Patient {patientId || "-"}</h3>

      {/* PDF BUTTON */}
      {patientId && (
        <button
          onClick={downloadPDF}
          style={{
            marginBottom: "20px",
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Download PDF
        </button>
      )}

      {/* ADD RECORD FORM */}
      <div
        className="record-form"
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px"
        }}
      >
        <input
          placeholder="BP"
          value={vitals.bp}
          onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
        />

        <input
          placeholder="Pulse"
          value={vitals.pulse}
          onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
        />

        <input
          placeholder="Diagnosis (comma separated)"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
        />

        <input
          placeholder="Allergies (comma separated)"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />

        <input
          placeholder="HB"
          value={labHb}
          onChange={(e) => setLabHb(e.target.value)}
        />

        <button onClick={handleAdd}>Add Record</button>
      </div>

      {/* RECORD LIST */}
      <ul>
        {records.length === 0 && <li>No records found</li>}

        {records.map((r) => (
          <li key={r.id} style={{ marginBottom: "10px" }}>
            <pre>{JSON.stringify(r.record, null, 2)}</pre>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MedicalRecords;
