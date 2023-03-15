package com.fdiba.ddvl.fdipardy.service.mapper;

import com.fdiba.ddvl.fdipardy.domain.Player;
import com.fdiba.ddvl.fdipardy.service.dto.PlayerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface PlayerMapper {

    PlayerDTO toDTO(Player player);

    Player toEntity(PlayerDTO playerDTO);
}
