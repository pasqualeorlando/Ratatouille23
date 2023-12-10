package com.ratatouille23.server.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ratatouille23.server.model.Tavolo;
import com.ratatouille23.server.model.dto.DTOTavolo;
import com.ratatouille23.server.service.ServiceTavolo;
import com.ratatouille23.server.service.ServiceTavoloLocale;

@RestController
@RequestMapping(path = "api/tavolo", produces = { "application/json" })
@CrossOrigin
public class ControllerTavolo {

	@Autowired private ServiceTavolo serviceTavolo;
	@Autowired private ServiceTavoloLocale serviceTavoloLocale;
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getTavoli")  
	@ResponseBody
	public List<DTOTavolo> ottieniTavoli()  {
		List<Tavolo> tavoli = serviceTavolo.ottieniTavoli();
		List<DTOTavolo> daRestituire = new ArrayList<DTOTavolo>();
		for(Tavolo t : tavoli)
			daRestituire.add(convertiInDTO(t));
		return daRestituire;
	}
	
	@GetMapping("getTavoloDaId/{idtavolo}")
	@ResponseBody
	public DTOTavolo ottieniTavoloDaId(@PathVariable(name="idtavolo") long idTavolo)  {
		Tavolo t = serviceTavolo.ottieniTavoloDaId(idTavolo);
		return convertiInDTO(t);
	}
	
	@GetMapping("getTavoli/{datainizio}/{datafine}")  
	@ResponseBody
	public List<DTOTavolo> ottieniTavoli(@PathVariable(name="datainizio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataInizio, @PathVariable(name="datafine") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataFine)  {
		List<Tavolo> tavoli = serviceTavolo.ottieniTavoli(dataInizio, dataFine);
		List<DTOTavolo> daRestituire = new ArrayList<DTOTavolo>();
		for(Tavolo t : tavoli)
			daRestituire.add(convertiInDTO(t));
		return daRestituire;
	}

	//POST
	@PostMapping("creaTavolo")
	@ResponseBody
	public ResponseEntity<DTOTavolo> creaTavolo(@RequestBody DTOTavolo dtoTavolo) {
		Tavolo tavolo = convertiInEntity(dtoTavolo);
		
		boolean creato = serviceTavolo.creaTavolo(tavolo);
		if(creato) {
			List<Tavolo> tavoliDaNumeroTavolo = serviceTavolo.ottieniTavoliDaNumeroTavolo(dtoTavolo.getNumeroTavolo());
			Tavolo ultimo = tavoliDaNumeroTavolo.get(tavoliDaNumeroTavolo.size()-1);
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(ultimo));
		}
		else
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
	}
	//PUT
	@PutMapping("modificaTavolo")
	@ResponseBody
	public ResponseEntity<String> modificaTavolo(@RequestBody DTOTavolo dtoTavolo) {
		Tavolo tavolo = convertiInEntity(dtoTavolo);
		
		boolean modificato = serviceTavolo.modificaTavolo(tavolo);
		if(modificato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaTavolo/{idtavolo}")
	@ResponseBody
	public ResponseEntity<String> eliminaTavolo(@PathVariable(name="idtavolo") long idTavolo) {
		boolean eliminato = serviceTavolo.eliminaTavolo(idTavolo);
		if(eliminato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOTavolo convertiInDTO(Tavolo tavolo) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOTavolo dtoTavolo = new DTOTavolo();
		dtoTavolo = modelMapper.map(tavolo, DTOTavolo.class);
		
		//Mapping altri attributi
		dtoTavolo.setNumeroTavolo(tavolo.getTavoloLocale().getNumeroTavolo());
		
		return dtoTavolo;
	}
	
	private Tavolo convertiInEntity(DTOTavolo dtoTavolo) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Tavolo tavolo = new Tavolo();
		tavolo = modelMapper.map(dtoTavolo, Tavolo.class);
		
		//Mapping altri attributi
		tavolo.setTavoloLocale(serviceTavoloLocale.ottieniTavoloLocaleDaNumero(dtoTavolo.getNumeroTavolo()).get());
		
		return tavolo;
	}
}
