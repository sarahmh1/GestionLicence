package com.example.projet2024.controller;


import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.paloalto.Palo;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.PaloServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Palo")
@CrossOrigin(origins = "http://localhost:4200")
public class PaloController {

    @Autowired
    private PaloServiceImpl paloService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addPalo")
    public Palo addPalo(@RequestBody Palo palo) {
        return paloService.addPalo(palo);
    }

    @PutMapping("/updatePalo")
    public Palo updatePalo(@RequestBody Palo palo) {
        return paloService.updatePalo(palo);
    }

    @GetMapping("/get/{id-Palo}")
    public Palo getById(@PathVariable("id-Palo") Long paloId) {
        return paloService.retrievePalo(paloId);
    }

    @GetMapping("/allPalo")
    public List<Palo> getAllPalos() {
        return paloService.retrieveAllPalos();
    }

    @DeleteMapping("/delete/{Palo-id}")
    public void deleteById(@PathVariable("Palo-id") Long paloId) {
        paloService.deleteById(paloId);
    }

    @PutMapping("/approuve/{id}")
    public void activatePalo(@PathVariable("id") Long id) {
        paloService.activate(id);
    }
}
