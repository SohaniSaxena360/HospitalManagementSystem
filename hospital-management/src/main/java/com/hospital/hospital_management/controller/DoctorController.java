package com.hospital.hospital_management.controller;

import com.hospital.hospital_management.entity.Doctor;
import com.hospital.hospital_management.service.DoctorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

//@RestController
//@RequestMapping("/doctors")
//@CrossOrigin(origins = "http://localhost:5173") // frontend URL
//public class DoctorController {
//
//    @Autowired
//    private DoctorService service;
//
//    @GetMapping
//    public List<Doctor> getAllDoctors() {
//        return service.getAllDoctors();
//    }
//
////    @PostMapping
////    public Doctor addDoctor(@RequestBody Doctor doctor) {
////        return service.saveDoctor(doctor);
////    }
//
//    @PostMapping
//    public Doctor addDoctor(@RequestBody Doctor doctor) {
//        return service.saveDoctor(doctor);
//    }
//
//
//    @GetMapping("/{id}")
//    public Doctor getDoctor(@PathVariable Long id) {
//        return service.getDoctorById(id);
//    }
//
//    @DeleteMapping("/{id}")
//    public void deleteDoctor(@PathVariable Long id) {
//        service.deleteDoctor(id);
//    }
//}
@RestController
@RequestMapping("/api/doctors")
@CrossOrigin(origins = "http://localhost:3000")
public class DoctorController {

    @Autowired
    private DoctorService service;

    @GetMapping
    public List<Doctor> getAllDoctors() {
        return service.getAllDoctors();
    }

    @PostMapping(consumes = "application/json")
    public Doctor addDoctor(@RequestBody Doctor doctor) {
        return service.saveDoctor(doctor);
    }

    @GetMapping("/{id}")
    public Doctor getDoctor(@PathVariable Long id) {
        return service.getDoctorById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteDoctor(@PathVariable Long id) {
        service.deleteDoctor(id);
    }
}

