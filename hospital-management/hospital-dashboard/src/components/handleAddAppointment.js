const handleAddAppointment = async () => {
  if (
    patientId === "" ||
    doctorId === "" ||
    date === "" ||
    time === ""
  ) {
    alert("Please fill all fields");
    return;
  }

  const selectedPatient = patients.find(
    p => p.id === parseInt(patientId)
  );
  const selectedDoctor = doctors.find(
    d => d.id === parseInt(doctorId)
  );

  if (!selectedPatient || !selectedDoctor) {
    alert("Invalid patient or doctor");
    return;
  }

  try {
    await addAppointment({
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
      appointmentDate: date,
      appointmentTime: time
    });

    fetchData();
    setPatientId("");
    setDoctorId("");
    setDate("");
    setTime("");
  } catch (error) {
    console.error(error);
    alert("Failed to add appointment");
  }
};
