package com.fdiba.ddvl.fdipardy.service.dto;

import lombok.Builder;

import java.io.Serializable;
import java.util.Objects;

@Builder
public class AnswerDTO implements Serializable {

    private Long id;

    private String title;

    public AnswerDTO(Long id, String title) {
        this.id = id;
        this.title = title;
    }

    public AnswerDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AnswerDTO answerDTO = (AnswerDTO) o;
        return id.equals(answerDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "AnswerDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                '}';
    }
}
