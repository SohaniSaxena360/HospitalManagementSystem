package com.hospital.hospital_management.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@CrossOrigin("*")
public class AnalyticsController {

    @GetMapping("/occupancy")
    public Map<String, Integer> bedOccupancy() {

        int totalBeds = 100;
        int occupiedBeds = 65;

        return Map.of(
                "occupied", occupiedBeds,
                "free", totalBeds - occupiedBeds
        );
    }
}

