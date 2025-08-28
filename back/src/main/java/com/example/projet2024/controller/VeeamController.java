package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;
import com.example.projet2024.entite.veeam.Veeam;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.VeeamServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Veeam")
@CrossOrigin(origins = "http://localhost:4200")
public class VeeamController {

    @Autowired
    private VeeamServiceImpl veeamService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addVeeam")
    public Veeam addVeeam(@RequestBody Veeam veeam) {
        return veeamService.addVeeam(veeam);
    }

    @PutMapping("/updateVeeam")
    public Veeam updateVeeam(@RequestBody Veeam veeam) {
        return veeamService.updateVeeam(veeam);
    }

    @GetMapping("/get/{id-Veeam}")
    public Veeam getById(@PathVariable("id-Veeam") Long veeamId) {
        return veeamService.retrieveVeeam(veeamId);
    }

    @GetMapping("/allVeeam")
    public List<Veeam> getAllVeeams() {
        return veeamService.retrieveAllVeeams();
    }

    @DeleteMapping("/delete/{Veeam-id}")
    public void deleteById(@PathVariable("Veeam-id") Long veeamId) {
        veeamService.deleteById(veeamId);
    }

    @PutMapping("/approuve/{id}")
    public void activateVeeam(@PathVariable("id") Long id) {
        veeamService.activate(id);
    }
}
