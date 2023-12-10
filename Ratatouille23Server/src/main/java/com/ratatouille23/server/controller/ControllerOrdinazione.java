package com.ratatouille23.server.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.ratatouille23.server.model.Ordinazione;
import com.ratatouille23.server.model.dto.DTOOrdinazione;
import com.ratatouille23.server.service.ServiceDipendente;
import com.ratatouille23.server.service.ServiceOrdinazione;
import com.ratatouille23.server.service.ServicePreparazionePiattoOrdinazione;
import com.ratatouille23.server.service.ServiceTavolo;

@RestController
@RequestMapping(path = "api/ordinazione", produces = { "application/json" })
@CrossOrigin
public class ControllerOrdinazione {

	@Autowired private ServiceOrdinazione serviceOrdinazione;
	@Autowired private ServiceDipendente serviceDipendente;
	@Autowired private ServiceTavolo serviceTavolo;
	@Autowired private ServicePreparazionePiattoOrdinazione servicePreparazione;
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getOrdinazioni")  
	@ResponseBody
	public List<DTOOrdinazione> ottieniTutteOrdinazioni()  {
		List<Ordinazione> ordinazioni = serviceOrdinazione.ottieniTutteOrdinazioni();
		List<DTOOrdinazione> daRestituire = new ArrayList<DTOOrdinazione>();
		for(Ordinazione o : ordinazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	
	@GetMapping("getOrdinazioniDaTerminare/{data}")  
	@ResponseBody
	public List<DTOOrdinazione> ottieniOrdinazioniDaTerminare(@PathVariable(name="data") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate data)  {
		List<Ordinazione> ordinazioni = serviceOrdinazione.ottieniOrdinazioniDaTerminare(data);
		List<DTOOrdinazione> daRestituire = new ArrayList<DTOOrdinazione>();
		for(Ordinazione o : ordinazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	@GetMapping("getOrdinazioniTerminate/{datainizio}/{datafine}")  
	@ResponseBody
	public List<DTOOrdinazione> ottieniOrdinazioniTerminate(@PathVariable(name="datainizio") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataInizio, @PathVariable(name="datafine") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE, pattern="yyyy-MM-dd") LocalDate dataFine)  {
		List<Ordinazione> ordinazioni = serviceOrdinazione.ottieniOrdinazioniTerminate(dataInizio, dataFine);
		List<DTOOrdinazione> daRestituire = new ArrayList<DTOOrdinazione>();
		for(Ordinazione o : ordinazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	
	@GetMapping("getOrdinazioneDaId/{idordinazione}")
	@ResponseBody
	public DTOOrdinazione ottieniOrdinazioneDaId(@PathVariable(name="idordinazione") long idOrdinazione) {
		Optional<Ordinazione> ordinazione = serviceOrdinazione.ottieniOrdinazioneDaId(idOrdinazione);
		if(ordinazione.isEmpty())
			return null;
		
		return convertiInDTO(ordinazione.get());
	}
	
	@GetMapping("getOrdinazioniDaIdTavolo/{idtavolo}")
	@ResponseBody
	public List<DTOOrdinazione> ottieniOrdinazioniDaIdTavolo(@PathVariable(name="idtavolo") long idTavolo) {
		List<Ordinazione> ordinazioni = serviceOrdinazione.ottieniOrdinazioniDaIdTavolo(idTavolo);
		List<DTOOrdinazione> daRestituire = new ArrayList<DTOOrdinazione>();
		for(Ordinazione o : ordinazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	@GetMapping("getOrdinazioniDipendente/{iddipendente}")
	@ResponseBody
	public List<DTOOrdinazione> ottieniOrdinazioniDipendente(@PathVariable(name="iddipendente") int idDipendente) {
		List<Ordinazione> ordinazioni = serviceOrdinazione.ottieniOrdinazioniDipendente(idDipendente);
		List<DTOOrdinazione> daRestituire = new ArrayList<DTOOrdinazione>();
		for(Ordinazione o : ordinazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	//POST
	@PostMapping("creaOrdinazione")
	@ResponseBody
	public ResponseEntity<DTOOrdinazione> creaOrdinazione(@RequestBody DTOOrdinazione dtoOrdinazione) {
		Ordinazione ordinazione = convertiInEntity(dtoOrdinazione);
		
		Ordinazione creata = serviceOrdinazione.creaOrdinazione(ordinazione);
		if(creata != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creata));
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaOrdinazione/{idordinazione}")
	@ResponseBody
	public ResponseEntity<String> eliminaPiatto(@PathVariable(name="idordinazione") long idOrdinazione) {
		boolean eliminata = serviceOrdinazione.eliminaOrdinazione(idOrdinazione);
		if(eliminata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//PUT
	@PutMapping("modificaOrdinazione")
	@ResponseBody
	public ResponseEntity<String> modificaOrdinazione(@RequestBody DTOOrdinazione dtoOrdinazione) {
		Ordinazione ordinazione = convertiInEntity(dtoOrdinazione);
		
		boolean modificata = serviceOrdinazione.modificaOrdinazione(ordinazione);
		if(modificata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOOrdinazione convertiInDTO(Ordinazione ordinazione) {
		DTOOrdinazione dtoOrdinazione = new DTOOrdinazione();
		
		dtoOrdinazione.setIdOrdinazione(ordinazione.getIdOrdinazione());
		dtoOrdinazione.setOrarioOrdinazione(ordinazione.getOrarioOrdinazione());
		
		//Mapping altri attributi
		dtoOrdinazione.setIdDipendente(ordinazione.getDipendente().getIdDipendente());
		dtoOrdinazione.setIdTavolo(ordinazione.getTavolo().getIdTavolo());
		
		return dtoOrdinazione;
	}
	
	private Ordinazione convertiInEntity(DTOOrdinazione dtoOrdinazione) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Ordinazione ordinazione = new Ordinazione();
		ordinazione = modelMapper.map(dtoOrdinazione, Ordinazione.class);
		
		//Mapping altri attributi
		ordinazione.setDipendente(serviceDipendente.ottieniDipendenteDaId(dtoOrdinazione.getIdDipendente()).get());
		ordinazione.setPreparazioniPiattiOrdinazione(servicePreparazione.ottieniPreparazioniDaIdOrdinazione(ordinazione.getIdOrdinazione()));
		ordinazione.setTavolo(serviceTavolo.ottieniTavoloDaId(dtoOrdinazione.getIdTavolo()));
		
		return ordinazione;
	}
}
