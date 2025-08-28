package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.microsofto365.MicrosoftO365;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.MicrosoftO365ServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/MicrosoftO365")
@CrossOrigin(origins = "http://localhost:4200")
public class MicrosoftO365Controller {
    @Autowired
    private EmailService emailService;
    @Autowired
    private MicrosoftO365ServiceImpl microsoftO365Service;

    @PostMapping("/addMicrosoftO365")
    public MicrosoftO365 addMicrosoftO365(@RequestBody MicrosoftO365 microsoftO365) {
        return microsoftO365Service.addMicrosoftO365(microsoftO365);
    }

    @PutMapping("/updateMicrosoftO365")
    public MicrosoftO365 updateMicrosoftO365(@RequestBody MicrosoftO365 microsoftO365) {
        return microsoftO365Service.updateMicrosoftO365(microsoftO365);
    }

    @GetMapping("/get/{id-MicrosoftO365}")
    public MicrosoftO365 getById(@PathVariable("id-MicrosoftO365") Long microsoftO365Id) {
        return microsoftO365Service.retrieveMicrosoftO365(microsoftO365Id);
    }

    @GetMapping("/allMicrosoftO365")
    public List<MicrosoftO365> getAllMicrosoftO365s() {
        return microsoftO365Service.retrieveAllMicrosoftO365s();
    }

    @DeleteMapping("/delete/{MicrosoftO365-id}")
    public void deleteById(@PathVariable("MicrosoftO365-id") Long microsoftO365Id) {
        microsoftO365Service.deleteById(microsoftO365Id);
    }

    @PutMapping("/approuve/{id}")
    public void activateMicrosoftO365(@PathVariable("id") Long id) {
        microsoftO365Service.activate(id);
    }
}
