package com.QuizzApp.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.QuizzApp.commons.CommonMethods;
import com.QuizzApp.entities.Login;
import com.QuizzApp.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService {

	@Autowired
	private LoginRepository loginRepo;
	
	private CommonMethods cmn = new CommonMethods();
	
	@Override
	public ResponseEntity<List<Login>> Login(String username, String password) {
		return new ResponseEntity<>(loginRepo.Loggedin(username, password), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<String> Register(Login list) {
		Long count = loginRepo.isAvailable(list.getUserName());
	    boolean exists = count > 0;
		if(exists) {
			return new ResponseEntity<String>("User already exists....", HttpStatus.OK);			
		}else if(cmn.isNull(list)){
			return new ResponseEntity<String>("User not registered due to fields are empty/null....", HttpStatus.BAD_REQUEST);						
		}else {
			loginRepo.save(list);
			return new ResponseEntity<String>("User registered successfully....", HttpStatus.OK);
		}
	}

	@Override
	public ResponseEntity<List<com.QuizzApp.entities.Login>> getAllUsers() {
		return new ResponseEntity<List<Login>>(loginRepo.findAll(), HttpStatus.OK);
	}

	@Override
	public ResponseEntity<com.QuizzApp.entities.Login> getUserById(Integer id) {
		if(loginRepo.existsById(id)) {
			return new ResponseEntity(loginRepo.findById(id), HttpStatus.OK);
		}else {
			return new ResponseEntity("User not Found", HttpStatus.BAD_REQUEST);
		}
	}

	@Override
	public ResponseEntity<String> deleteUserById(Integer id) {
		if(loginRepo.existsById(id)) {
			loginRepo.deleteById(id);
			return new ResponseEntity<String>("User with Id : "+id+" deleted successfully....", HttpStatus.OK);
		}
		return new ResponseEntity<String>("User with Id : "+id+" not Found....", HttpStatus.BAD_REQUEST);
	}

}
