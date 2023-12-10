package com.ratatouille23.server.model.dto;

public class DTOPreparazionePiattoOrdinazione {

	private long idPreparazionePiattoOrdinazione;
	private DTOPiatto piatto;
	private long idOrdinazione;
	private int idDipendente;
	private String statoPreparazione;
	private int quantita;
	private String nota;
	
	//Costruttori
	public DTOPreparazionePiattoOrdinazione(long idPreparazionePiattoOrdinazione, DTOPiatto piatto, long idOrdinazione,
			int idDipendente, String statoPreparazione, String nota, int quantita) {
		super();
		this.idPreparazionePiattoOrdinazione = idPreparazionePiattoOrdinazione;
		this.piatto = piatto;
		this.idOrdinazione = idOrdinazione;
		this.idDipendente = idDipendente;
		this.statoPreparazione = statoPreparazione;
		this.nota = nota;
		this.quantita = quantita;
	}
	
	public DTOPreparazionePiattoOrdinazione() {}

	//Getter e Setter
	public long getIdPreparazionePiattoOrdinazione() {
		return idPreparazionePiattoOrdinazione;
	}

	public void setIdPreparazionePiattoOrdinazione(long idPreparazionePiattoOrdinazione) {
		this.idPreparazionePiattoOrdinazione = idPreparazionePiattoOrdinazione;
	}

	public DTOPiatto getPiatto() {
		return piatto;
	}

	public void setPiatto(DTOPiatto piatto) {
		this.piatto = piatto;
	}

	public long getIdOrdinazione() {
		return idOrdinazione;
	}

	public void setIdOrdinazione(long idOrdinazione) {
		this.idOrdinazione = idOrdinazione;
	}

	public int getIdDipendente() {
		return idDipendente;
	}

	public void setIdDipendente(int idDipendente) {
		this.idDipendente = idDipendente;
	}

	public String getStatoPreparazione() {
		return statoPreparazione;
	}

	public void setStatoPreparazione(String statoPreparazione) {
		this.statoPreparazione = statoPreparazione;
	}

	public String getNota() {
		return nota;
	}

	public void setNota(String nota) {
		this.nota = nota;
	}

	public int getQuantita() {
		return quantita;
	}

	public void setQuantita(int quantita) {
		this.quantita = quantita;
	}
	
	
}
