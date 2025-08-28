package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;
import com.example.projet2024.entite.splunk.Splunk;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.SplunkServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Splunk")
@CrossOrigin(origins = "http://localhost:4200")
public class SplunkController {

    @Autowired
    private SplunkServiceImpl splunkService;
    @Autowired
    private EmailService emailService;

    @PostMapping("/addSplunk")
   public Splunk addSplunk(@RequestBody Splunk splunk) {
        return splunkService.addSplunk(splunk);
    }

//    @PostMapping("/addSplunk")
//    public Splunk addSplunk(@RequestBody Splunk splunk) {
//
//        String sujet = "Nouvelle licence Splunk ajoutée";
//        String contenu = "Bonjour,\n\nUne nouvelle licence Splunk a été ajoutée.\n"
//                + "Client : " + splunk.getClient() + "\n"
//                + "NomDesLicences : " + splunk.getNomDesLicences() + "\n"
//                + "Date d'expiration : " + splunk.getDateEx() + "\n\n"
//                + "Cordialement,\nEquipe Technique";
//
//        emailService.sendEsetNotification(splunk.getMailAdmin(), splunk.getCcMail(), sujet, contenu);
//        return splunkService.addSplunk(splunk);
//    }

    @PutMapping("/updateSplunk")
    public Splunk updateSplunk(@RequestBody Splunk splunk) {
        return splunkService.updateSplunk(splunk);
    }

    @GetMapping("/get/{id-Splunk}")
    public Splunk getById(@PathVariable("id-Splunk") Long splunkId) {
        return splunkService.retrieveSplunk(splunkId);
    }

    @GetMapping("/allSplunk")
    public List<Splunk> getAllSplunks() {
        return splunkService.retrieveAllSplunks();
    }

    @DeleteMapping("/delete/{Splunk-id}")
    public void deleteById(@PathVariable("Splunk-id") Long splunkId) {
        splunkService.deleteById(splunkId);
    }

    @PutMapping("/approuve/{id}")
    public void activateSplunk(@PathVariable("id") Long id) {
        splunkService.activate(id);
    }
}
