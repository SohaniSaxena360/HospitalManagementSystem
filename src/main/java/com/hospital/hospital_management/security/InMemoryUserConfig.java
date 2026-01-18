//package com.hospital.hospital_management.security;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//
//@Configuration
//public class InMemoryUserConfig {
//
//@Bean
//public PasswordEncoder passwordEncoder() {
//    return new BCryptPasswordEncoder();
//}
//
//@Bean
//public AuthenticationManager configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
//    auth.inMemoryAuthentication()
//            .withUser("admin")
//            .password(passwordEncoder().encode("admin123"))
//            .roles("ADMIN")
//            .and()
//            .withUser("doctor")
//            .password(passwordEncoder().encode("doctor123"))
//            .roles("DOCTOR");
//
//    return auth.build(); // This makes it a proper @Bean method
//}
//}