package com.fdiba.ddvl.fdipardy.service;

import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.service.dto.PlayerDTO;

import java.util.List;

public interface PlayerService {

    PlayerDTO create(PlayerDTO playerDTO) throws Exception;

    PlayerDTO update(PlayerDTO playerDTO, Long id);

    Player getById(Long id);

    List<Player> getAll();

    void delete(Long id);
}
