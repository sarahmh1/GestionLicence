package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.SentineIOne;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.SentineIOneServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/SentineIOne")
@CrossOrigin(origins = "http://localhost:4200")
public class SentineIOneController {
    @Autowired
    private SentineIOneServiceImpl sentineIOneService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addSentineIOne")
    public SentineIOne addSentineIOne(@RequestBody SentineIOne sentineIOne) {
        return sentineIOneService.addSentineIOne(sentineIOne);
    }

    @PutMapping("/updateSentineIOne")
    public SentineIOne updateSentineIOne(@RequestBody SentineIOne sentineIOne) {
        return sentineIOneService.updateSentineIOne(sentineIOne);
    }

    @GetMapping("/get/{id-SentineIOne}")
    public SentineIOne getById(@PathVariable("id-SentineIOne") Long sentineIOneId) {
        return sentineIOneService.retrieveSentineIOne(sentineIOneId);
    }

    @GetMapping("/allSentineIOne")
    public List<SentineIOne> getAllSentineIOnes() {
        return sentineIOneService.retrieveAllSentineIOnes();
    }

    @DeleteMapping("/delete/{SentineIOne-id}")
    public void deleteById(@PathVariable("SentineIOne-id") Long sentineIOneId) {
        sentineIOneService.deleteById(sentineIOneId);
    }

    @PutMapping("/approuve/{id}")
    public void activateSentineIOne(@PathVariable("id") Long id) { sentineIOneService.activate(id);
    }
}
