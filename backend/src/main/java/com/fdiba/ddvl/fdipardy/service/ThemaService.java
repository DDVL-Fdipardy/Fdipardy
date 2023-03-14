package com.fdiba.ddvl.fdipardy.service;

import com.fdiba.ddvl.fdipardy.domain.Thema;

import java.util.List;

public interface ThemaService {

    Thema getById(Long id);

    List<Thema> getAll();
}
