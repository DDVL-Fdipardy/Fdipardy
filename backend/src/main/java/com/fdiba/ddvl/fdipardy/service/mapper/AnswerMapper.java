package com.fdiba.ddvl.fdipardy.service.mapper;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import com.fdiba.ddvl.fdipardy.service.dto.AnswerDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface AnswerMapper {

    AnswerDTO toDTO(Answer answer);

    Answer toEntity(AnswerDTO answerDTO);
}
