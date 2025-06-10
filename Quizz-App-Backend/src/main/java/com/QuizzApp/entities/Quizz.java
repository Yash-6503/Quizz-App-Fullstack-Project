package com.QuizzApp.entities;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Quizz {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer quizz_id;
	private String title;
	
	@ManyToMany
	 @JoinTable(
		        name = "quizz_questions_mapping",
		        joinColumns = @JoinColumn(name = "quizz_id"),
		        inverseJoinColumns = @JoinColumn(name = "question_id")
		    )
	private List<Questions> questions;
	
}
