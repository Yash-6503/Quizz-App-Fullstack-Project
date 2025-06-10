package com.QuizzApp.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.QuizzApp.entities.QuizzWrapper;
import com.QuizzApp.entities.Response;

public interface QuizzService {
	public ResponseEntity<String> createQuizz(String category, int numQ, String title);
	public ResponseEntity<List<QuizzWrapper>> getQuizz(int id);
	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> response);
}
