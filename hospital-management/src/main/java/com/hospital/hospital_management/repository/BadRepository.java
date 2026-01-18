package com.hospital.hospital_management.repository;

import com.hospital.hospital_management.entity.Bad;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadRepository extends JpaRepository<Bad, Long> {
    // Optional custom queries
}


