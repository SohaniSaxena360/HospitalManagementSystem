package com.hospital.hospital_management.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "patients")
@Data
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "gender")
    private String gender;

    @Column(name = "phone")
    private String phone;

    @Column(name = "date_of_birth")   // ✅ matches DB
    private LocalDate dateOfBirth;

    @Column(name = "address")
    private String address;

    @Column(name = "created_at")     // ✅ FIXED spelling
    private LocalDateTime createTime;
}
