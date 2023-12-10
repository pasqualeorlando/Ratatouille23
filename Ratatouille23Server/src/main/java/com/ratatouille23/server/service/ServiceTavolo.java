package com.ratatouille23.server.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Tavolo;
import com.ratatouille23.server.repository.RepositoryTavolo;

@Service
public class ServiceTavolo {

	@Autowired private RepositoryTavolo repoTavolo;

	public List<Tavolo> ottieniTavoli() {
		List<Tavolo> tavoli = new ArrayList<>();    
		repoTavolo.findAll().forEach(tavoli::add);    
		return tavoli;
	}

	public boolean creaTavolo(Tavolo tavolo) {
		try {
			if(!repoTavolo.existsById(tavolo.getIdTavolo()))
				repoTavolo.save(tavolo);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean eliminaTavolo(long idTavolo) {
		try {
			if(repoTavolo.existsById(idTavolo))
				repoTavolo.deleteById(idTavolo);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean modificaTavolo(Tavolo tavolo) {
		try {
			if(repoTavolo.existsById(tavolo.getIdTavolo()))
				repoTavolo.save(tavolo);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public List<Tavolo> ottieniTavoliDaNumeroTavolo(int numeroTavolo) {
		return repoTavolo.ottieniTavoliDaNumeroTavolo(numeroTavolo);
	}

	public Tavolo ottieniTavoloDaId(long idTavolo) {
		return repoTavolo.getReferenceById(idTavolo);
	}

	public List<Tavolo> ottieniTavoli(LocalDate dataInizio, LocalDate dataFine) {
		return repoTavolo.ottieniTavoli(dataInizio, dataFine);
	}
	
	
}
