package com.fdiba.ddvl.fdipardy.service.impl;

import com.fdiba.ddvl.fdipardy.domain.Question;
import com.fdiba.ddvl.fdipardy.repository.QuestionRepository;
import com.fdiba.ddvl.fdipardy.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question getById(Long id) {
        if(id != null && questionRepository.existsById(id)){
            Optional<Question> question = questionRepository.findById(id);
            return question.orElseThrow(() -> new HttpServerErrorException(HttpStatus.NO_CONTENT));
        }
        throw new HttpServerErrorException(HttpStatus.NO_CONTENT);
    }

    @Override
    public List<Question> getAll() {
        return questionRepository.findAll();
    }
}
