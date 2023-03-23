package com.fdiba.ddvl.fdipardy.web.rest;

import com.fdiba.ddvl.fdipardy.domain.Thema;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping("/fdipardy/api")
public interface ThemaResource {

    @GetMapping("/thema/{id}")
    Thema getThemaById(@PathVariable Long id);

    @GetMapping("/themas")
    List<Thema> getAllThemas();
}
