package com.ratatouille23.server.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Ordinazione;
import com.ratatouille23.server.repository.RepositoryOrdinazione;

@Service
public class ServiceOrdinazione {

	@Autowired private RepositoryOrdinazione repoOrdinazione;
	
	public List<Ordinazione> ottieniTutteOrdinazioni() {
		List<Ordinazione> ordinazioni = new ArrayList<>();    
		repoOrdinazione.findAll().forEach(ordinazioni::add);    
		return ordinazioni;
	}

	public Optional<Ordinazione> ottieniOrdinazioneDaId(long idOrdinazione) {
		return repoOrdinazione.findById(idOrdinazione);
	}
	
	public Ordinazione creaOrdinazione(Ordinazione ordinazione) {
		try {
			if(!repoOrdinazione.existsById(ordinazione.getIdOrdinazione()))
				return repoOrdinazione.save(ordinazione);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaOrdinazione(long idOrdinazione) {
		try {
			if(repoOrdinazione.existsById(idOrdinazione))
				repoOrdinazione.deleteById(idOrdinazione);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean modificaOrdinazione(Ordinazione ordinazione) {
		try {
			if(repoOrdinazione.existsById(ordinazione.getIdOrdinazione()))
				repoOrdinazione.save(ordinazione);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public List<Ordinazione> ottieniOrdinazioniDaTerminare(LocalDate data) {
		return repoOrdinazione.ottieniOrdinazioniDaTerminare(data);
	}

	public List<Ordinazione> ottieniOrdinazioniDaIdTavolo(long idTavolo) {
		return repoOrdinazione.ottieniOrdinazioniDaIdTavolo(idTavolo);
	}

	public List<Ordinazione> ottieniOrdinazioniDipendente(int idDipendente) {
		return repoOrdinazione.ottieniOrdinazioniDipendente(idDipendente);
	}

	public List<Ordinazione> ottieniOrdinazioniTerminate(LocalDate dataInizio, LocalDate dataFine) {
		return repoOrdinazione.ottieniOrdinazioniTerminate(dataInizio, dataFine);
	}
}
