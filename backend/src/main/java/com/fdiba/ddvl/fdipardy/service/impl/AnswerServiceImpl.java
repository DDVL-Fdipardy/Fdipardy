package com.fdiba.ddvl.fdipardy.service.impl;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.repository.AnswerRepository;
import com.fdiba.ddvl.fdipardy.service.AnswerService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.Optional;

@Service
public class AnswerServiceImpl implements AnswerService {

    private AnswerRepository answerRepository;

    public AnswerServiceImpl(AnswerRepository answerRepository) {
        this.answerRepository = answerRepository;
    }

    @Override
    public List<Answer> getAll() {
        List<Answer> allAnswers = answerRepository.findAll();
        return allAnswers;
    }

    @Override
    public Answer getById(Long id) {
        if(id != null){
            Optional<Answer> answer = answerRepository.findById(id);
            return  answer.orElseThrow(() ->  new HttpServerErrorException(HttpStatus.NO_CONTENT));
        }
        throw new HttpServerErrorException(HttpStatus.NO_CONTENT);
    }
}
