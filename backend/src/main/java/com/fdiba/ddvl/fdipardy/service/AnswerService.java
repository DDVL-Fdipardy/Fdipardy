package com.fdiba.ddvl.fdipardy.service;

import com.fdiba.ddvl.fdipardy.domain.Answer;

import java.util.List;

public interface AnswerService {

    Answer getById(Long id);
    List<Answer> getAll();

}
