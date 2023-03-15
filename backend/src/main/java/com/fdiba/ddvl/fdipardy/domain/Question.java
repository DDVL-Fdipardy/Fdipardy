package com.fdiba.ddvl.fdipardy.domain;

import lombok.Builder;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "question")
@Builder
public class Question {

    @Id
    @GeneratedValue(generator = "question_sequence_generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "question_sequence_generator", initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column
    private String title;

    @Column
    private Long points;

    @ManyToOne
    @JoinColumn(nullable = false)
    private Thema thema;


    //constructor with all arguments:
    public Question(Long id, String title, Long points, Thema thema) {
        this.id = id;
        this.title = title;
        this.points = points;
        this.thema = thema;
    }

    //constructor with no arguments:
    public Question() {
    }

    //getters:
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public Long getPoints() {
        return points;
    }

    //setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    //hashCode() and equals()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Question question = (Question) o;
        return Objects.equals(id, question.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //toString()
    @Override
    public String toString() {
        return "Question{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", points=" + points +
                '}';
    }
}
