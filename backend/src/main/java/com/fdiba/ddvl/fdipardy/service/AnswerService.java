package com.fdiba.ddvl.fdipardy.service;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.service.dto.AnswerDTO;

import java.util.List;

public interface AnswerService {

    List<Answer> getAll();

    Answer getById(Long id);

}
