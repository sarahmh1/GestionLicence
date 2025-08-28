package com.example.projet2024.controller;

import com.example.projet2024.entite.Fortra;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.FortraServiceImpl;
import com.example.projet2024.service.VMwareServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Fortra")
@CrossOrigin(origins = "http://localhost:4200")
public class FortraController {
    @Autowired
    private FortraServiceImpl fortraService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addFortra")
    public Fortra addFortra(@RequestBody Fortra fortra) {

        return fortraService.addFortra(fortra);
    }

    @PutMapping("/updateFortra")
    public Fortra updateFortra(@RequestBody Fortra fortra) {
        return fortraService.updateFortra(fortra);
    }

    @GetMapping("/get/{id-Fortra}")
    public Fortra getById(@PathVariable("id-Fortra") Long fortraId) {
        return fortraService.retrieveFortra(fortraId);
    }

    @GetMapping("/allFortra")
    public List<Fortra> getAllFortras() {
        return fortraService.retrieveAllFortras();
    }

    @DeleteMapping("/delete/{Fortra-id}")
    public void deleteById(@PathVariable("Fortra-id") Long fortraId) {
        fortraService.deleteById(fortraId);
    }

    @PutMapping("/approuve/{id}")
    public void activateFortra(@PathVariable("id") Long id) {
        fortraService.activate(id);
    }
}
