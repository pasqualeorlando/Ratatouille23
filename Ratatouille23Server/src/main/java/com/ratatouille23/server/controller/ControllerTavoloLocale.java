package com.ratatouille23.server.controller;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.ratatouille23.server.model.TavoloLocale;
import com.ratatouille23.server.model.dto.DTOTavolo;
import com.ratatouille23.server.model.dto.DTOTavoloLocale;
import com.ratatouille23.server.service.ServiceTavolo;
import com.ratatouille23.server.service.ServiceTavoloLocale;

@RestController
@RequestMapping(path = "api/tavololocale", produces = { "application/json" })
@CrossOrigin
public class ControllerTavoloLocale {

	@Autowired private ServiceTavolo serviceTavolo;
	@Autowired private ServiceTavoloLocale serviceTavoloLocale;
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getTavoliLocali")  
	@ResponseBody
	public List<DTOTavoloLocale> ottieniTavoli()  {
		List<TavoloLocale> tavoliLocali = serviceTavoloLocale.ottieniTavoliLocali();
		List<DTOTavoloLocale> daRestituire = new ArrayList<DTOTavoloLocale>();
		for(TavoloLocale t : tavoliLocali)
			daRestituire.add(convertiInDTO(t));
	
		return daRestituire;
	}

	//POST
	@PostMapping("creaTavoloLocale")
	@ResponseBody
	public ResponseEntity<DTOTavoloLocale> creaTavoloLocale(@RequestBody DTOTavoloLocale dtoTavoloLocale) {
		TavoloLocale tavoloLocale = convertiInEntity(dtoTavoloLocale);
		
		TavoloLocale creato = serviceTavoloLocale.creaTavoloLocale(tavoloLocale);
		if(creato != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creato));
		else
			throw new RuntimeException();
	}
	//PUT
	@PutMapping("modificaTavoloLocale")
	@ResponseBody
	public ResponseEntity<String> modificaTavoloLocale(@RequestBody DTOTavoloLocale dtoTavoloLocale) {
		TavoloLocale tavoloLocale = convertiInEntity(dtoTavoloLocale);
		
		boolean modificato = serviceTavoloLocale.modificaTavoloLocale(tavoloLocale);
		if(modificato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaTavoloLocale/{numerotavolo}")
	@ResponseBody
	public ResponseEntity<String> eliminaTavoloLocale(@PathVariable(name="numerotavolo") int numeroTavolo) {
		boolean eliminato = serviceTavoloLocale.eliminaTavoloLocale(numeroTavolo);
		if(eliminato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOTavoloLocale convertiInDTO(TavoloLocale tavoloLocale) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOTavoloLocale dtoTavoloLocale = new DTOTavoloLocale();
		dtoTavoloLocale = modelMapper.map(tavoloLocale, DTOTavoloLocale.class);
		
		//Mapping altri attributi
		if(!tavoloLocale.getStato().equals("Libero")) {
			DTOTavolo tavolo = convertiTavoloInDTO(tavoloLocale.getTavoli().get(tavoloLocale.getTavoli().size() - 1));
			dtoTavoloLocale.setTavolo(tavolo);
		}
		else
			dtoTavoloLocale.setTavolo(null);
		
		return dtoTavoloLocale;
	}
	
	private TavoloLocale convertiInEntity(DTOTavoloLocale dtoTavoloLocale) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		TavoloLocale tavoloLocale = new TavoloLocale();
		tavoloLocale = modelMapper.map(dtoTavoloLocale, TavoloLocale.class);
		
		//Mapping altri attributi
		tavoloLocale.setTavoli(serviceTavolo.ottieniTavoliDaNumeroTavolo(dtoTavoloLocale.getNumeroTavolo()));
		
		return tavoloLocale;
	}
	
	private DTOTavolo convertiTavoloInDTO(Tavolo tavolo) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOTavolo dtoTavolo = new DTOTavolo();
		dtoTavolo = modelMapper.map(tavolo, DTOTavolo.class);
		
		//Mapping altri attributi
		dtoTavolo.setNumeroTavolo(tavolo.getTavoloLocale().getNumeroTavolo());
		
		return dtoTavolo;
	}
}
