package com.QuizzApp.services;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.QuizzApp.entities.Questions;
import com.QuizzApp.entities.Quizz;
import com.QuizzApp.entities.QuizzWrapper;
import com.QuizzApp.entities.Response;
import com.QuizzApp.repository.QuestionRepository;
import com.QuizzApp.repository.QuizzRepository;

@Service
public class QuizzServiceImpl implements QuizzService {
	
	@Autowired
	private QuizzRepository quizzRepo;

	@Autowired
	private QuestionRepository questionRepo;
	
	// This method is used to create a quizz
	@Override
	public ResponseEntity<String> createQuizz(String category, int numQ, String title) {
		List<Questions> list = questionRepo.findQuestionsByCategory(category, numQ);
		Quizz quiz = new Quizz();
		quiz.setTitle(title);
		quiz.setQuestions(list);
		quizzRepo.save(quiz);
		return new ResponseEntity<>("Quizz created successfully....", HttpStatus.CREATED);
	}

	// This method is used to get a quizz
	@Override
	public ResponseEntity<List<QuizzWrapper>> getQuizz(int id) {
		Optional<Quizz> quiz = quizzRepo.findById(id);
		
		if(quiz.isPresent()) {		
			List<Questions> questionsFormDB = quiz.get().getQuestions();
			List<QuizzWrapper> questionsForUser = new ArrayList<>();
			
			for(Questions q : questionsFormDB) {
				QuizzWrapper qw = new QuizzWrapper(q.getQuestion_id(), q.getQuestionTitle(), q.getOption1(), q.getOption2(), q.getOption3(), q.getOption4());
				questionsForUser.add(qw);
			}
			
			return new ResponseEntity<>(questionsForUser, HttpStatus.OK);
		}
		
		return new ResponseEntity("No Quizz Available...", HttpStatus.BAD_REQUEST);		
	}

	
	// This method is used to get a quizz result
	@Override
	public ResponseEntity<Integer> calculateResult(Integer id, List<Response> responses) {
	    Optional<Quizz> quizOpt = quizzRepo.findById(id);
	    if (quizOpt.isEmpty()) {
	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	    }

	    Quizz quiz = quizOpt.get();
	    List<Questions> questions = quiz.getQuestions();

	    // Map: question_id -> correctAnswer
	    Map<Integer, String> correctAnswersMap = new HashMap<>();
	    for (Questions q : questions) {
	        correctAnswersMap.put(q.getQuestion_id(), q.getRightAnswer());
	    }

	    int correctCount = 0;
	    for (Response res : responses) {
	        String correctAnswer = correctAnswersMap.get(res.getId()); // res.getId() refers to question_id
	        if (correctAnswer != null && correctAnswer.equalsIgnoreCase(res.getResponse())) {
	            correctCount++;
	        }
	    }

	    return new ResponseEntity<>(correctCount+1, HttpStatus.OK);
	}


}
