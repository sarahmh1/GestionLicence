package com.example.projet2024.controller;


import com.example.projet2024.entite.Crowdstrike;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.service.CrowdstrikeServiceImpl;
import com.example.projet2024.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Crowdstrike")
@CrossOrigin(origins = "http://localhost:4200")
public class CrowdstrikeController {
    @Autowired
    private CrowdstrikeServiceImpl crowdstrikeService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addCrowdstrike")
    public Crowdstrike addCrowdstrike(@RequestBody Crowdstrike crowdstrike) {

        return crowdstrikeService.addCrowdstrike(crowdstrike);
    }

    @PutMapping("/updateCrowdstrike")
    public Crowdstrike updateCrowdstrike(@RequestBody Crowdstrike crowdstrike) {
        return crowdstrikeService.updateCrowdstrike(crowdstrike);
    }

    @GetMapping("/get/{id}")
    public Crowdstrike getById(@PathVariable("id") Long crowdstrikeId) {
        return crowdstrikeService.retrieveCrowdstrike(crowdstrikeId);
    }

    @GetMapping("/allCrowdstrike")
    public List<Crowdstrike> getAllCrowdstrikes() {
        return crowdstrikeService.retrieveAllCrowdstrikes();
    }

    @DeleteMapping("/delete/{id}")
    public void deleteById(@PathVariable("id") Long crowdstrikeId) {
        crowdstrikeService.deleteById(crowdstrikeId);
    }

    @PutMapping("/approuve/{id}")
    public void activateCrowdstrike(@PathVariable("id") Long id) {
        crowdstrikeService.activate(id);
    }
}
