package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.proofpoint.Proofpoint;
import com.example.projet2024.entite.wallix.Wallix;
import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.WallixServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Wallix")
@CrossOrigin(origins = "http://localhost:4200")
public class WallixController {
    @Autowired
    private EmailService emailService;
    @Autowired
    private WallixServiceImpl wallixService;

    @PostMapping("/addWallix")
    public Wallix addWallix(@RequestBody Wallix wallix) {
        return wallixService.addWallix(wallix);
    }

    @PutMapping("/updateWallix")
    public Wallix updateWallix(@RequestBody Wallix wallix) {
        return wallixService.updateWallix(wallix);
    }

    @GetMapping("/get/{id-Wallix}")
    public Wallix getById(@PathVariable("id-Wallix") Long wallixId) {
        return wallixService.retrieveWallix(wallixId);
    }

    @GetMapping("/allWallix")
    public List<Wallix> getAllWallixs() {
        return wallixService.retrieveAllWallixs();
    }

    @DeleteMapping("/delete/{Wallix-id}")
    public void deleteById(@PathVariable("Wallix-id") Long wallixId) {
        wallixService.deleteById(wallixId);
    }

    @PutMapping("/approuve/{id}")
    public void activateWallix(@PathVariable("id") Long id) {
        wallixService.activate(id);
    }
}
