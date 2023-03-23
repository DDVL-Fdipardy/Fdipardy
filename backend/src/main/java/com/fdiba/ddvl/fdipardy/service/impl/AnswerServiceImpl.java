package com.fdiba.ddvl.fdipardy.service.impl;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.repository.AnswerRepository;
import com.fdiba.ddvl.fdipardy.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Answer getById(Long id) {
        if(id != null&& answerRepository.existsById(id)){
            Optional<Answer> answer = answerRepository.findById(id);
            return  answer.orElseThrow(() ->  new HttpServerErrorException(HttpStatus.NO_CONTENT));
        }
        throw new HttpServerErrorException(HttpStatus.NO_CONTENT);
    }

    @Override
    public List<Answer> getAll() {
        List<Answer> allAnswers = answerRepository.findAll();
        return allAnswers;
    }
}
