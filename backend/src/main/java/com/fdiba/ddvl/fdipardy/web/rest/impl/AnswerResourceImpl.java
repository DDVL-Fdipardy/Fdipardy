package com.fdiba.ddvl.fdipardy.web.rest.impl;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.service.AnswerService;
import com.fdiba.ddvl.fdipardy.web.rest.AnswerResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AnswerResourceImpl implements AnswerResource {

    @Autowired
    private AnswerService answerService;

    public AnswerResourceImpl(AnswerService answerService) {
        this.answerService = answerService;
    }

    @Override
    public Answer getById(Long id) {
        return answerService.getById(id);
    }

    @Override
    public List<Answer> getAll() {
        return answerService.getAll();
    }
}
