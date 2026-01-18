package com.hospital.hospital_management.repository;

import com.hospital.hospital_management.entity.Doctor;
//import com.hospital.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
}

