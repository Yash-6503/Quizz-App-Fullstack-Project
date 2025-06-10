package com.QuizzApp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.QuizzApp.entities.Questions;

public interface QuestionRepository extends JpaRepository<Questions, Integer>
{
	//we can also use custom query method to find by category
//	@Query(value="SELECT * FROM quizz_questions WHERE category=?1", nativeQuery=true)
//	public List<Questions> getQuestionsByCategory(String category);
	
	// here we can also use predefined queries using findBy 
	public List<Questions> findByCategory(String category);
	
	@Query(value = "SELECT * FROM quizz_questions q WHERE q.category = :category ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
	List<Questions> findQuestionsByCategory(@Param("category") String category, @Param("numQ") Integer numQ);

}
