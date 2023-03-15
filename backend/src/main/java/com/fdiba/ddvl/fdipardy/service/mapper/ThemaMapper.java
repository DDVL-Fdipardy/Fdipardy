package com.fdiba.ddvl.fdipardy.service.mapper;

import com.fdiba.ddvl.fdipardy.domain.Thema;
import com.fdiba.ddvl.fdipardy.service.dto.ThemaDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ThemaMapper {

    ThemaDTO toDTO(Thema thema);

    Thema toEntity(ThemaDTO themaDTO);
}
