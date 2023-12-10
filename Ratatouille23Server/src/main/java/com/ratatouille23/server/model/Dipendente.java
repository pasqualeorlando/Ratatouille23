package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="dipendenti")
public class Dipendente implements Serializable, UserDetails{

	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="iddipendente")
	private int idDipendente;
			
	@Column(name="nome")
	private String nome;
	
	@Column(name="cognome")
	private String cognome;
	
	@Column(name="email")
	private String email;
	
	@Column(name="password")
	private String password;
	
	@Column(name="ruolo")
	private String ruolo;
	
	@Column(name="primoaccesso")
	private boolean primoAccesso;
	
	@JsonBackReference
	@OneToMany(mappedBy="dipendente", fetch=FetchType.LAZY)
    private List<Ordinazione> ordinazioni;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "dipendente", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione;

	//Costruttori
	public Dipendente(int idDipendente, String nome, String cognome, String email, String password, String ruolo, 
			List<Ordinazione> ordinazioni, List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione, boolean primoAccesso) {
		super();
		this.idDipendente = idDipendente;
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;
		this.ruolo = ruolo;
		this.ordinazioni = ordinazioni;
		this.preparazioniPiattiOrdinazione = preparazioniPiattiOrdinazione;
		this.primoAccesso = primoAccesso;
	}
	
	public Dipendente(String nome, String cognome, String email, String password, String ruolo, 
			List<Ordinazione> ordinazioni, List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione, boolean primoAccesso) {
		super();
		this.nome = nome;
		this.cognome = cognome;
		this.email = email;
		this.password = password;
		this.ruolo = ruolo;
		this.ordinazioni = ordinazioni;
		this.preparazioniPiattiOrdinazione = preparazioniPiattiOrdinazione;
		this.primoAccesso = primoAccesso;
	}
	
	public Dipendente() {}

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

	public List<Ordinazione> getOrdinazioni() {
		return ordinazioni;
	}

	public void setOrdinazioni(List<Ordinazione> ordinazioni) {
		this.ordinazioni = ordinazioni;
	}

	public List<PreparazionePiattoOrdinazione> getPreparazioniPiattiOrdinazione() {
		return preparazioniPiattiOrdinazione;
	}

	public void setPreparazioniPiattiOrdinazione(List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione) {
		this.preparazioniPiattiOrdinazione = preparazioniPiattiOrdinazione;
	}
	

	public boolean isPrimoAccesso() {
		return primoAccesso;
	}

	public void setPrimoAccesso(boolean primoAccesso) {
		this.primoAccesso = primoAccesso;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(this.ruolo));
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	
	
}
