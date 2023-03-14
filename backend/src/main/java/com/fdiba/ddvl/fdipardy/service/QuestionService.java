package com.fdiba.ddvl.fdipardy.service;

import com.fdiba.ddvl.fdipardy.domain.Question;

import java.util.List;

public interface QuestionService {

    List<Question> getAll();

    Question getById(Long id);
}
