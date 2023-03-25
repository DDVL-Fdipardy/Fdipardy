package com.fdiba.ddvl.fdipardy.web.rest;

import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.service.dto.PlayerDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = {"http://localhost:8080","http://localhost:3000"})
@RequestMapping("/fdipardy/api")
public interface PlayerResource {

    @PostMapping("/player")
    ResponseEntity<PlayerDTO> createPlayer(@RequestBody PlayerDTO playerDTO) throws Exception;

    @PutMapping("/player/{id}")
    ResponseEntity<PlayerDTO> updatePlayer(@RequestBody PlayerDTO playerDTO, @PathVariable Long id);

    @GetMapping("/player/{id}")
    Player getPlayerById(@PathVariable Long id);

    @GetMapping("/players")
    List<Player> getAllPlayers();

    @DeleteMapping("/player/{id}")
    ResponseEntity<Void> deletePlayer(@PathVariable Long id);


}
