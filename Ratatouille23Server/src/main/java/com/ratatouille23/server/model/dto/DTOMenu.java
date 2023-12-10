package com.ratatouille23.server.model.dto;

public class DTOMenu {
	private int idMenu;
	private String nome;
	private boolean isAbilitato;
	//private List<DTOCategoria> categorie;
	
	//Costruttori
	public DTOMenu(int idMenu, String nome, boolean isAbilitato) {
		super();
		this.idMenu = idMenu;
		this.nome = nome;
		this.isAbilitato = isAbilitato;
		//this.categorie = categorie;
	}
	
	public DTOMenu() {}
	
	//Getter e Setter
	public int getIdMenu() {
		return idMenu;
	}

	public void setIdMenu(int idMenu) {
		this.idMenu = idMenu;
	}
	/*
	public List<DTOCategoria> getCategorie() {
		return categorie;
	}

	public void setCategorie(List<DTOCategoria> categorie) {
		this.categorie = categorie;
	}
	*/
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
