package com.fdiba.ddvl.fdipardy.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "player")
public class Player {
    @Id
    @GeneratedValue(generator = "player_sequence_generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "player_sequence_generator", initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column
    private String nickname;

    @Column
    private Long points;

    @Column
    private Long highScore;

    //constructor with all arguments:
    public Player(Long id, String nickname, Long points, Long highScore) {
        this.id = id;
        this.nickname = nickname;
        this.points = points;
        this.highScore = highScore;
    }

    //constructor with no arguments:
    public Player(){

    }

    //setters:
    public void setId(Long id) {
        this.id = id;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public void setHighScore(Long highScore) {
        this.highScore = highScore;
    }

    //getter:
    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public Long getPoints() {
        return points;
    }

    public Long getHighScore() {
        return highScore;
    }

    //hashCode() and equals()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return id.equals(player.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //toString()
    @Override
    public String toString() {
        return "Player{" +
                "id=" + id +
                ", nickname='" + nickname + '\'' +
                ", points=" + points +
                ", highScore=" + highScore +
                '}';
    }
}
