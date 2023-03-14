package com.fdiba.ddvl.fdipardy.repository;

import com.fdiba.ddvl.fdipardy.domain.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
