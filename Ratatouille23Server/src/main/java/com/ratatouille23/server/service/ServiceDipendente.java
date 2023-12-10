package com.ratatouille23.server.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.Dipendente;
import com.ratatouille23.server.repository.RepositoryDipendente;

@Service
public class ServiceDipendente {

	@Autowired private RepositoryDipendente repoDipendente;
	
	public List<Dipendente> ottieniTuttiDipendenti() {
		List<Dipendente> dipendenti = new ArrayList<>();    
		repoDipendente.findAll().forEach(dipendenti::add);    
		return dipendenti;
	}

	public Optional<Dipendente> ottieniDipendenteDaId(int idDipendente) {
		return repoDipendente.findById(idDipendente);
	}
	
	public Optional<Dipendente> ottieniDipendenteDaEmail(String email) {
		return repoDipendente.ottieniDipendenteDaEmail(email);
	}
	
	public boolean creaDipendente(Dipendente dipendente) {
		try {
			if(!repoDipendente.existsById(dipendente.getIdDipendente()))
				repoDipendente.save(dipendente);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean eliminaDipendente(int idDipendente) {
		try {
			if(repoDipendente.existsById(idDipendente))
				repoDipendente.deleteById(idDipendente);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean modificaDipendente(Dipendente dipendente) {
		try {
			if(repoDipendente.existsById(dipendente.getIdDipendente()))
				repoDipendente.save(dipendente);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public List<Dipendente> ottieniDipendentiDaRuolo(String ruolo) {
		return repoDipendente.ottieniDipendentiDaRuolo(ruolo);
	}


	public Optional<Dipendente> ottieniMigliorAddettoSala(LocalDate dataInizio, LocalDate dataFine) {
		return repoDipendente.ottieniMigliorAddettoSala(dataInizio, dataFine);
	}
	
	public Optional<Dipendente> ottieniMigliorAddettoCucina(LocalDate dataInizio, LocalDate dataFine) {
		return repoDipendente.ottieniMigliorAddettoCucina(dataInizio, dataFine);
	}
}
