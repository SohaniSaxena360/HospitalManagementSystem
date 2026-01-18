package com.hospital.hospital_management.service;

import com.hospital.hospital_management.entity.Doctor;
import com.hospital.hospital_management.repository.DoctorRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class DoctorService {

    @Autowired
    private DoctorRepository repo;

    public List<Doctor> getAllDoctors() {
        return repo.findAll();
    }

    public Doctor saveDoctor(Doctor doctor) {
        return repo.save(doctor);
    }

    public Doctor getDoctorById(Long id) {
        return repo.findById(id).orElse(null);
    }

    public void deleteDoctor(Long id) {
        repo.deleteById(id);
    }
}
