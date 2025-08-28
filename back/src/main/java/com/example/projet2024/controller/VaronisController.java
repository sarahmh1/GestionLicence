package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.Varonis;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.VaronisServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Varonis")
@CrossOrigin(origins = "http://localhost:4200")
public class VaronisController {
    @Autowired
    private VaronisServiceImpl varonisService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addVaronis")
    public Varonis addVaronis(@RequestBody Varonis varonis) {
        return varonisService.addVaronis(varonis);
    }

    @PutMapping("/updateVaronis")
    public Varonis updateVaronis(@RequestBody Varonis varonis) {
        return varonisService.updateVaronis(varonis);
    }

    @GetMapping("/get/{id-Varonis}")
    public Varonis getById(@PathVariable("id-Varonis") Long varonisId) {
        return varonisService.retrieveVaronis(varonisId);
    }

    @GetMapping("/allVaronis")
    public List<Varonis> getAllVaroniss() {
        return varonisService.retrieveAllVaroniss();
    }

    @DeleteMapping("/delete/{Varonis-id}")
    public void deleteById(@PathVariable("Varonis-id") Long varonisId) {
        varonisService.deleteById(varonisId);
    }

    @PutMapping("/approuve/{id}")
    public void activateVaronis(@PathVariable("id") Long id) {
        varonisService.activate(id);
    }
}

