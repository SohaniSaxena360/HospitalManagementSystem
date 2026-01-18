package com.hospital.hospital_management.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityUsersConfig {

    @Bean
    public UserDetailsService inMemoryUserDetailsService(
            PasswordEncoder passwordEncoder
    ) {
        var userDetailsManager = new InMemoryUserDetailsManager();

        // Admin user
        var admin = User.withUsername("admin")
                .password(passwordEncoder.encode("admin123"))
                .roles("ADMIN")
                .build();

        // Doctor user
        var doctor = User.withUsername("doctor")
                .password(passwordEncoder.encode("doctor123"))
                .roles("DOCTOR")
                .build();

        userDetailsManager.createUser(admin);
        userDetailsManager.createUser(doctor);

        return userDetailsManager;
    }
}
