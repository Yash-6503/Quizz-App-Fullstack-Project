package com.QuizzApp.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.QuizzApp.entities.Login;
import com.QuizzApp.services.LoginService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("auth")
public class LoginController {
	
	@Autowired
	private LoginService loginService;
	
	@PostMapping("login")
	public ResponseEntity<List<Login>> getLogin(@RequestParam String username, @RequestParam String password) {
		return loginService.Login(username, password);
	}
	
	@PostMapping("register")
	public ResponseEntity<String> getRegister(@RequestBody Login list) {
		return loginService.Register(list);
	}
	
	@GetMapping("allUsers")
	public ResponseEntity<List<Login>> getUsers(){
		return loginService.getAllUsers();
	}
	
	@GetMapping("id/{id}")
	public ResponseEntity<Login> getUser(@PathVariable Integer id){
		return loginService.getUserById(id);
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Integer id){
		return loginService.deleteUserById(id);
	}
	
}
