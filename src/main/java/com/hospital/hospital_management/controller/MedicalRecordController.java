package com.hospital.hospital_management.controller;

import com.hospital.hospital_management.entity.MedicalRecord;
import com.hospital.hospital_management.repository.MedicalRecordRepository;
import com.hospital.hospital_management.service.AuditService;

import com.itextpdf.kernel.pdf.*;
//import com.itextpdf.kernel.pdf.encryption.EncryptionConstants;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;


import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/medical-records")
@CrossOrigin("*")
public class MedicalRecordController {

    @Autowired
    private MedicalRecordRepository medicalRecordRepository;

    @Autowired
    private AuditService auditService;

    // ✅ VIEW medical records + audit log
    @GetMapping("/{patientId}")
    public List<MedicalRecord> getRecords(
            @PathVariable Long patientId,
            @AuthenticationPrincipal User user
    ) {
        auditService.logAccess(user.getUsername(), patientId, "VIEW");
        return medicalRecordRepository.findByPatientId(patientId);
    }

    // ✅ EXPORT password protected PDF
    @PostMapping("/export-pdf/{patientId}")
    public void exportPDF(
            @PathVariable Long patientId,
            HttpServletResponse response
    ) throws IOException {

        List<MedicalRecord> records =
                medicalRecordRepository.findByPatientId(patientId);

        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PdfWriter writer = new PdfWriter(baos);
        PdfDocument pdfDoc = new PdfDocument(writer);
        Document doc = new Document(pdfDoc);

        for (MedicalRecord r : records) {
            doc.add(new Paragraph("Record ID: " + r.getId()));
            doc.add(new Paragraph("Data: " + r.getRecord().toString()));
            doc.add(new Paragraph("\n"));
        }

        doc.close();

        response.setContentType("application/pdf");
        response.setHeader(
                "Content-Disposition",
                "attachment; filename=patient_" + patientId + ".pdf"
        );
        response.getOutputStream().write(baos.toByteArray());
    }

}





