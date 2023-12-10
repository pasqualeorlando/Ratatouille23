package com.ratatouille23.server.model.dto;

public class DTOTavoloLocale {

	private int numeroTavolo;
	private String stato;
	private DTOTavolo tavolo;
	
	//Costruttori
	public DTOTavoloLocale(int numeroTavolo, String stato, int numeroOspiti, DTOTavolo tavolo) {
		super();
		this.numeroTavolo = numeroTavolo;
		this.stato = stato;
		this.tavolo = tavolo;
	}
	
	public DTOTavoloLocale() {}

	//Getter e Setter
	public int getNumeroTavolo() {
		return numeroTavolo;
	}

	public void setNumeroTavolo(int numeroTavolo) {
		this.numeroTavolo = numeroTavolo;
	}

	public String getStato() {
		return stato;
	}

	public void setStato(String stato) {
		this.stato = stato;
	}

	public DTOTavolo getTavolo() {
		return tavolo;
	}

	public void setTavolo(DTOTavolo tavolo) {
		this.tavolo = tavolo;
	}
	
	
}
