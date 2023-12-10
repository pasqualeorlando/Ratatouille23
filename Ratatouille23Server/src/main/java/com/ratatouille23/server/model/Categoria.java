package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
@Table(name="categorie")
public class Categoria implements Serializable{

	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idcategoria")
	private int idCategoria;
			
	@Column(name="nome")
	private String nome;
	
	@JsonBackReference
	@OneToMany(mappedBy = "categoria", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    private List<CategoriaMenu> menu = new ArrayList<CategoriaMenu>();
	
	@JsonBackReference
	@OneToMany(mappedBy="categoria", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Piatto> piatti;
	
	//Costruttori
	public Categoria(int idCategoria, String nome, List<CategoriaMenu> menu, List<Piatto> piatti) {
		super();
		this.idCategoria = idCategoria;
		this.nome = nome;
		this.menu = menu;
		this.piatti = piatti;
	}
	
	public Categoria() {}
	
	//Getter e Setter
	public int getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public List<CategoriaMenu> getMenu() {
		return menu;
	}

	public void setMenu(List<CategoriaMenu> menu) {
		this.menu = menu;
	}

	public List<Piatto> getPiatti() {
		return piatti;
	}

	public void setPiatti(List<Piatto> piatti) {
		this.piatti = piatti;
	}
	
}
