package com.fdiba.ddvl.fdipardy.domain;

import lombok.Builder;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "answer")
@Builder
public class Answer {

    @Id
    @GeneratedValue(generator = "answer_sequence_generator")
    @SequenceGenerator(name = "answer_sequence_generator", initialValue = 1000, allocationSize = 1)
    private Long id;

    @Column
    private String title;

    //constructor with all parameters:
    public Answer(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    //constructor with no parameters:
    public Answer(){

    }

    //setters:
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    //getters:
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    //hashCode() and equals()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Answer answer = (Answer) o;
        return Objects.equals(id, answer.id);
    }

    //toString()
    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}

