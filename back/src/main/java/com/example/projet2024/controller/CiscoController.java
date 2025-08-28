package com.example.projet2024.controller;

import com.example.projet2024.entite.Cisco;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.service.CiscoServiceImpl;
import com.example.projet2024.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Cisco")
@CrossOrigin(origins = "http://localhost:4200")
public class CiscoController {
    @Autowired
    private CiscoServiceImpl ciscoService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addCisco")
    public Cisco addCisco(@RequestBody Cisco cisco) {
        return ciscoService.addCisco(cisco);
    }

    @PutMapping("/updateCisco")
    public Cisco updateCisco(@RequestBody Cisco cisco) {
        return ciscoService.updateCisco(cisco);
    }

    @GetMapping("/get/{id-Cisco}")
    public Cisco getById(@PathVariable("id-Cisco") Long ciscoId) {
        return ciscoService.retrieveCisco(ciscoId);
    }

    @GetMapping("/allCisco")
    public List<Cisco> getAllCiscos() {
        return ciscoService.retrieveAllCiscos();
    }

    @DeleteMapping("/delete/{Cisco-id}")
    public void deleteById(@PathVariable("Cisco-id") Long ciscoId) {
        ciscoService.deleteById(ciscoId);
    }

    @PutMapping("/approuve/{id}")
    public void activateCisco(@PathVariable("id") Long id) {
        ciscoService.activate(id);
    }
}
