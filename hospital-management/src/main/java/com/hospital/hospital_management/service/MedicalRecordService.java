package com.hospital.hospital_management.service;

import com.hospital.hospital_management.entity.MedicalRecord;
import com.hospital.hospital_management.repository.MedicalRecordRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class MedicalRecordService {

    @Autowired
    private MedicalRecordRepository repo;

    public List<MedicalRecord> getByPatientId(Long patientId) {
        return repo.findByPatientId(patientId);
    }

    public MedicalRecord save(MedicalRecord record) {
        return repo.save(record);
    }
}


