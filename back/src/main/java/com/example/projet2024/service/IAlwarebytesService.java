package com.example.projet2024.service;

import com.example.projet2024.entite.Alwarebytes;

import java.util.List;

public interface IAlwarebytesService {
    Alwarebytes addAlwarebytes(Alwarebytes alwarebytes);
    Alwarebytes updateAlwarebytes(Alwarebytes alwarebytes) ;
    Alwarebytes retrieveAlwarebytes(Long alwarebytesid);
    List<Alwarebytes> retrieveAllAlwarebytess();
    void deleteById (Long alwarebytesid);
    void activate (Long id ) ;
}
