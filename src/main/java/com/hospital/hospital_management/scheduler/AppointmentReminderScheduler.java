package com.hospital.hospital_management.scheduler;

import com.hospital.hospital_management.entity.Appointment;
import com.hospital.hospital_management.repository.AppointmentRepository;
import com.hospital.hospital_management.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@EnableScheduling
@Component
public class AppointmentReminderScheduler {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private EmailService emailService;

    // Runs every day at 9 AM
    @Scheduled(cron = "0 0 9 * * *")
    public void sendReminders() {

        LocalDate tomorrow = LocalDate.now().plusDays(1);

        // ✅ FIX 1: Correct repository method
        List<Appointment> appointments =
                appointmentRepository.findByAppointmentDate(tomorrow);

        for (Appointment a : appointments) {
            String email = a.getPatient().getEmail();

            emailService.sendEmail(
                    email,
                    "Appointment Reminder",
                    // ✅ FIX 2: Correct entity method
                    "Reminder: Your appointment is tomorrow at " + a.getAppointmentTime()
            );
        }
    }
}
