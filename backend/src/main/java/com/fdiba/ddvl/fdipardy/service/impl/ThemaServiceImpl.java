package com.fdiba.ddvl.fdipardy.service.impl;

import com.fdiba.ddvl.fdipardy.domain.Thema;
import com.fdiba.ddvl.fdipardy.repository.ThemaRepository;
import com.fdiba.ddvl.fdipardy.service.ThemaService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.Optional;

@Service
public class ThemaServiceImpl implements ThemaService {

    private ThemaRepository themaRepository;

    @Override
    public Thema getById(Long id) {
        if(id != null && themaRepository.existsById(id)){
            Optional<Thema> thema = themaRepository.findById(id);
            return thema.orElseThrow(()-> new HttpServerErrorException(HttpStatus.NO_CONTENT));
        }
        return null;
    }

    @Override
    public List<Thema> getAll() {
        return themaRepository.findAll();
    }
}