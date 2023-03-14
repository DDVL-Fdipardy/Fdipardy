package com.fdiba.ddvl.fdipardy.web.rest;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@RequestMapping("/fdipardy/api")
public interface AnswerResource {

    @GetMapping("/answers/{id}")
    Answer getById(Long id);

    @GetMapping("/answers")
    List<Answer> getAll();
}
