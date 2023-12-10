package com.ratatouille23.server.auth;

import com.ratatouille23.server.model.dto.DTODipendente;

public class AuthenticationResponse {

	private String token;
	private DTODipendente dipendente;

	//Costruttori
	public AuthenticationResponse(String token, DTODipendente dtoDipendente) {
		super();
		this.token = token;
		this.dipendente = dtoDipendente;
	}
	
	public AuthenticationResponse() {}

	//Getter e Setter
	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}
	
	public DTODipendente getDipendente() {
		return dipendente;
	}

	public void setDipendente(DTODipendente dipendente) {
		this.dipendente = dipendente;
	}
}
