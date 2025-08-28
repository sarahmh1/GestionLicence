package com.example.projet2024.controller;


import com.example.projet2024.entite.Imperva;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.ImpervaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Imperva")
@CrossOrigin(origins = "http://localhost:4200")
public class ImpervaController {
    @Autowired
    private ImpervaServiceImpl impervaService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addImperva")
    public Imperva addImperva(@RequestBody Imperva imperva) {
        return impervaService.addImperva(imperva);
    }

    @PutMapping("/updateImperva")
    public Imperva updateImperva(@RequestBody Imperva imperva) {
        return impervaService.updateImperva(imperva);
    }

    @GetMapping("/get/{id-Imperva}")
    public Imperva getById(@PathVariable("id-Imperva") Long impervaId) {
        return impervaService.retrieveImperva(impervaId);
    }

    @GetMapping("/allImperva")
    public List<Imperva> getAllImpervas() {
        return impervaService.retrieveAllImpervas();
    }

    @DeleteMapping("/delete/{Imperva-id}")
    public void deleteById(@PathVariable("Imperva-id") Long impervaId) {
        impervaService.deleteById(impervaId);
    }

    @PutMapping("/approuve/{id}")
    public void activateImperva(@PathVariable("id") Long id) {
        impervaService.activate(id);
    }
}
