package com.fdiba.ddvl.fdipardy.service.mapper;

import com.fdiba.ddvl.fdipardy.domain.Question;
import com.fdiba.ddvl.fdipardy.service.dto.QuestionDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionMapper {

    QuestionDTO toDTO(Question question);

    Question toEntity(QuestionDTO questionDTO);
}
