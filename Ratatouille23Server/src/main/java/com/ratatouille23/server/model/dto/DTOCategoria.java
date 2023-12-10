package com.ratatouille23.server.model.dto;

import java.util.List;

public class DTOCategoria {
	
	private int idCategoria;
	private String nome;
	private List<DTOCategoriaMenu> menu;
		
	//Costruttori
	public DTOCategoria(int idCategoria, String nome, List<DTOCategoriaMenu> menu) {
		super();
		this.idCategoria = idCategoria;
		this.nome = nome;
		this.menu = menu;
	}
	
	public DTOCategoria() {}
	
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

	public List<DTOCategoriaMenu> getMenu() {
		return menu;
	}

	public void setMenu(List<DTOCategoriaMenu> menu) {
		this.menu = menu;
	}
	
	
}
