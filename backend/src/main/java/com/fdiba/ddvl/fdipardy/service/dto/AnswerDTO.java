package com.fdiba.ddvl.fdipardy.service.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@Setter
@EqualsAndHashCode
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDTO implements Serializable {

    //added for experiment
    private Long id;

    private String title;
}
