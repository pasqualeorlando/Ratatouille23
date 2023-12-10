package com.ratatouille23.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.PreparazionePiattoOrdinazione;
import com.ratatouille23.server.repository.RepositoryPreparazionePiattoOrdinazione;

@Service
public class ServicePreparazionePiattoOrdinazione {
	@Autowired private RepositoryPreparazionePiattoOrdinazione repoPreparazione;
	
	public List<PreparazionePiattoOrdinazione> ottieniTuttePreparazioni() {
		List<PreparazionePiattoOrdinazione> preparazioni = new ArrayList<>();    
		repoPreparazione.findAll().forEach(preparazioni::add);    
		return preparazioni;
	}

	public Optional<PreparazionePiattoOrdinazione> ottieniPreparazioneDaId(long idPreparazione) {
		return repoPreparazione.findById(idPreparazione);
	}
	
	public PreparazionePiattoOrdinazione creaPreparazione(PreparazionePiattoOrdinazione preparazione) {
		try {
			if(!repoPreparazione.existsById(preparazione.getIdPreparazionePiattoOrdinazione()))
				return repoPreparazione.save(preparazione);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	/*
	public boolean eliminaOrdinazione(long idOrdinazione) {
		try {
			if(repoPreparazione.existsById(idOrdinazione))
				repoPreparazione.deleteById(idOrdinazione);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}
	 */
	public boolean modificaPreparazione(PreparazionePiattoOrdinazione preparazione) {
		try {
			if(repoPreparazione.existsById(preparazione.getIdPreparazionePiattoOrdinazione()))
				repoPreparazione.save(preparazione);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public List<PreparazionePiattoOrdinazione> ottieniPreparazioniStato(String stato) {
		return repoPreparazione.ottieniPreparazioniStato(stato);
	}

	public List<PreparazionePiattoOrdinazione> ottieniPreparazioniDaIdOrdinazione(long idOrdinazione) {
		return repoPreparazione.ottieniPreparazioniDaIdOrdinazione(idOrdinazione);
	}

	public List<PreparazionePiattoOrdinazione> ottieniPreparazioniEvaseDipendente(int idDipendente) {
		return repoPreparazione.ottieniPreparazioniEvaseDipendente(idDipendente);
	}
	
	public List<PreparazionePiattoOrdinazione> ottieniPreparazioniDipendente(int idDipendente) {
		return repoPreparazione.ottieniPreparazioniDipendente(idDipendente);
	}

	public List<PreparazionePiattoOrdinazione> creaPreparazioni(List<PreparazionePiattoOrdinazione> preparazioni) {
		try {
			return repoPreparazione.saveAll(preparazioni);
		} catch(IllegalArgumentException e) {
			return null;
		}
	}
}
