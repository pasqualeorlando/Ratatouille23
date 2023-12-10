package com.ratatouille23.server.model.dto;

public class DTOTavolo {
	
	private long idTavolo;
	private int numeroTavolo;
	private int numeroOspiti;
	
	//Costruttori
	public DTOTavolo(long idTavolo, int numeroTavolo, int numeroOspiti) {
		super();
		this.idTavolo = idTavolo;
		this.numeroTavolo = numeroTavolo;
		this.numeroOspiti = numeroOspiti;
	}
	
	public DTOTavolo() {}

	//Getter e Setter
	public long getIdTavolo() {
		return idTavolo;
	}

	public void setIdTavolo(long idTavolo) {
		this.idTavolo = idTavolo;
	}

	public int getNumeroTavolo() {
		return numeroTavolo;
	}

	public void setNumeroTavolo(int numeroTavolo) {
		this.numeroTavolo = numeroTavolo;
	}

	public int getNumeroOspiti() {
		return numeroOspiti;
	}

	public void setNumeroOspiti(int numeroOspiti) {
		this.numeroOspiti = numeroOspiti;
	}
}
