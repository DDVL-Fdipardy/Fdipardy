package com.fdiba.ddvl.fdipardy.service.dto;

import lombok.Builder;

import java.io.Serializable;
import java.util.Objects;

@Builder
public class PlayerDTO implements Serializable {

    private Long id;

    private String nickname;

    private Long points;

    private Long highScore;

    public PlayerDTO(Long id, String nickname, Long points, Long highScore) {
        this.id = id;
        this.nickname = nickname;
        this.points = points;
        this.highScore = highScore;
    }

    public PlayerDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public Long getPoints() {
        return points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public Long getHighScore() {
        return highScore;
    }

    public void setHighScore(Long highScore) {
        this.highScore = highScore;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerDTO playerDTO = (PlayerDTO) o;
        return Objects.equals(id, playerDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "PlayerDTO{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", points=" + points +
                ", highScore=" + highScore +
                '}';
    }
}
