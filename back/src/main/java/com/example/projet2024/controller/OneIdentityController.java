package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.OneIdentity;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.OneIdentityServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/OneIdentity")
@CrossOrigin(origins = "http://localhost:4200")
public class OneIdentityController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private OneIdentityServiceImpl oneIdentityService;

    @PostMapping("/addOneIdentity")
    public OneIdentity addOneIdentity(@RequestBody OneIdentity oneIdentity) {
        return oneIdentityService.addOneIdentity(oneIdentity);
    }

    @PutMapping("/updateOneIdentity")
    public OneIdentity updateOeIdentity(@RequestBody OneIdentity oneIdentity) {
        return oneIdentityService.updateOneIdentity(oneIdentity);
    }

    @GetMapping("/get/{id-OneIdentity}")
    public OneIdentity getById(@PathVariable("id-OneIdentity") Long oneIdentityId) {
        return oneIdentityService.retrieveOneIdentity(oneIdentityId);
    }

    @GetMapping("/allOneIdentity")
    public List<OneIdentity> getAllOneIdentitys() {
        return oneIdentityService.retrieveAllOneIdentitys();
    }

    @DeleteMapping("/delete/{OneIdentity-id}")
    public void deleteById(@PathVariable("OneIdentity-id") Long oneIdentityId) {
        oneIdentityService.deleteById(oneIdentityId);
    }

    @PutMapping("/approuve/{id}")
    public void activateOneIdentity(@PathVariable("id") Long id) {
        oneIdentityService.activate(id);
    }
}


