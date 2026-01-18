package com.hospital.hospital_management.service;

import com.hospital.hospital_management.entity.Patient;
import com.hospital.hospital_management.repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {

    @Autowired
    private PatientRepository repo;

    public List<Patient> getAllPatients() {
        return repo.findAll();
    }

    public Patient savePatient(Patient patient) {
        return repo.save(patient);
    }
}

