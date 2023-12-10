package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="tavolilocali")
public class TavoloLocale implements Serializable {

	private static final long serialVersionUID = 1L;

	//Chiave primaria
	@Id
	@Column(name="numerotavolo")
	private int numeroTavolo;
	
	@Column(name="stato")
	private String stato;
	
	@JsonBackReference
	@OneToMany(mappedBy="tavoloLocale", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
    private List<Tavolo> tavoli;
	
	//Costruttori
	public TavoloLocale(int numeroTavolo, String stato, List<Tavolo> tavoli) {
		super();
		this.numeroTavolo = numeroTavolo;
		this.stato = stato;
		this.tavoli = tavoli;
	}
	
	public TavoloLocale() {}

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

	public List<Tavolo> getTavoli() {
		return tavoli;
	}

	public void setTavoli(List<Tavolo> tavoli) {
		this.tavoli = tavoli;
	}
	
	
}
