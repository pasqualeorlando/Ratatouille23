package com.ratatouille23.server.model.dto;

import java.time.LocalDateTime;
import java.util.List;

public class DTOOrdinazione {

	private long idOrdinazione;
	private LocalDateTime orarioOrdinazione;
	private int idDipendente;
	private long idTavolo;
	
	//Costruttori
	public DTOOrdinazione(long idOrdinazione, LocalDateTime orarioOrdinazione, int idDipendente, List<Long> idPreparazioni, long idTavolo) {
		super();
		this.idOrdinazione = idOrdinazione;
		this.orarioOrdinazione = orarioOrdinazione;
		this.idDipendente = idDipendente;
		this.idTavolo = idTavolo;
	}
	
	public DTOOrdinazione() {}

	//Getter e Setter
	public long getIdOrdinazione() {
		return idOrdinazione;
	}

	public void setIdOrdinazione(long idOrdinazione) {
		this.idOrdinazione = idOrdinazione;
	}

	public LocalDateTime getOrarioOrdinazione() {
		return orarioOrdinazione;
	}

	public void setOrarioOrdinazione(LocalDateTime orarioOrdinazione) {
		this.orarioOrdinazione = orarioOrdinazione;
	}

	public int getIdDipendente() {
		return idDipendente;
	}

	public void setIdDipendente(int idDipendente) {
		this.idDipendente = idDipendente;
	}

	public long getIdTavolo() {
		return idTavolo;
	}

	public void setIdTavolo(long idTavolo) {
		this.idTavolo = idTavolo;
	}
}
