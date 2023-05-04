package com.fdiba.ddvl.fdipardy.web;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fdiba.ddvl.fdipardy.FdipardyApplication;
import com.fdiba.ddvl.fdipardy.config.PostgresqlContainer;
import com.fdiba.ddvl.fdipardy.domain.Question;
import com.fdiba.ddvl.fdipardy.repository.QuestionRepository;
import org.junit.ClassRule;
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
import org.testcontainers.containers.PostgreSQLContainer;

import javax.persistence.EntityManager;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = FdipardyApplication.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class QuestionResourceIT {
    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private EntityManager entityManager;

    private ObjectMapper objectMapper;

    @Autowired
    private QuestionRepository questionRepository;

    @ClassRule
    public static PostgreSQLContainer postgreSQLContainer = PostgresqlContainer.getInstance();

    private static final int QUESTIONS_COUNT = 25;

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
    void getAllQuestions_isOK() throws Exception {
        List<Question> questions = questionRepository.findAll();
        final byte[] questionsAsBytes = objectMapper.writeValueAsBytes(questions);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/questions")
                        .content(questionsAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        Assertions.assertEquals(QUESTIONS_COUNT,questions.size());

    }

    @Test
    void getAllQuestions_isNotFound() throws Exception {
        List<Question> questions = questionRepository.findAll();
        final byte[] questionsAsBytes = objectMapper.writeValueAsBytes(questions);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/quwwwestions")
                        .content(questionsAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }

    @Test
    void getOneQuestion_isOK() throws Exception {
        List<Question> questions = questionRepository.findAll();

        int min = 0;
        int max = 24;
        int questionNumber = (int) (Math.random()*(max-min+1)+min);
        Question question = questions.get(questionNumber);

        final byte[] questionAsBytes = objectMapper.writeValueAsBytes(question);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/question/{id}",questionNumber)
                        .content(questionAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(questionNumber))
                .andReturn();


    }

    @Test
    void getOneAnswers_isNotFound() throws Exception {
        List<Question> questions = questionRepository.findAll();

        int min = 0;
        int max = 24;
        int questionNumber = (int) (Math.random()*(max-min+1)+min);
        Question question = questions.get(questionNumber);

        final byte[] questionAsBytes = objectMapper.writeValueAsBytes(question);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/quwwwwestion/{id}",questionNumber)
                        .content(questionAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }
}
