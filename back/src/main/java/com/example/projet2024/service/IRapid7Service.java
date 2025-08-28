package com.example.projet2024.service;

import com.example.projet2024.entite.rapid7.Rapid7;

import java.util.List;

public interface IRapid7Service {
    Rapid7 addRapid7(Rapid7 rapid7);
    Rapid7 updateRapid7(Rapid7 rapid7);
    Rapid7 retrieveRapid7(Long rapid7Id);
    List<Rapid7> retrieveAllRapid7s();
    void deleteById(Long rapid7Id);
    void activate(Long id);
}
