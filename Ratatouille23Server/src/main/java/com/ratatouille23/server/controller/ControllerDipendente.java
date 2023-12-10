package com.ratatouille23.server.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ratatouille23.server.model.Dipendente;
import com.ratatouille23.server.model.dto.DTODipendente;
import com.ratatouille23.server.service.ServiceDipendente;
import com.ratatouille23.server.service.ServiceOrdinazione;
import com.ratatouille23.server.service.ServicePreparazionePiattoOrdinazione;

@RestController
@RequestMapping(path = "api/dipendente", produces = { "application/json" })
@CrossOrigin
public class ControllerDipendente {

	@Autowired private ModelMapper modelMapper;
	@Autowired private ServiceDipendente serviceDipendente;
	@Autowired private ServiceOrdinazione serviceOrdinazione;
	@Autowired private ServicePreparazionePiattoOrdinazione servicePreparazione;
	@Autowired private PasswordEncoder passwordEncoder;
	
	//GET
	@GetMapping("getDipendenti")  
	@ResponseBody
	public List<DTODipendente> ottieniTuttiDipendenti()  {
		List<Dipendente> dipendenti = serviceDipendente.ottieniTuttiDipendenti();
		Collections.sort(dipendenti, Comparator.comparingInt(Dipendente::getIdDipendente));
		List<DTODipendente> daRestituire = new ArrayList<DTODipendente>();
		for(Dipendente d : dipendenti)
			daRestituire.add(convertiInDTO(d));
		return daRestituire;
	}
	
	@GetMapping("getDipendentiDaRuolo/{ruolo}")
	@ResponseBody
	public List<DTODipendente> ottieniDipendentiDaRuolo(@PathVariable(name="ruolo") String ruolo) {
		List<Dipendente> dipendenti = serviceDipendente.ottieniDipendentiDaRuolo(ruolo);
		List<DTODipendente> daRestituire = new ArrayList<DTODipendente>();
		for(Dipendente d : dipendenti)
			daRestituire.add(convertiInDTO(d));
		return daRestituire;
	}
	
	@GetMapping("getDipendenteDaId/{iddipendente}")
	@ResponseBody
	public DTODipendente ottieniDipendenteDaId(@PathVariable(name="iddipendente") int idDipendente) {
		Optional<Dipendente> dipendente = serviceDipendente.ottieniDipendenteDaId(idDipendente);
		if(dipendente.isEmpty())
			return null;
		
		return convertiInDTO(dipendente.get());
	}
	
	@GetMapping("getMigliorAddettoSala/{datainizio}/{datafine}")
	@ResponseBody
	public DTODipendente ottieniMigliorAddettoSala(@PathVariable(name="datainizio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataInizio, @PathVariable(name="datafine") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataFine) {
		Optional<Dipendente> dipendente = serviceDipendente.ottieniMigliorAddettoSala(dataInizio, dataFine);
		if(dipendente.isEmpty())
			return null;
		
		return convertiInDTO(dipendente.get());
	}
	
	@GetMapping("getMigliorAddettoCucina/{datainizio}/{datafine}")
	@ResponseBody
	public DTODipendente ottieniMigliorAddettoCucina(@PathVariable(name="datainizio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataInizio, @PathVariable(name="datafine") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataFine) {
		Optional<Dipendente> dipendente = serviceDipendente.ottieniMigliorAddettoCucina(dataInizio, dataFine);
		if(dipendente.isEmpty())
			return null;
		
		return convertiInDTO(dipendente.get());
	}
	
	//POST
	@PostMapping("creaDipendente")
	@ResponseBody
	public ResponseEntity<DTODipendente> creaDipendente(@RequestBody DTODipendente dtoDipendente) {
		Dipendente dipendente = convertiInEntity(dtoDipendente);
		dipendente.setPrimoAccesso(true);
		dipendente.setOrdinazioni(null);
		dipendente.setPreparazioniPiattiOrdinazione(null);
		dipendente.setPassword(passwordEncoder.encode(dipendente.getPassword()));
				
		boolean creato = serviceDipendente.creaDipendente(dipendente);
		if(creato) {
			DTODipendente daRestituire = convertiInDTO(serviceDipendente.ottieniDipendenteDaEmail(dipendente.getEmail()).get());
			return ResponseEntity.status(HttpStatus.CREATED).body(daRestituire);
		}
		else {
			if(serviceDipendente.ottieniDipendenteDaEmail(dipendente.getEmail()).get() != null)
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			else
				throw new RuntimeException();
		}
	}
	
	//DELETE
	@DeleteMapping("eliminaDipendente/{iddipendente}")
	@ResponseBody
	public ResponseEntity<String> eliminaDipendente(@PathVariable(name="iddipendente") int idDipendente) {
		boolean eliminato = serviceDipendente.eliminaDipendente(idDipendente);
		if(eliminato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//PUT
	/*@PutMapping("modificaDipendente")
	@ResponseBody
	public ResponseEntity<String> modificaDipendente(@RequestBody DTODipendente dtoDipendente) {
		Dipendente dipendente = convertiInEntity(dtoDipendente);
		
		boolean modificato = serviceDipendente.modificaDipendente(dipendente);
		if(modificato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}*/
	
	//Conversioni
	private DTODipendente convertiInDTO(Dipendente dipendente) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTODipendente dtoDipendente = new DTODipendente();
		dtoDipendente = modelMapper.map(dipendente, DTODipendente.class);
		
		//Mapping altri attributi
		
		
		return dtoDipendente;
	}
	
	private Dipendente convertiInEntity(DTODipendente dtoDipendente) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Dipendente dipendente = new Dipendente();
		dipendente = modelMapper.map(dtoDipendente, Dipendente.class);
		
		//Mapping altri attributi
		dipendente.setOrdinazioni(serviceOrdinazione.ottieniOrdinazioniDipendente(dipendente.getIdDipendente()));
		dipendente.setPreparazioniPiattiOrdinazione(servicePreparazione.ottieniPreparazioniDipendente(dipendente.getIdDipendente()));
		
		return dipendente;
	}
}
