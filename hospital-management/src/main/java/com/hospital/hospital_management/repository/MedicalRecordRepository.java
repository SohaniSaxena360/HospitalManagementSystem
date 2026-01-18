//package com.hospital.hospital_management.repository;
//
//import com.hospital.hospital_management.entity.MedicalRecord;
//import org.springframework.data.jpa.repository.JpaRepository;
//import java.util.List;
//
//public interface MedicalRecordRepository extends JpaRepository<MedicalRecord, Long> {
//    List<MedicalRecord> findByPatient_Id(Long patientId);
//}


package com.hospital.hospital_management.repository;

import com.hospital.hospital_management.entity.MedicalRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MedicalRecordRepository
        extends JpaRepository<MedicalRecord, Long> {

    // ✅ ADD THIS METHOD
    List<MedicalRecord> findByPatientId(Long patientId);
}


