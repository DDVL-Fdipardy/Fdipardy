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
public class PlayerDTO implements Serializable {

    private Long id;

    private String nickname;

    private Long points;

    private Long highScore;
}
