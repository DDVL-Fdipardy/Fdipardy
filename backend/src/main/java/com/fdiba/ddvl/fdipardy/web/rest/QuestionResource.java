package com.fdiba.ddvl.fdipardy.web.rest;

import com.fdiba.ddvl.fdipardy.domain.Question;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/fdipardy/api")
public interface QuestionResource {

    @GetMapping("/questions")
    List<Question> getAllQuestions();

    @GetMapping("/question/{id}")
    Question getQuestionById(@PathVariable Long id);
}
