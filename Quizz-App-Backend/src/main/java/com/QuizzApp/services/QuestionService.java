package com.QuizzApp.services;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

import com.QuizzApp.entities.Questions;

public interface QuestionService {
	public ResponseEntity<List<Questions>> getAllQuestions();
	public ResponseEntity<List<Questions>> getQuestionById(Integer id);
	public ResponseEntity<List<Questions>> getQuestionsByCategory(String category);
	public ResponseEntity<String> addQuestions(Questions questions);
	public ResponseEntity<String> deleteQuestionById(Integer id);
}
