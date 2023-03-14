package com.fdiba.ddvl.fdipardy.web.rest.impl;

import com.fdiba.ddvl.fdipardy.domain.Thema;
import com.fdiba.ddvl.fdipardy.service.ThemaService;
import com.fdiba.ddvl.fdipardy.web.rest.ThemaResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ThemaResourceImpl implements ThemaResource {

    @Autowired
    private ThemaService themaService;

    public ThemaResourceImpl(ThemaService themaService) {
        this.themaService = themaService;
    }

    @Override
    public Thema getThemaById(Long id) {
        return themaService.getById(id);
    }

    @Override
    public List<Thema> getAllThemas() {
        return themaService.getAll();
    }
}
