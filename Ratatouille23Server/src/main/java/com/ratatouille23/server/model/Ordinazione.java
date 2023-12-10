package com.ratatouille23.server.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="ordinazioni")
public class Ordinazione implements Serializable{

	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idordinazione")
	private long idOrdinazione;
	
	@Column(name="orarioordinazione")
	private LocalDateTime orarioOrdinazione;
	
	@JsonManagedReference
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="iddipendente", nullable=false)
    private Dipendente dipendente;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "ordinazione", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione;
	
	@JsonManagedReference
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="idtavolo", nullable=false)
	private Tavolo tavolo;

	//Costruttori
	public Ordinazione(long idOrdinazione, LocalDateTime orarioOrdinazione, Dipendente dipendente, List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione, Tavolo tavolo) {
		super();
		this.idOrdinazione = idOrdinazione;
		this.orarioOrdinazione = orarioOrdinazione;
		this.dipendente = dipendente;
		this.preparazioniPiattiOrdinazione = preparazioniPiattiOrdinazione;
		this.tavolo = tavolo;
	}
	
	public Ordinazione() {}

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

	public Dipendente getDipendente() {
		return dipendente;
	}

	public void setDipendente(Dipendente dipendente) {
		this.dipendente = dipendente;
	}

	public List<PreparazionePiattoOrdinazione> getPreparazioniPiattiOrdinazione() {
		return preparazioniPiattiOrdinazione;
	}

	public void setPreparazioniPiattiOrdinazione(List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione) {
		this.preparazioniPiattiOrdinazione = preparazioniPiattiOrdinazione;
	}

	public Tavolo getTavolo() {
		return tavolo;
	}

	public void setTavolo(Tavolo tavolo) {
		this.tavolo = tavolo;
	}
	
	

}
