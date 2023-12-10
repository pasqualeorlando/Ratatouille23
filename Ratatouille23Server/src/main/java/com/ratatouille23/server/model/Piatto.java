package com.ratatouille23.server.model;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.ratatouille23.server.enums.Allergene;
import com.ratatouille23.server.enums.AllergeneEnumConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name="piatti")
public class Piatto implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	//Chiave primaria
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="idpiatto")
	private long idPiatto;
			
	@Column(name="nome")
	private String nome;
	
	@Column(name="costo")
	private float costo;
	
	@Column(name="descrizione")
	private String descrizione;
	
	@Column(name="posizionepiatto")
	private int posizionePiatto;
	
	@Column(name="isattivo")
	private boolean isAttivo;
	
	@JsonManagedReference
	@ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="idcategoria", nullable=false)
    private Categoria categoria;
	
	@ElementCollection
	@JoinTable(name = "allergenipiatti", joinColumns = @JoinColumn(name = "idpiatto"))
	@Column(name = "allergeni", nullable = false)
	@Convert(converter = AllergeneEnumConverter.class)
	List<Allergene> allergeni;
	
	@JsonManagedReference
	@OneToMany(mappedBy = "piatto", fetch=FetchType.LAZY, cascade = CascadeType.ALL)
	private List<PreparazionePiattoOrdinazione> preparazioniPiattiOrdinazione;
	
	//Costruttori
	public Piatto(long idPiatto, String nome, float costo, String descrizione, int posizionePiatto, boolean isAttivo,
			Categoria categoria, List<Allergene> allergeni) {
		super();
		this.idPiatto = idPiatto;
		this.nome = nome;
		this.costo = costo;
		this.descrizione = descrizione;
		this.posizionePiatto = posizionePiatto;
		this.isAttivo = isAttivo;
		this.categoria = categoria;
		this.allergeni = allergeni;
	}
	
	public Piatto() {}

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

	public Categoria getCategoria() {
		return categoria;
	}

	public void setCategoria(Categoria categoria) {
		this.categoria = categoria;
	}

	public List<Allergene> getAllergeni() {
		return allergeni;
	}

	public void setAllergeni(List<Allergene> allergeni) {
		this.allergeni = allergeni;
	}
	
	
}
