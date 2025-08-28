package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;
import com.example.projet2024.entite.rapid7.Rapid7;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.Rapid7ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Rapid7")
@CrossOrigin(origins = "http://localhost:4200")
public class Rapid7Controller {

    @Autowired
    private Rapid7ServiceImpl rapid7Service;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addRapid7")
    public Rapid7 addRapid7(@RequestBody Rapid7 rapid7) {
        return rapid7Service.addRapid7(rapid7);
    }

    @PutMapping("/updateRapid7")
    public Rapid7 updateRapid7(@RequestBody Rapid7 rapid7) {
        return rapid7Service.updateRapid7(rapid7);
    }

    @GetMapping("/get/{id-Rapid7}")
    public Rapid7 getById(@PathVariable("id-Rapid7") Long rapid7Id) {
        return rapid7Service.retrieveRapid7(rapid7Id);
    }

    @GetMapping("/allRapid7")
    public List<Rapid7> getAllRapid7s() {
        return rapid7Service.retrieveAllRapid7s();
    }

    @DeleteMapping("/delete/{Rapid7-id}")
    public void deleteById(@PathVariable("Rapid7-id") Long rapid7Id) {
        rapid7Service.deleteById(rapid7Id);
    }

    @PutMapping("/approuve/{id}")
    public void activateRapid7(@PathVariable("id") Long id) {
        rapid7Service.activate(id);
    }
}
