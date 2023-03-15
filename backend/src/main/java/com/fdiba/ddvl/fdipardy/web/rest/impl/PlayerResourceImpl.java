package com.fdiba.ddvl.fdipardy.web.rest.impl;

import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.service.PlayerService;
import com.fdiba.ddvl.fdipardy.service.dto.PlayerDTO;
import com.fdiba.ddvl.fdipardy.web.rest.PlayerResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlayerResourceImpl implements PlayerResource {

    private PlayerService playerService;

    public PlayerResourceImpl(PlayerService playerService) {
        this.playerService = playerService;
    }

    @Override
    public ResponseEntity<PlayerDTO> createPlayer(PlayerDTO playerDTO) throws Exception {
        PlayerDTO createdPlayer = playerService.create(playerDTO);
        return ResponseEntity.ok().body(createdPlayer);
    }

    @Override
    public ResponseEntity<PlayerDTO> updatePlayer(PlayerDTO playerDTO, Long id) {
        PlayerDTO updatedPlayer = playerService.update(playerDTO,id);
        return ResponseEntity.ok().body(updatedPlayer);
    }

    @Override
    public Player getPlayerById(Long id) {
        return playerService.getById(id);
    }

    @Override
    public List<Player> getAllPlayers() {
        return playerService.getAll();
    }

    @Override
    public ResponseEntity<Void> deletePlayer(Long id) {
        playerService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
