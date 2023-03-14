package com.fdiba.ddvl.fdipardy.repository;

import com.fdiba.ddvl.fdipardy.domain.Thema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThemaRepository extends JpaRepository<Thema, Long> {
}
