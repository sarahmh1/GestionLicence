package com.example.projet2024.controller;

import com.example.projet2024.entite.Alwarebytes;
import com.example.projet2024.entite.ESET;
import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.service.AlwarebytesServiceImpl;
import com.example.projet2024.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Alwarebytes")
@CrossOrigin(origins = "http://localhost:4200")
public class AlwarebytesController {
    @Autowired
    private AlwarebytesServiceImpl alwarebytesService;
    @Autowired
    private EmailService emailService;
    @PostMapping("/addAlwarebytes")
    public Alwarebytes addAlwarebytes(@RequestBody Alwarebytes alwarebytes){
        return alwarebytesService.addAlwarebytes(alwarebytes);
    }

    @PutMapping("/updateAlwarebytes")
    public Alwarebytes updateAlwarebytes(@RequestBody Alwarebytes alwarebytes) {
        return alwarebytesService.updateAlwarebytes(alwarebytes);
    }

    @GetMapping("/get/{id-Alwarebytes}")
    public Alwarebytes getById(@PathVariable("id-Alwarebytes") Long alwarebytesId) {
        return alwarebytesService.retrieveAlwarebytes(alwarebytesId);
    }

    @GetMapping("/allAlwarebytes")
    public List<Alwarebytes> getAllAlwarebytess() {
        return alwarebytesService.retrieveAllAlwarebytess();
    }

    @DeleteMapping("/delete/{Alwarebytes-id}")
    public void deleteById(@PathVariable("Alwarebytes-id") Long alwarebytesId) {
        alwarebytesService.deleteById(alwarebytesId);
    }

    @PutMapping("/approuve/{id}")
    public void activateAlwarebytes(@PathVariable("id") Long id) {
        alwarebytesService.activate(id);
    }
}
