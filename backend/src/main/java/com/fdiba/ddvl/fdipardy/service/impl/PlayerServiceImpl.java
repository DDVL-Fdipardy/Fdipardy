package com.fdiba.ddvl.fdipardy.service.impl;

import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.repository.PlayerRepository;
import com.fdiba.ddvl.fdipardy.service.PlayerService;
import com.fdiba.ddvl.fdipardy.service.dto.PlayerDTO;
import com.fdiba.ddvl.fdipardy.service.mapper.PlayerMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;

import java.util.List;
import java.util.Optional;

@Service
public class PlayerServiceImpl implements PlayerService {

    @Autowired
    private PlayerMapper playerMapper;

    @Autowired
    private PlayerRepository playerRepository;

    @Override
    public PlayerDTO create(PlayerDTO playerDTO) throws Exception {

        if(playerDTO == null){
            throw new HttpServerErrorException(HttpStatus.NO_CONTENT);
        }
        Player player = playerMapper.toEntity(playerDTO);
        player = playerRepository.save(player); //TODO refactoring
        if(player.getId() != null){
            return playerMapper.toDTO(player);
        }
        throw new HttpServerErrorException(HttpStatus.EXPECTATION_FAILED);
    }

    @Override
    public PlayerDTO update(PlayerDTO playerDTO, Long id) {

        if(playerDTO != null && id != null){
            Player currentPlayer =getById(id);

            Player player = playerMapper.toEntity(playerDTO);
            player.setId(currentPlayer.getId());

            Player updatedPlayer = playerRepository.save(player);
            return playerMapper.toDTO(updatedPlayer);
        }
        throw new HttpServerErrorException(HttpStatus.NOT_MODIFIED);
    }

    @Override
    public Player getById(Long id) {
        if(id != null){
            Optional<Player> player = playerRepository.findById(id);
            return player.orElseThrow(() ->  new HttpServerErrorException(HttpStatus.NO_CONTENT));
        }
        throw new HttpServerErrorException(HttpStatus.NO_CONTENT);
    }

    @Override
    public List<Player> getAll() {
        List<Player> players = playerRepository.findAll();
        return players;
    }

    @Override
    public void delete(Long id) {
        if(id != null && playerRepository.existsById(id)){
            playerRepository.deleteById(id);
        }
        else throw new HttpServerErrorException(HttpStatus.EXPECTATION_FAILED);

    }
}
