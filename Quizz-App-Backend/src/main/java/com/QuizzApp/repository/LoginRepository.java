package com.QuizzApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.QuizzApp.entities.Login;

public interface LoginRepository extends JpaRepository<Login, Integer> {
	@Query(value = "SELECT * FROM quizz_users q WHERE q.user_name = ?1 AND q.password = ?2", nativeQuery = true)
	public List<Login> Loggedin(String username, String password);
	
//	@Query(value="SELECT CASE WHEN COUNT(*) > 0 THEN TRUE ELSE FALSE END FROM quizz_users q WHERE q.user_name = ?1", nativeQuery=true)
	@Query(value="SELECT COUNT(*) > 0 FROM quizz_users q WHERE q.user_name = ?1", nativeQuery=true)
	public Long isAvailable(String username);
}
