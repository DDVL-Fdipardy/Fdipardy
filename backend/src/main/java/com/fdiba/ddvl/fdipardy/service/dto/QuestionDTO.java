package com.fdiba.ddvl.fdipardy.service.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fdiba.ddvl.fdipardy.domain.Thema;
import lombok.Builder;

import java.io.Serializable;
import java.util.Objects;

@Builder
public class QuestionDTO implements Serializable {

    private Long id;

    private String title;

    private Long points;

    private Long themaId;

    private Long answerId;

    public QuestionDTO(Long id, String title, Long points, Long themaId, Long answerId) {
        this.id = id;
        this.title = title;
        this.points = points;
        this.themaId = themaId;
        this.answerId=answerId;
    }

    public QuestionDTO() {
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

    public Long getPoints() {
        return points;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public Long getThemaId() {
        return themaId;
    }

    public void setThemaId(Long themaId) {
        this.themaId = themaId;
    }

    public Long getAnswerId() {
        return answerId;
    }

    public void setAnswerId(Long answerId) {
        this.answerId = answerId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        QuestionDTO that = (QuestionDTO) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "QuestionDTO{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", points=" + points +
                ", themaId=" + themaId +
                ", answerId=" + answerId +
                '}';
    }
}
