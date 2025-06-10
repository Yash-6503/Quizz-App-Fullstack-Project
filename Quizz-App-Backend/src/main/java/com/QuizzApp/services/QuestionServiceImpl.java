package com.QuizzApp.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.QuizzApp.entities.Questions;
import com.QuizzApp.repository.QuestionRepository;

@Service
public class QuestionServiceImpl implements QuestionService  {
	
	@Autowired
	private QuestionRepository questionRepo;

	@Override
	public ResponseEntity<List<Questions>> getAllQuestions() {
		List<Questions> list = questionRepo.findAll();
		try {
			return new ResponseEntity<>(list, HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@Override
	public ResponseEntity<List<Questions>> getQuestionById(Integer id) {
		try {
			return new ResponseEntity(questionRepo.findById(id), HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@Override
	public ResponseEntity<List<Questions>> getQuestionsByCategory(String category){ 
		try {
			return new ResponseEntity<>(questionRepo.findByCategory(category), HttpStatus.OK);
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
	}

	@Override
	public ResponseEntity<String> addQuestions(Questions questions) {
			int id = questionRepo.save(questions).getQuestion_id();
			String msg = "Question with Id : "+id+" added successfully....";
			return new ResponseEntity<>(msg, HttpStatus.OK);
	}
	

	@Override
	public ResponseEntity<String> deleteQuestionById(Integer id) {
		try {
			if(questionRepo.existsById(id)) {
				questionRepo.deleteById(id);
				return new ResponseEntity<>("Question with Id : "+id+" Deleted successfully....", HttpStatus.OK);
			}
			return new ResponseEntity<>("Question with Id : "+id+" not Found to Delete...", HttpStatus.OK);
			
		}catch(Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(new String(), HttpStatus.BAD_REQUEST);
	}

}
