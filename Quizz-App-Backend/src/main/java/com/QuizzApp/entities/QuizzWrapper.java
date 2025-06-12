package com.QuizzApp.entities;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QuizzWrapper {

	private Integer id;
	private String questionTitle;
	private String category;
	private LocalDate date;
	private String option1;
	private String option2;
	private String option3;
	private String option4;
	
}
