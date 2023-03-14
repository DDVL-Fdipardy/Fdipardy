package com.fdiba.ddvl.fdipardy.repository;

import com.fdiba.ddvl.fdipardy.domain.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlayerRepository extends JpaRepository<Player, Long> {
}
