package com.fdiba.ddvl.fdipardy.web;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fdiba.ddvl.fdipardy.FdipardyApplication;
import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.repository.AnswerRepository;
import com.fdiba.ddvl.fdipardy.service.mapper.AnswerMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.persistence.EntityManager;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = FdipardyApplication.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AnswerResourceIT {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private EntityManager entityManager;

    private ObjectMapper objectMapper;

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private AnswerMapper answerMapper;

    private static final int ANSWERS_COUNT = 25;

    @BeforeEach
    void setup(){
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.webApplicationContext)
                .build();

        objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);
    }

    @Test
    void getAllAnswers_isOK() throws Exception {
        List<Answer> answers = answerRepository.findAll();
        final byte[] answersAsBytes = objectMapper.writeValueAsBytes(answers);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/answers")
                        .content(answersAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        Assertions.assertEquals(ANSWERS_COUNT,answers.size());

    }

    @Test
    void getAllAnswers_isNotFound() throws Exception {
        List<Answer> answers = answerRepository.findAll();
        final byte[] answersAsBytes = objectMapper.writeValueAsBytes(answers);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/aaaaaanswers")
                        .content(answersAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }

    @Test
    void getOneAnswers_isOK() throws Exception {
        List<Answer> answers = answerRepository.findAll();

        int min = 0;
        int max = 24;
        int answerNumber = (int) (Math.random()*(max-min+1)+min);
        Answer answer = answers.get(answerNumber);

        final byte[] answerAsBytes = objectMapper.writeValueAsBytes(answer);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/answers/{id}",answerNumber)
                        .content(answerAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(answerNumber))
                .andReturn();


    }

    @Test
    void getOneAnswers_isNotFound() throws Exception {
        List<Answer> answers = answerRepository.findAll();

        int min = 0;
        int max = 24;
        int answerNumber = (int) (Math.random()*(max-min+1)+min);
        Answer answer = answers.get(answerNumber);

        final byte[] answerAsBytes = objectMapper.writeValueAsBytes(answer);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/answssers/{id}",answerNumber)
                        .content(answerAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }
}
