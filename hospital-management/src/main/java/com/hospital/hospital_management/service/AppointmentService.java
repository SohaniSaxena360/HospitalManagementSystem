package com.hospital.hospital_management.service;

import com.hospital.hospital_management.entity.Appointment;
import com.hospital.hospital_management.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public Appointment addAppointment(Appointment appointment) {

        // ✅ FIXED METHOD NAMES
        List<Appointment> conflicts = appointmentRepository.findByDoctorIdAndDateAndTime(
                appointment.getDoctorId(),
                appointment.getAppointmentDate(),   // FIX
                appointment.getAppointmentTime()    // FIX
        );

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("Doctor is already booked at this time!");
        }

        return appointmentRepository.save(appointment);
    }

    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }
}
