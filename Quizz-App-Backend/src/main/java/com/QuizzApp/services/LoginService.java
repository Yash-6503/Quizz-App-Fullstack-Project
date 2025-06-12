package com.QuizzApp.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.QuizzApp.entities.Login;

public interface LoginService {
	public ResponseEntity<List<Login>> Login(String username, String password);
	public ResponseEntity<String> Register(Login list);
	public ResponseEntity<List<Login>> getAllUsers();
	public ResponseEntity<Login> getUserById(Integer id);
	public ResponseEntity<String> deleteUserById(Integer id);	
}
