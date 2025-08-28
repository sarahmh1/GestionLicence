package com.example.projet2024.service;

import com.example.projet2024.entite.SentineIOne;

import java.util.List;

public interface ISentineIOneService {
    SentineIOne addSentineIOne(SentineIOne sentineIOneI);
    SentineIOne updateSentineIOne(SentineIOne sentineIOneI) ;
    SentineIOne retrieveSentineIOne(Long sentineIOneIid);
    List<SentineIOne> retrieveAllSentineIOnes();
    void deleteById (Long sentineIOneid);
    void activate (Long id ) ;
}
