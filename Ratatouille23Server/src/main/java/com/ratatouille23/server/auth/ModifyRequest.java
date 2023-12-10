package com.ratatouille23.server.auth;

public class ModifyRequest {

	private String vecchiaEmail;
	private String nuovaEmail;
	private String vecchiaPassword;
	private String nuovaPassword;
	
	//Costruttori
	public ModifyRequest(String vecchiaEmail, String nuovaEmail, String vecchiaPassword, String nuovaPassword) {
		super();
		this.vecchiaEmail = vecchiaEmail;
		this.nuovaEmail = nuovaEmail;
		this.vecchiaPassword = vecchiaPassword;
		this.nuovaPassword = nuovaPassword;
	}
	
	public ModifyRequest() {}
	
	//Getter e Setter
	public String getVecchiaEmail() {
		return vecchiaEmail;
	}

	public void setVecchiaEmail(String vecchiaEmail) {
		this.vecchiaEmail = vecchiaEmail;
	}

	public String getNuovaEmail() {
		return nuovaEmail;
	}

	public void setNuovaEmail(String nuovaEmail) {
		this.nuovaEmail = nuovaEmail;
	}

	public String getVecchiaPassword() {
		return vecchiaPassword;
	}

	public void setVecchiaPassword(String vecchiaPassword) {
		this.vecchiaPassword = vecchiaPassword;
	}

	public String getNuovaPassword() {
		return nuovaPassword;
	}

	public void setNuovaPassword(String nuovaPassword) {
		this.nuovaPassword = nuovaPassword;
	}
	
}