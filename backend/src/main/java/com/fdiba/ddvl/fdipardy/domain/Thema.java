package com.fdiba.ddvl.fdipardy.domain;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "thema")
public class Thema {
    @Id
    @GeneratedValue(generator = "thema_sequence_generator", strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "thema_sequence_generator", initialValue = 1000, allocationSize = 1)
    private Long id;

    @NotNull
    @Column
    private String title;

    @OneToMany(mappedBy = "thema", fetch = FetchType.EAGER)
    private List<Question> questions;

    //constructor with all arguments:
    public Thema(Long id, String title, List<Question> questions) {
        this.id = id;
        this.title = title;
//        this.questions = questions;
    }


    //constructor with no arguments:
    public Thema(){

    }

    //setters:
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setQuestions(List<Question> questions) {
        this.questions = questions;
    }

    //getters:
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    //hashcode() and equals()
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Thema thema = (Thema) o;
        return Objects.equals(id, thema.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    //toString()
    @Override
    public String toString() {
        return "Thema{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", questions=" + questions +
                '}';
    }
}
