package com.example.projet2024.controller;

import com.example.projet2024.entite.Infoblox;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.InfobloxServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Infoblox")
@CrossOrigin(origins = "http://localhost:4200")
public class InfobloxController {
    @Autowired
    private InfobloxServiceImpl infobloxService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addInfoblox")
    public Infoblox addInfoblox(@RequestBody Infoblox infoblox) {
        return infobloxService.addInfoblox(infoblox);
    }

    @PutMapping("/updateInfoblox")
    public Infoblox updateInfoblox(@RequestBody Infoblox infoblox) {
        return infobloxService.updateInfoblox(infoblox);
    }

    @GetMapping("/get/{id-Infoblox}")
    public Infoblox getById(@PathVariable("id-Infoblox") Long infobloxId) {
        return infobloxService.retrieveInfoblox(infobloxId);
    }

    @GetMapping("/allInfoblox")
    public List<Infoblox> getAllInfobloxs() {
        return infobloxService.retrieveAllInfobloxs();
    }

    @DeleteMapping("/delete/{Infoblox-id}")
    public void deleteById(@PathVariable("Infoblox-id") Long infobloxId) {
        infobloxService.deleteById(infobloxId);
    }

    @PutMapping("/approuve/{id}")
    public void activateInfoblox(@PathVariable("id") Long id) {
        infobloxService.activate(id);
    }
}
