package com.ratatouille23.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ratatouille23.server.auth.AuthenticationRequest;
import com.ratatouille23.server.auth.AuthenticationResponse;
import com.ratatouille23.server.auth.ModifyRequest;
import com.ratatouille23.server.auth.RegisterRequest;
import com.ratatouille23.server.auth.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(path = "api/auth", produces = { "application/json" })
@CrossOrigin
@RequiredArgsConstructor
public class ControllerAutenticazione {

	@Autowired
	private AuthenticationService service;
	
	@PostMapping("/signin")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
		//HttpHeaders responseHeaders = new HttpHeaders();
		AuthenticationResponse auth = service.authenticate(request);
		
		//responseHeaders.add("Set-Cookie", "jwt:" + auth.getToken() + "; Secure; HttpOnly; SameSite=Lax; Max-Age=" + 1 * 24 * 60 * 60);
		
		return ResponseEntity.ok(auth);
	}
	
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.register(request));
	}
	
	@PostMapping("/modify")
	public ResponseEntity<AuthenticationResponse> modify(@RequestBody ModifyRequest request) {
		return ResponseEntity.ok(service.modifyCredentials(request));
	}
}