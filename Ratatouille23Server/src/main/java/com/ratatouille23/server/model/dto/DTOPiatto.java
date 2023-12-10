package com.ratatouille23.server.model.dto;

import java.util.List;

public class DTOPiatto {
	
	private long idPiatto;
	private String nome;
	private float costo;
	private String descrizione;
	private int posizionePiatto;
	private boolean isAttivo;
	private String categoria;
	private int idCategoria;
	private List<String> allergeni;
	
	//Costruttori
	public DTOPiatto(long idPiatto, String nome, float costo, String descrizione, int posizionePiatto,
			boolean isAttivo, String categoria, List<String> allergeni, int idCategoria) {
		super();
		this.idPiatto = idPiatto;
		this.nome = nome;
		this.costo = costo;
		this.descrizione = descrizione;
		this.posizionePiatto = posizionePiatto;
		this.isAttivo = isAttivo;
		this.categoria = categoria;
		this.allergeni = allergeni;
		this.idCategoria = idCategoria;
	}
	
	public DTOPiatto() {}

	//Getter e Setter
	public long getIdPiatto() {
		return idPiatto;
	}

	public void setIdPiatto(long idPiatto) {
		this.idPiatto = idPiatto;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public float getCosto() {
		return costo;
	}

	public void setCosto(float costo) {
		this.costo = costo;
	}

	public String getDescrizione() {
		return descrizione;
	}

	public void setDescrizione(String descrizione) {
		this.descrizione = descrizione;
	}

	public int getPosizionePiatto() {
		return posizionePiatto;
	}

	public void setPosizionePiatto(int posizionePiatto) {
		this.posizionePiatto = posizionePiatto;
	}

	public boolean isAttivo() {
		return isAttivo;
	}

	public void setAttivo(boolean isAttivo) {
		this.isAttivo = isAttivo;
	}

	public String getCategoria() {
		return categoria;
	}

	public void setCategoria(String categoria) {
		this.categoria = categoria;
	}

	public List<String> getAllergeni() {
		return allergeni;
	}

	public void setAllergeni(List<String> allergeni) {
		this.allergeni = allergeni;
	}

	public int getIdCategoria() {
		return idCategoria;
	}

	public void setIdCategoria(int idCategoria) {
		this.idCategoria = idCategoria;
	}
	
	
}
