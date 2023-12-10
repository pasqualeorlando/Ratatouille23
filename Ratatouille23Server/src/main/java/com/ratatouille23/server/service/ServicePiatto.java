package com.ratatouille23.server.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Piatto;
import com.ratatouille23.server.repository.RepositoryPiatto;

@Service
public class ServicePiatto {

	@Autowired private RepositoryPiatto repoPiatto;
	
	public Optional<Piatto> ottieniPiattoDaId(long idPiatto) {
		return repoPiatto.findById(idPiatto);
	}

	public List<Piatto> ottieniTuttiPiatti() {
		List<Piatto> piatti = new ArrayList<>();    
		repoPiatto.findAll().forEach(piatti::add);    
		return piatti;
	}

	public Piatto creaPiatto(Piatto piatto) {
		try {
			if(!repoPiatto.existsById(piatto.getIdPiatto()))
				return repoPiatto.save(piatto);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaPiatto(long idPiatto) {
		try {
			if(repoPiatto.existsById(idPiatto))
				repoPiatto.eliminaPiatto(idPiatto);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public Piatto modificaPiatto(Piatto piatto) {
		try {
			if(repoPiatto.existsById(piatto.getIdPiatto()))
				return repoPiatto.save(piatto);
		} catch(IllegalArgumentException e) {
			return null;
		}
		return null;
	}

	public List<Piatto> ottieniPiattiCategoria(int idCategoria, boolean attivi) {
		if(!attivi)
			return repoPiatto.ottieniPiattiCategoria(idCategoria);
		else
			return repoPiatto.ottieniPiattiAttiviCategoria(idCategoria);
	}

	public List<Piatto> ottieniTuttiPiattiAttivi() {
		return repoPiatto.ottieniTuttiPiattiAttivi();
	}	
	
}
