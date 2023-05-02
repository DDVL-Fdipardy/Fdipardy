package com.fdiba.ddvl.fdipardy.web;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fdiba.ddvl.fdipardy.FdipardyApplication;
import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.repository.PlayerRepository;
import com.fdiba.ddvl.fdipardy.service.mapper.PlayerMapper;
import org.junit.jupiter.api.AfterEach;
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
import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = FdipardyApplication.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class PlayerResourceIT {

    @Autowired
    private WebApplicationContext webApplicationContext;

    private MockMvc mockMvc;

    @Autowired
    private EntityManager entityManager;

    private ObjectMapper objectMapper;

    @Autowired
    private PlayerRepository playerRepository;

    @Autowired
    private PlayerMapper playerMapper;

    private static final String DEFAULT_NICKNAME = "AAAAAA";
    private static final String UPDATED_NICKNAME = "BBBBBB";

    private static final Long DEFAULT_POINTS = 0L;
    private static final Long UPDATED_POINTS = 1L;

    private static final Long DEFAULT_HIGHSCORE = 100L;
    private static final Long UPDATED_HIGHSCORE = 200L;

    public static Player createEntity(EntityManager entityManager){
        Player player = new Player();
        player.setNickname(DEFAULT_NICKNAME);
        player.setPoints(DEFAULT_POINTS);
        player.setHighScore(DEFAULT_HIGHSCORE);

        return player;
    }

    @BeforeEach
    void setup(){
        this.mockMvc = MockMvcBuilders
                .webAppContextSetup(this.webApplicationContext)
                .build();

        objectMapper = new ObjectMapper()
                .registerModule(new JavaTimeModule())
                .configure(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS, true)
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,false);

        for(int i = 0; i <2; i++){
            List<Player> players = new ArrayList<>();

            Player player = createEntity(entityManager);
            players.add(player);
            playerRepository.save(player);
        }
    }

    @AfterEach
    void afterEach(){
        playerRepository.deleteAll();
    }

    @Test
    void createPlayer_isStatusOk() throws Exception {
        Player player = createEntity(entityManager);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(post("/fdipardy/api/player")
                .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isOk()).andReturn();

        Assertions.assertEquals(DEFAULT_NICKNAME, player.getNickname());
        Assertions.assertEquals(DEFAULT_POINTS,player.getPoints());
        Assertions.assertEquals(DEFAULT_HIGHSCORE,player.getHighScore());
    }

    @Test
    void createPlayer_isStatusNotFound() throws Exception {
        Player player = createEntity(entityManager);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(post("/fdipardy/api/plaaayer")
                        .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isNotFound()).andReturn();
    }

    @Test
    void createPlayer_StatusIsMethodNotAllowed() throws Exception {
        Player player = createEntity(entityManager);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(put("/fdipardy/api/player")
                        .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isMethodNotAllowed()).andReturn();
    }

    @Test
    void updatePlayer_isStatusOk() throws Exception {
        Player player = createEntity(entityManager);
        playerRepository.save(player);

        player.setNickname(UPDATED_NICKNAME);
        player.setPoints(UPDATED_POINTS);
        player.setHighScore(UPDATED_HIGHSCORE);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(put("/fdipardy/api/player/{id}", player.getId())
                        .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        Assertions.assertEquals(UPDATED_NICKNAME, player.getNickname());
        Assertions.assertEquals(UPDATED_POINTS,player.getPoints());
        Assertions.assertEquals(UPDATED_HIGHSCORE,player.getHighScore());
    }

    @Test
    void updatePlayer_isStatusNotFound() throws Exception {
        Player player = createEntity(entityManager);
        playerRepository.save(player);

        player.setNickname(UPDATED_NICKNAME);
        player.setPoints(UPDATED_POINTS);
        player.setHighScore(UPDATED_HIGHSCORE);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(put("/fdipardy/api/plaaaaayer/{id}", player.getId())
                        .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isNotFound())
                .andReturn();

        Assertions.assertEquals(UPDATED_NICKNAME, player.getNickname());
        Assertions.assertEquals(UPDATED_POINTS,player.getPoints());
        Assertions.assertEquals(UPDATED_HIGHSCORE,player.getHighScore());
    }

    @Test
    void updatePlayer_isMethodNotAllowed() throws Exception {
        Player player = createEntity(entityManager);
        playerRepository.save(player);

        player.setNickname(UPDATED_NICKNAME);
        player.setPoints(UPDATED_POINTS);
        player.setHighScore(UPDATED_HIGHSCORE);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);

        MvcResult result = mockMvc.perform(post("/fdipardy/api/player/{id}", player.getId())
                        .content(playerAsBytes).contentType("application/json"))
                .andExpect(status().isMethodNotAllowed())
                .andReturn();

        Assertions.assertEquals(UPDATED_NICKNAME, player.getNickname());
        Assertions.assertEquals(UPDATED_POINTS,player.getPoints());
        Assertions.assertEquals(UPDATED_HIGHSCORE,player.getHighScore());
    }

    @Test
    void getAllPlayers_isOK() throws Exception {
        List<Player> players = playerRepository.findAll();
        final byte[] playersAsBytes = objectMapper.writeValueAsBytes(players);


        MvcResult result = mockMvc.perform(get("/fdipardy/api/players")
                        .content(playersAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();
    }

    @Test
    void getAllPlayers_isMethodNotAllowed() throws Exception {
        List<Player> players = playerRepository.findAll();
        final byte[] playersAsBytes = objectMapper.writeValueAsBytes(players);


        MvcResult result = mockMvc.perform(patch("/fdipardy/api/players")
                        .content(playersAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isMethodNotAllowed())
                .andReturn();
    }

    @Test
    void getOnePlayer_isOk() throws Exception {
        List<Player> players = playerRepository.findAll();
        Player player = players.get(0);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);


        MvcResult result = mockMvc.perform(get("/fdipardy/api/player/{id}",player.getId())
                        .content(playerAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andReturn();

        Assertions.assertEquals(DEFAULT_NICKNAME, player.getNickname());
        Assertions.assertEquals(DEFAULT_POINTS,player.getPoints());
        Assertions.assertEquals(DEFAULT_HIGHSCORE,player.getHighScore());
    }

    @Test
    void getOnePlayer_isMethodNotAllowed() throws Exception {
        List<Player> players = playerRepository.findAll();
        Player player = players.get(0);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);


        MvcResult result = mockMvc.perform(patch("/fdipardy/api/player/{id}",Long.MAX_VALUE)
                        .content(playerAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isMethodNotAllowed())
                .andReturn();
    }

    @Test
    void deletePlayer_isMethodNotAllowed() throws Exception {
        List<Player> players = playerRepository.findAll();
        Player player = players.get(0);
        final byte[] playerAsBytes = objectMapper.writeValueAsBytes(player);


        MvcResult result = mockMvc.perform(delete("/fdipardy/api/player/{id}",player.getId())
                        .content(playerAsBytes)
                        .contentType("application/json"))
                .andExpect(status().isNoContent())
                .andReturn();
    }
}

