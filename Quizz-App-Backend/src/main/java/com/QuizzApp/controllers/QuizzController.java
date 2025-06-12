package com.QuizzApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.QuizzApp.entities.QuizzWrapper;
import com.QuizzApp.entities.Response;
import com.QuizzApp.services.QuizzService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("quizz")
public class QuizzController {
	
	@Autowired
	private QuizzService qService;
	
	@PostMapping("create")
	public ResponseEntity<String> createQuizz(@RequestParam String category, @RequestParam int numQ, @RequestParam String title) {
		return qService.createQuizz(category, numQ, title);
	}
	
	
	@GetMapping("get/{id}")
	public ResponseEntity<List<QuizzWrapper>> getQuizz(@PathVariable int id){
		return qService.getQuizz(id);
	}
	
	@GetMapping("getQuizzes")
	public ResponseEntity<List<QuizzWrapper>> getAllQuizzes(){
		return qService.getAllQuizzes();
	}
	
	@PostMapping("submit/{id}")
	public ResponseEntity<Integer> getResult(@PathVariable Integer id, @RequestBody List<Response> response){
		return qService.calculateResult(id, response);
	}
}
