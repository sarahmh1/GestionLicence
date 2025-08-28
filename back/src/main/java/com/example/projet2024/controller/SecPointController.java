package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.secpoint.SecPoint;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.SecPointServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/SecPoint")
@CrossOrigin(origins = "http://localhost:4200")
public class SecPointController {

    @Autowired
    private SecPointServiceImpl secPointService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/addSecPoint")
    public SecPoint addSecPoint(@RequestBody SecPoint secPoint) {
        return secPointService.addSecPoint(secPoint);
    }

    @PutMapping("/updateSecPoint")
    public SecPoint updateSecPoint(@RequestBody SecPoint secPoint) {
        return secPointService.updateSecPoint(secPoint);
    }

    @GetMapping("/get/{id-SecPoint}")
    public SecPoint getById(@PathVariable("id-SecPoint") Long secPointId) {
        return secPointService.retrieveSecPoint(secPointId);
    }

    @GetMapping("/allSecPoint")
    public List<SecPoint> getAllSecPoints() {
        return secPointService.retrieveAllSecPoints();
    }

    @DeleteMapping("/delete/{SecPoint-id}")
    public void deleteById(@PathVariable("SecPoint-id") Long secPointId) {
        secPointService.deleteById(secPointId);
    }

    @PutMapping("/approuve/{id}")
    public void activateSecPoint(@PathVariable("id") Long id) {
        secPointService.activate(id);
    }
}
