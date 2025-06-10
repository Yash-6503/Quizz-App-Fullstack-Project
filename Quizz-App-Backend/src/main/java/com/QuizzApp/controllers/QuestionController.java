package com.QuizzApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.QuizzApp.entities.Questions;
import com.QuizzApp.services.QuestionService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("question")
public class QuestionController {
	
	@Autowired
	private QuestionService service;
	
	// mapping this request to allQuestions end point this will return all questions
	@GetMapping("allQuestions")
	public ResponseEntity<List<Questions>> getAllQuestions() {
		return new ResponseEntity(service.getAllQuestions(), HttpStatus.OK);
	}
	
	
	// mapping this request to {id} end point this will return specific question as per id
	@GetMapping("id/{id}")
	public ResponseEntity<Object> getQuestion(@PathVariable Integer id) {
		ResponseEntity<List<Questions>> opt = service.getQuestionById(id);
		if(opt != null) {
			return new ResponseEntity<>(opt, HttpStatus.OK);
		}
		return new ResponseEntity<>("No Question is available for id : "+id, HttpStatus.OK);
	}
	
	
	// mapping this request to {category} end point this will return specific question as per category
	@GetMapping("category/{category}")
	public ResponseEntity<List<Questions>> getQuestionsByCategory(@PathVariable String category){
		return new ResponseEntity(service.getQuestionsByCategory(category), HttpStatus.OK);
	}
	
	// mapping this request to {addQuestion} end point this will add Question into database.
	@PostMapping("addQuestion")
	public ResponseEntity<String> addQuestion(@RequestBody Questions question) {
		return service.addQuestions(question);
	}
	
	// mapping this request to {id} end point this will delete question based on id.
	@DeleteMapping("delete/{id}")
	public ResponseEntity<String> deleteQuestion(@PathVariable Integer id) {
		return new ResponseEntity(service.deleteQuestionById(id), HttpStatus.OK);
	}
	
}
