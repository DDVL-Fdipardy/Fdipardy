package com.fdiba.ddvl.fdipardy.web.rest;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:8080","http://localhost:3000"})
@RequestMapping("/fdipardy/api")
public interface AnswerResource {

    @GetMapping("/answers/{id}")
    Answer getAnswerById(Long id);

    @GetMapping("/answers")
    List<Answer> getAll();
}
