package com.hospital.hospital_management.repository;

import com.hospital.hospital_management.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // ✅ Find conflicting appointments (FIXED FIELD NAMES)
    @Query("SELECT a FROM Appointment a " +
            "WHERE a.doctorId = :doctorId " +
            "AND a.appointmentDate = :date " +
            "AND a.appointmentTime = :time")
    List<Appointment> findByDoctorIdAndDateAndTime(
            @Param("doctorId") Long doctorId,
            @Param("date") LocalDate date,
            @Param("time") LocalTime time
    );

    // ✅ Find all appointments on a date (for reminders)
    List<Appointment> findByAppointmentDate(LocalDate date);
}
