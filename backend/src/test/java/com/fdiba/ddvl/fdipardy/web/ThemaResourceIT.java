package com.fdiba.ddvl.fdipardy.web;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fdiba.ddvl.fdipardy.FdipardyApplication;
import com.fdiba.ddvl.fdipardy.domain.Thema;
import com.fdiba.ddvl.fdipardy.repository.ThemaRepository;
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
class ThemaResourceIT {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private EntityManager entityManager;

    private ObjectMapper objectMapper;

    @Autowired
    private ThemaRepository themaRepository;

    private static final int THEMAS_COUNT = 5;

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
    void getAllThemas_isOK() throws Exception {
        List<Thema> themas = themaRepository.findAll();
        final byte[] themasAsBytes = objectMapper.writeValueAsBytes(themas);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/themas")
                        .content(themasAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        Assertions.assertEquals(THEMAS_COUNT,themas.size());

    }

    @Test
    void getAllThemas_isNotFound() throws Exception {
        List<Thema> themas = themaRepository.findAll();
        final byte[] themasAsBytes = objectMapper.writeValueAsBytes(themas);

        MvcResult result = mockMvc.perform(get("/fdipardy/api/themssssas")
                        .content(themasAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }

    @Test
    void getOneThema_isOK() throws Exception {
        List<Thema> themas = themaRepository.findAll();

        int min = 0;
        int max = 4;
        int themaNumber = (int) (Math.random()*(max-min+1)+min);
        Thema thema = themas.get(themaNumber);

        final byte[] questionAsBytes = objectMapper.writeValueAsBytes(thema);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/thema/{id}",themaNumber)
                        .content(questionAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(themaNumber))
                .andReturn();


    }

    @Test
    void getOneAnswers_isNotFound() throws Exception {
        List<Thema> themas = themaRepository.findAll();

        int min = 0;
        int max = 4;
        int themaNumber = (int) (Math.random()*(max-min+1)+min);
        Thema thema = themas.get(themaNumber);

        final byte[] questionAsBytes = objectMapper.writeValueAsBytes(thema);
        MvcResult result = mockMvc.perform(get("/fdipardy/api/themaaaa/{id}",themaNumber)
                        .content(questionAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();


    }
}
