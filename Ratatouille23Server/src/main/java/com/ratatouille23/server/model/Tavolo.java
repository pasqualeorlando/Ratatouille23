package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name="tavoli")
public class Tavolo implements Serializable{

	private static final long serialVersionUID = 1L;

	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idtavolo")
	private long idTavolo;
	
	@Column(name="numeroospiti")
	private int numeroOspiti;
	
	@JsonManagedReference
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="numerotavolo", nullable=false)
    private TavoloLocale tavoloLocale;
	
	@JsonBackReference
	@OneToMany(mappedBy = "tavolo", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private List<Ordinazione> ordinazioni;
	
	//Costruttori
	public Tavolo(long idTavolo, int numeroOspiti, TavoloLocale tavoloLocale, List<Ordinazione> ordinazioni) {
		super();
		this.idTavolo = idTavolo;
		this.numeroOspiti = numeroOspiti;
		this.tavoloLocale = tavoloLocale;
		this.ordinazioni = ordinazioni;
	}
	
	public Tavolo() {}

	//Getter e Setter
	public long getIdTavolo() {
		return idTavolo;
	}

	public void setIdTavolo(long idTavolo) {
		this.idTavolo = idTavolo;
	}

	public int getNumeroOspiti() {
		return numeroOspiti;
	}

	public void setNumeroOspiti(int numeroOspiti) {
		this.numeroOspiti = numeroOspiti;
	}

	public TavoloLocale getTavoloLocale() {
		return tavoloLocale;
	}

	public void setTavoloLocale(TavoloLocale tavoloLocale) {
		this.tavoloLocale = tavoloLocale;
	}

	public List<Ordinazione> getOrdinazioni() {
		return ordinazioni;
	}

	public void setOrdinazioni(List<Ordinazione> ordinazioni) {
		this.ordinazioni = ordinazioni;
	}
	
	
}
