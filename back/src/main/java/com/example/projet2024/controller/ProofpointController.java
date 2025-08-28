package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;
import com.example.projet2024.entite.proofpoint.Proofpoint;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.ProofpointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Proofpoint")
@CrossOrigin(origins = "http://localhost:4200")
public class ProofpointController {

    @Autowired
    private ProofpointServiceImpl proofpointService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addProofpoint")
    public Proofpoint addProofpoint(@RequestBody Proofpoint proofpoint) {
        return proofpointService.addProofpoint(proofpoint);
    }

    @PutMapping("/updateProofpoint")
    public Proofpoint updateProofpoint(@RequestBody Proofpoint proofpoint) {
        return proofpointService.updateProofpoint(proofpoint);
    }

    @GetMapping("/get/{id-Proofpoint}")
    public Proofpoint getById(@PathVariable("id-Proofpoint") Long proofpointId) {
        return proofpointService.retrieveProofpoint(proofpointId);
    }

    @GetMapping("/allProofpoint")
    public List<Proofpoint> getAllProofpoints() {
        return proofpointService.retrieveAllProofpoints();
    }

    @DeleteMapping("/delete/{Proofpoint-id}")
    public void deleteById(@PathVariable("Proofpoint-id") Long proofpointId) {
        proofpointService.deleteById(proofpointId);
    }

    @PutMapping("/approuve/{id}")
    public void activateProofpoint(@PathVariable("id") Long id) {
        proofpointService.activate(id);
    }
}
