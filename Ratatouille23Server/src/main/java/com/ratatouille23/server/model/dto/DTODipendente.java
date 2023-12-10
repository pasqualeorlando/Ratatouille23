package com.ratatouille23.server.model.dto;

public class DTODipendente {

	private int idDipendente;
	private String nome;
	private String cognome;
	private String email;
	private String password;
	private String ruolo;
	private boolean primoAccesso;
	
	//Costruttori
	public DTODipendente(int idDipendente, String nome, String cognome, String email, String password, String ruolo, boolean primoAccesso) {
		super();
		this.idDipendente = idDipendente;
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;
		this.ruolo = ruolo;
		this.primoAccesso = primoAccesso;
	}

	public DTODipendente() {}

	//Getter e Setter
	public int getIdDipendente() {
		return idDipendente;
	}

	public void setIdDipendente(int idDipendente) {
		this.idDipendente = idDipendente;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCognome() {
		return cognome;
	}

	public void setCognome(String cognome) {
		this.cognome = cognome;
	}

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

	public String getRuolo() {
		return ruolo;
	}

	public void setRuolo(String ruolo) {
		this.ruolo = ruolo;
	}

	public boolean isPrimoAccesso() {
		return primoAccesso;
	}

	public void setPrimoAccesso(boolean primoAccesso) {
		this.primoAccesso = primoAccesso;
	}
	
}
