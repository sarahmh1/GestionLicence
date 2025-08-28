package com.example.projet2024.controller;

import com.example.projet2024.entite.Bitdefender;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.vmware.VMware;
import com.example.projet2024.service.BitdefenderServiceImpl;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.VMwareServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Bitdefender")
@CrossOrigin(origins = "http://localhost:4200")
public class BitdefenderController {

    @Autowired
    private BitdefenderServiceImpl  bitdefenderService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addBitdefender")
    public Bitdefender addBitdefender(@RequestBody Bitdefender bitdefender) {
        return bitdefenderService.addBitdefender(bitdefender);
    }

    @PutMapping("/updateBitdefender")
    public Bitdefender updateBitdefender(@RequestBody Bitdefender bitdefender) {
        return bitdefenderService.updateBitdefender(bitdefender);
    }

    @GetMapping("/get/{id-Bitdefender}")
    public Bitdefender getById(@PathVariable("id-Bitdefender") Long bitdefenderId) {
        return bitdefenderService.retrieveBitdefender(bitdefenderId);
    }

    @GetMapping("/allBitdefender")
    public List<Bitdefender> getAllBitdefenders() {
        return bitdefenderService.retrieveAllBitdefenders();
    }

    @DeleteMapping("/delete/{Bitdefender-id}")
    public void deleteById(@PathVariable("Bitdefender-id") Long bitdefenderId) {
        bitdefenderService.deleteById(bitdefenderId);
    }

    @PutMapping("/approuve/{id}")
    public void activateBitdefender(@PathVariable("id") Long id) {
        bitdefenderService.activate(id);
    }
}
