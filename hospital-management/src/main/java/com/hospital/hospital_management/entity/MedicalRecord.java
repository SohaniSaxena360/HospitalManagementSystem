package com.hospital.hospital_management.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.Map;

@Entity
public class MedicalRecord {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // ✅ ADD THIS
        @Column(nullable = false)
        private Long patientId;

        @JdbcTypeCode(SqlTypes.JSON)
        @Column(columnDefinition = "jsonb")
        private Map<String, Object> record;

        public Long getId() {
            return id;
        }

        public Long getPatientId() {
            return patientId;
        }

        public Map<String, Object> getRecord() {
            return record;
        }
}





