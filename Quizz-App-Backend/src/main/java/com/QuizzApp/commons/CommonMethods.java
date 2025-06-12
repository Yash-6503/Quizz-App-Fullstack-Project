package com.QuizzApp.commons;

import java.util.List;

import com.QuizzApp.entities.Login;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
public class CommonMethods {
	
	public Boolean isNull(Login list) {
		if((list.getUserName() == null) || (list.getPassword() == null) || (list.getEmail() == null) || (list.getPhoneNo() == null)) {
			return true;
		}else if((list.getUserName().isEmpty()) || (list.getPassword().isEmpty()) || (list.getEmail().isEmpty())) {
			return true;
		}
		return false;
	}
}
