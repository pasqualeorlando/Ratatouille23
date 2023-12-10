package com.ratatouille23.server.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;

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
@Table(name = "categoriemenu")
public class CategoriaMenu {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idcategoriamenu")
	private int idCategoriaMenu;
	
	@JsonManagedReference
    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "idmenu")
    private Menu menu;
	
	@JsonManagedReference
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idcategoria")
    private Categoria categoria;
    
    @Column(name = "posizionecategoria")
    private int posizioneCategoria;
    
    @Column(name = "isabilitato")
    private boolean isAbilitato;
    
    //Costruttori
	public CategoriaMenu(int idCategoriaMenu, Menu menu, Categoria categoria, int posizioneCategoria,
			boolean isAbilitato) {
		super();
		this.idCategoriaMenu = idCategoriaMenu;
		this.menu = menu;
		this.categoria = categoria;
		this.posizioneCategoria = posizioneCategoria;
		this.isAbilitato = isAbilitato;
	}
    
	public CategoriaMenu() {}
	
	//Getter e Setter
	public int getIdCategoriaMenu() {
		return idCategoriaMenu;
	}

	public void setIdCategoriaMenu(int idCategoriaMenu) {
		this.idCategoriaMenu = idCategoriaMenu;
	}

	public Menu getMenu() {
		return menu;
	}

	public void setMenu(Menu menu) {
		this.menu = menu;
	}

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
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
    
	
}
