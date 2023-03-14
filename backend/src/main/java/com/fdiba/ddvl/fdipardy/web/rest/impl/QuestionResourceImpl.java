package com.fdiba.ddvl.fdipardy.web.rest.impl;

import com.fdiba.ddvl.fdipardy.domain.Question;
import com.fdiba.ddvl.fdipardy.service.QuestionService;
import com.fdiba.ddvl.fdipardy.web.rest.QuestionResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class QuestionResourceImpl implements QuestionResource {

    @Autowired
    private QuestionService questionService;

    public QuestionResourceImpl(QuestionService questionService) {
        this.questionService = questionService;
    }

    @Override
    public List<Question> getAllQuestions() {
        return questionService.getAll();
    }

    @Override
    public Question getQuestionById(Long id) {
        return questionService.getById(id);
    }
}
