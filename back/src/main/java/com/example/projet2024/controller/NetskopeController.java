package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.Netskope;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.NetskopeServiceImpl;
import com.example.projet2024.service.VMwareServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Netskope")
@CrossOrigin(origins = "http://localhost:4200")
public class NetskopeController {
    @Autowired
    private NetskopeServiceImpl netskopeService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addNetskope")
    public Netskope addNetskope(@RequestBody Netskope netskope) {
        return  netskopeService.addNetskope(netskope);
    }

    @PutMapping("/updateNetskope")
    public Netskope updateNetskope(@RequestBody Netskope netskope) {
        return netskopeService.updateNetskope(netskope);
    }

    @GetMapping("/get/{id-Netskope}")
    public Netskope getById(@PathVariable("id-Netskope") Long netskopeId) {
        return netskopeService.retrieveNetskope(netskopeId);
    }

    @GetMapping("/allNetskope")
    public List<Netskope> getAllNetskopes() {
        return netskopeService.retrieveAllNetskopes();
    }

    @DeleteMapping("/delete/{Netskope-id}")
    public void deleteById(@PathVariable("Netskope-id") Long netskopeId) {
        netskopeService.deleteById(netskopeId);
    }

    @PutMapping("/approuve/{id}")
    public void activateNetskope(@PathVariable("id") Long id) {
        netskopeService.activate(id);
    }
}
