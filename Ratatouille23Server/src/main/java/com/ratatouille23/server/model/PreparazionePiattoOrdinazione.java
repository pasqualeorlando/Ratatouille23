package com.ratatouille23.server.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="preparazionepiattiordinazioni")
public class PreparazionePiattoOrdinazione implements Serializable{

	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idpreparazionepiattoordinazione")
	private long idPreparazionePiattoOrdinazione;
	
	@Column(name="statopreparazione")
	private String statoPreparazione;
	
	@Column(name="quantita")
	private int quantita;
	
	@Column(name="nota")
	private String nota;
	
	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.MERGE)
	@JoinColumn(name="idpiatto", nullable=false)
	private Piatto piatto;
	
	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="idordinazione", nullable=false)
	private Ordinazione ordinazione;
	
	@JsonBackReference
	@ManyToOne(fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name="iddipendente", nullable=true)
    private Dipendente dipendente;

	//Costruttori
	public PreparazionePiattoOrdinazione(long idPreparazionePiattoOrdinazione, String statoPreparazione, Piatto piatto, Ordinazione ordinazione,
			Dipendente dipendente, String nota) {
		super();
		this.idPreparazionePiattoOrdinazione = idPreparazionePiattoOrdinazione;
		this.statoPreparazione = statoPreparazione;
		this.piatto = piatto;
		this.ordinazione = ordinazione;
		this.dipendente = dipendente;
		this.nota = nota;
	}
	
	public PreparazionePiattoOrdinazione() {}

	//Getter e Setter
	public String getStatoPreparazione() {
		return statoPreparazione;
	}

	public void setStatoPreparazione(String statoPreparazione) {
		this.statoPreparazione = statoPreparazione;
	}

	public Piatto getPiatto() {
		return piatto;
	}

	public void setPiatto(Piatto piatto) {
		this.piatto = piatto;
	}

	public Ordinazione getOrdinazione() {
		return ordinazione;
	}

	public void setOrdinazione(Ordinazione ordinazione) {
		this.ordinazione = ordinazione;
	}

	public Dipendente getDipendente() {
		return dipendente;
	}

	public void setDipendente(Dipendente dipendente) {
		this.dipendente = dipendente;
	}

	public long getIdPreparazionePiattoOrdinazione() {
		return idPreparazionePiattoOrdinazione;
	}

	public void setIdPreparazionePiattoOrdinazione(long idPreparazionePiattoOrdinazione) {
		this.idPreparazionePiattoOrdinazione = idPreparazionePiattoOrdinazione;
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
