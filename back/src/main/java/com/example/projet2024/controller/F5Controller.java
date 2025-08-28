package com.example.projet2024.controller;

import com.example.projet2024.entite.F5;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.F5ServiceImpl;
import com.example.projet2024.service.VMwareServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/F5")
@CrossOrigin(origins = "http://localhost:4200")
public class F5Controller {
    @Autowired
    private F5ServiceImpl f5Service;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addF5")
    public F5 addF5(@RequestBody F5 f5) {
        return f5Service.addF5(f5);
    }

    @PutMapping("/updateF5")
    public F5 updateF5(@RequestBody F5 f5) {
        return f5Service.updateF5(f5);
    }

    @GetMapping("/get/{id-F5}")
    public F5 getById(@PathVariable("id-F5") Long f5Id) {
        return f5Service.retrieveF5(f5Id);
    }

    @GetMapping("/allF5")
    public List<F5> getAllF5s() {
        return f5Service.retrieveAllF5s();
    }

    @DeleteMapping("/delete/{F5-id}")
    public void deleteById(@PathVariable("F5-id") Long f5Id) {
        f5Service.deleteById( f5Id);
    }

    @PutMapping("/approuve/{id}")
    public void activateF5(@PathVariable("id") Long id) {
        f5Service.activate(id);
    }
}
