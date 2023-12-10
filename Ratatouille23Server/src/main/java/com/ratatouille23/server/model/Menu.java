package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="menu")
public class Menu implements Serializable{
	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idmenu")
	private int idMenu;
		
	@Column(name="nome")
	private String nome;
	
	@Column(name="isabilitato")
	private boolean isAbilitato;
	
	@JsonBackReference
	@OneToMany(mappedBy = "menu", cascade = CascadeType.ALL)
    List<CategoriaMenu> categorie = new ArrayList<CategoriaMenu>();
		
	//Costruttori
	public Menu() {}

	public Menu(int idMenu, String nome, List<CategoriaMenu> categorie, boolean isAbilitato) {
		super();
		this.idMenu = idMenu;
		this.nome = nome;
		this.categorie = categorie;
		this.isAbilitato = isAbilitato;
	}
	
	//Getter e Setter
	public List<CategoriaMenu> getCategorie() {
		return categorie;
	}

	public void setCategorie(List<CategoriaMenu> categorie) {
		this.categorie = categorie;
	}
	
	public int getIdMenu() {
		return idMenu;
	}

	public void setIdMenu(int idMenu) {
		this.idMenu = idMenu;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public boolean isAbilitato() {
		return isAbilitato;
	}

	public void setAbilitato(boolean isAbilitato) {
		this.isAbilitato = isAbilitato;
	}
	
}
