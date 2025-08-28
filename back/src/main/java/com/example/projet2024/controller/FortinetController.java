package com.example.projet2024.controller;

import com.example.projet2024.entite.LicenceFortinet;
import com.example.projet2024.entite.fortinet.Fortinet;

import com.example.projet2024.service.EmailService;
import com.example.projet2024.service.FortinetServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Fortinet")
@CrossOrigin(origins = "http://localhost:4200")
public class FortinetController {

    @Autowired
    private FortinetServiceImpl fortinetService;
    @Autowired
    private EmailService emailService;
    @Autowired
    private FortinetServiceImpl fortinetServiceImpl;

    @PostMapping("/addFortinet")
    public Fortinet addFortinet(@RequestBody Fortinet fortinet) {
        return fortinetService.addFortinet(fortinet);
    }

    @GetMapping("/check-expirations")
    public ResponseEntity<String> checkExpirationsManuellement() {
        System.out.println(">> Check expiration Fortinet appelé");
        try {
            fortinetService.checkForExpiringFortinets();
            return ResponseEntity.ok("Vérification des licences Fortinet expirantes exécutée avec succès.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erreur lors de la vérification des licences : " + e.getMessage());
        }
    }

    @PutMapping("/updateFortinet")
    public ResponseEntity<?> updateFortinet(@RequestBody Fortinet fortinet) {
        if (fortinet.getFortinetId() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("L'ID du Fortinet est requis.");
        }

        Fortinet existingFortinet = fortinetService.retrieveFortinet(fortinet.getFortinetId());
        if (existingFortinet == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Fortinet avec ID " + fortinet.getFortinetId() + " non trouvé.");
        }

        try {
            Fortinet updated = fortinetService.updateFortinet(fortinet);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Fortinet> getFortinetById(@PathVariable("id") Long id) {
        try {
            Fortinet fortinet = fortinetService.retrieveFortinet(id);
            if (fortinet != null) {
                return ResponseEntity.ok(fortinet);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/allFortinet")
    public List<Fortinet> getAllFortinets() {
        return fortinetService.retrieveAllFortinets();
    }

    @DeleteMapping("/delete/{Fortinet-id}")
    public void deleteById(@PathVariable("Fortinet-id") Long fortinetId) {
        fortinetService.deleteById(fortinetId);
    }

    @PutMapping("/approuve/{id}")
    public void activateFortinet(@PathVariable("id") Long id) {
        fortinetService.activate(id);
    }
}
