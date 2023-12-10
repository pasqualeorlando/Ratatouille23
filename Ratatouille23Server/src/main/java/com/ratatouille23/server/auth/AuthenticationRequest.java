package com.ratatouille23.server.auth;

public class AuthenticationRequest {

	private String email;
	private String password;
  
	//Costruttori
	public AuthenticationRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}
  
	public AuthenticationRequest() {}

	//Getter e Setter
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
  
}