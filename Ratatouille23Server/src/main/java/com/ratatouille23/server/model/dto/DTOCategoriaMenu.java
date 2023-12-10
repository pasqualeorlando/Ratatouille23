package com.ratatouille23.server.model.dto;


public class DTOCategoriaMenu {
	
	private int idCategoriaMenu;
	private int idMenu;
	private int idCategoria;
	private String nomeCategoria;
	private String nomeMenu;
	private int posizioneCategoria;
	private boolean isAbilitato;
	
	//Costruttori
	public DTOCategoriaMenu(int idCategoriaMenu, int idMenu, int idCategoria, int posizioneCategoria, boolean isAbilitato, String nomeCategoria, String nomeMenu) {
		super();
		this.idCategoriaMenu = idCategoriaMenu;
		this.idMenu = idMenu;
		this.idCategoria = idCategoria;
		this.posizioneCategoria = posizioneCategoria;
		this.isAbilitato = isAbilitato;
		this.nomeCategoria = nomeCategoria;
		this.nomeMenu = nomeMenu;
	}
	
	public DTOCategoriaMenu() {}
	
	//Getter e Setter
	public int getIdCategoriaMenu() {
		return idCategoriaMenu;
	}

	public void setIdCategoriaMenu(int idCategoriaMenu) {
		this.idCategoriaMenu = idCategoriaMenu;
	}

	public int getIdMenu() {
		return idMenu;
	}

	public void setIdMenu(int idMenu) {
		this.idMenu = idMenu;
	}

	public int getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}

	public int getPosizioneCategoria() {
		return posizioneCategoria;
	}

	public void setPosizioneCategoria(int posizioneCategoria) {
		this.posizioneCategoria = posizioneCategoria;
	}

	public boolean isAbilitato() {
		return isAbilitato;
	}

	public void setAbilitato(boolean isAbilitato) {
		this.isAbilitato = isAbilitato;
	}

	public String getNomeCategoria() {
		return nomeCategoria;
	}

	public void setNomeCategoria(String nomeCategoria) {
		this.nomeCategoria = nomeCategoria;
	}

	public String getNomeMenu() {
		return nomeMenu;
	}

	public void setNomeMenu(String nomeMenu) {
		this.nomeMenu = nomeMenu;
	}
	
	
}
