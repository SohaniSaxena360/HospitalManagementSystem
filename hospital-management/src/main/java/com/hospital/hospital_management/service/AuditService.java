package com.hospital.hospital_management.service;

import org.springframework.stereotype.Service;

@Service
public class AuditService {

    public void logAccess(String userId, Long patientId, String action) {
        System.out.println(
                "AUDIT → User: " + userId +
                        ", Patient: " + patientId +
                        ", Action: " + action
        );
    }
}


