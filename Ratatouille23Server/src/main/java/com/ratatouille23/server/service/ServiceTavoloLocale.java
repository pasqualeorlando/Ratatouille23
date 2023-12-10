package com.ratatouille23.server.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ratatouille23.server.model.TavoloLocale;
import com.ratatouille23.server.repository.RepositoryTavoloLocale;

@Service
public class ServiceTavoloLocale {

	@Autowired private RepositoryTavoloLocale repoTavoloLocale;
	
	public List<TavoloLocale> ottieniTavoliLocali() {  
		return repoTavoloLocale.ottieniTavoliLocali();
	}
	
	public Optional<TavoloLocale> ottieniTavoloLocaleDaNumero(int numeroTavolo) {
		return repoTavoloLocale.findById(numeroTavolo);
	}
	
	public TavoloLocale creaTavoloLocale(TavoloLocale tavoloLocale) {
		try {
			if(!repoTavoloLocale.existsById(tavoloLocale.getNumeroTavolo()))
				return repoTavoloLocale.save(tavoloLocale);
			else
				return null;
		} catch(IllegalArgumentException e) {
			return null;
		}
	}

	public boolean eliminaTavoloLocale(int numeroTavolo) {
		try {
			if(repoTavoloLocale.existsById(numeroTavolo))
				repoTavoloLocale.deleteById(numeroTavolo);
			else
				return false;
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}

	public boolean modificaTavoloLocale(TavoloLocale tavoloLocale) {
		try {
			if(repoTavoloLocale.existsById(tavoloLocale.getNumeroTavolo()))
				repoTavoloLocale.save(tavoloLocale);
		} catch(IllegalArgumentException e) {
			return false;
		}
		return true;
	}
}
