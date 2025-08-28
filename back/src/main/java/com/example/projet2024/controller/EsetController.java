package com.example.projet2024.controller;

import com.example.projet2024.entite.ESET;
import com.example.projet2024.entite.ESETCI;
import com.example.projet2024.entite.ESETFR;
import com.example.projet2024.entite.ESETNFR;
import com.example.projet2024.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Eset")
@CrossOrigin(origins = "http://localhost:4200")
public class EsetController {
    @Autowired
    private EsetServiceImpl esetService   ;
    @Autowired
private EsetFrServiceImpl esetFrService ;
    @Autowired
    private EsetCIServiceImpl esetCIService ;
    @Autowired
    private EsetNFRServiceImpl esetNFRService ;
    @Autowired
    private EmailService emailService;


//    @PostMapping("/addESET")
//    public ESET addEset(@RequestBody ESET eset){
//
//        String sujet = "Nouvelle licence ESET ajoutée";
//        String contenu = "Bonjour,\n\nUne nouvelle licence ESET a été ajoutée.\n"
//                + "Client : " + eset.getClient() + "\n"
//                + "Produit : " + eset.getNom_produit() + "\n"
//                + "Date d'expiration : " + eset.getDateEx() + "\n\n"
//                + "Cordialement,\nEquipe Technique";
//
//        emailService.sendEsetNotification(eset.getMailAdmin(), eset.getCcMail(), sujet, contenu);
//
//        return  esetService.addESET(eset);
//
//    }
//    @GetMapping("/test-notification")
//    public ResponseEntity<String> testNotification() {
//        esetService.checkForExpiringEsets(); // Méthode qui vérifie les dates et envoie les emails
//        return ResponseEntity.ok("Notification test envoyée");
//    }

    @PostMapping("/addESET")
public ESET addEset(@RequestBody ESET eset){
    System.out.println("Received ESET: " + eset);  // Log the incoming request body
    return esetService.addESET(eset);
}



    @PutMapping("/updateEset")
    public ResponseEntity<?> updateEset(@RequestBody ESET eset) {
        if (eset.getEsetid() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("L'ID de l'ESET est requis.");
        }

        ESET existingEset = esetService.retrieveESET(eset.getEsetid());
        if (existingEset == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("ESET avec ID " + eset.getEsetid() + " non trouvé.");
        }

        try {
            ESET updated = esetService.updateESET(eset);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erreur lors de la mise à jour : " + e.getMessage());
        }
    }


    @GetMapping("/get/{id}")
    public ResponseEntity<ESET> getEsetById(@PathVariable("id") Long id) {
        try {
            ESET eset = esetService.retrieveESET(id);
            if (eset != null) {
                return ResponseEntity.ok(eset);
            } else {
                return ResponseEntity.notFound().build(); // 404 si non trouvé
            }
        } catch (Exception e) {
            e.printStackTrace(); // utile pour voir l'erreur dans les logs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // 500
        }
    }


    /////
    @GetMapping("/allEset")
    public List<ESET> getAllesets(){
        return esetService.retrieveAllESETs();
    }
    @DeleteMapping("/Delete-ESET/{id}")
    public void deleteById(@PathVariable("id") Long esetid) {
        esetService.deleteById(esetid);
    }


    @PutMapping("/approuve/{id}")
    public void activateArticle(@PathVariable("id") Long id) {
        esetService.activate(id);
    }

    /////////////////////////////////////////////////////////
    @PostMapping("/addESETCI")
    public ESETCI addEset(@RequestBody ESETCI eset){
            return  esetCIService.addESET(eset);
    }
    @PutMapping("/updateESETCI")
    public ESETCI updateEset(@RequestBody ESETCI eset){
        return  esetCIService.updateESET(eset);
    }
    @GetMapping("/get/esetci/{id}")
    public ESETCI getByIdCI(@PathVariable("id-ESETCI") Long esetid){
        return esetCIService.retrieveESET(esetid);
    }
    @GetMapping("/allESETCI")
    public List<ESETCI> getAllesetsCI(){
        return esetCIService.retrieveAllESETs();
    }

    @DeleteMapping("/Delete-ESETCI/{ESETCI-id}")
    public void deleteByIdCI(@PathVariable("ESETCI-id") Long esetid) {
        esetCIService.deleteById(esetid);
    }

    @PutMapping("/approuveCI/{id}")
    public void activateArticleCI(@PathVariable("id") Long id) {
        esetCIService.activate(id);
    }

    ///////////////////////////////////////////

    @PostMapping("/addESETFR")
    public ESETFR addEsetFR(@RequestBody ESETFR eset){
        return  esetFrService.addESETFR(eset);
    }
    @PutMapping("/updateEsetFR")
    public ESETFR updateEsetFR(@RequestBody ESETFR eset){
        return  esetFrService.updateESETFR(eset);
    }
    @GetMapping("/get/esetfr/{id}")
    public ESETFR getByIdFR(@PathVariable("id-EsetFR") Long esetid){
        return esetFrService.retrieveFRESET(esetid);
    }
    @GetMapping("/allEsetFR")
    public List<ESETFR> getAllesetsFR(){
        return esetFrService.retrieveAllESETsFR();
    }

    @DeleteMapping("/Delete-ESETFR/{EsetFR-id}")
    public void deleteByIdFR(@PathVariable("EsetFR-id") Long esetid) {
        esetFrService.deleteByIdFR(esetid);
    }

    @PutMapping("/approuveFR/{id}")
    public void activateArticleFR(@PathVariable("id") Long id) {
        esetFrService.activateFR(id);
    }
/////////////////////////

@PostMapping("/addESETNFR")
public ESETNFR addEset(@RequestBody ESETNFR eset){
    return  esetNFRService.addESET(eset);
}
    @PutMapping("/updateESETNFR")
    public ESETNFR updateEset(@RequestBody ESETNFR eset){
        return  esetNFRService.updateESET(eset);
    }
    @GetMapping("/get/esetnfr/{id}")
    public ESETNFR getByIdNFR(@PathVariable("id-ESETNFR") Long esetid){
        return esetNFRService.retrieveESET(esetid);
    }
    @GetMapping("/allESETNFR")
    public List<ESETNFR> getAllesetsNFR(){
        return esetNFRService.retrieveAllESETs();
    }

    @DeleteMapping("/Delete-ESETNFR/{ESETNFR-id}")
    public void deleteByIdNFR(@PathVariable("ESETNFR-id") Long esetid) {
        esetNFRService.deleteById(esetid);
    }

    @PutMapping("/approuveNFR/{id}")
    public void activateArticleNFR(@PathVariable("id") Long id) {
        esetNFRService.activate(id);
    }





}
