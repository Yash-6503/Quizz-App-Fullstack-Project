package com.QuizzApp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.QuizzApp.entities.Quizz;

public interface QuizzRepository extends JpaRepository<Quizz, Integer> {

}
