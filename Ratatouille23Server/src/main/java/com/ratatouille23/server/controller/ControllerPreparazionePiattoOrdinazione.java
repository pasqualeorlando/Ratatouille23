package com.ratatouille23.server.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ratatouille23.server.enums.Allergene;
import com.ratatouille23.server.model.Categoria;
import com.ratatouille23.server.model.Piatto;
import com.ratatouille23.server.model.PreparazionePiattoOrdinazione;
import com.ratatouille23.server.model.dto.DTOPiatto;
import com.ratatouille23.server.model.dto.DTOPreparazionePiattoOrdinazione;
import com.ratatouille23.server.service.ServiceCategoria;
import com.ratatouille23.server.service.ServiceDipendente;
import com.ratatouille23.server.service.ServiceOrdinazione;
import com.ratatouille23.server.service.ServicePreparazionePiattoOrdinazione;

@RestController
@RequestMapping(path = "api/preparazione", produces = { "application/json" })
@CrossOrigin
public class ControllerPreparazionePiattoOrdinazione {

	@Autowired private ModelMapper modelMapper;
	@Autowired private ServiceOrdinazione serviceOrdinazione;
	@Autowired private ServiceDipendente serviceDipendente;
	@Autowired private ServiceCategoria serviceCategoria;
	@Autowired private ServicePreparazionePiattoOrdinazione servicePreparazione;
	
	//GET
	@GetMapping("getPreparazioni")  
	@ResponseBody
	public List<DTOPreparazionePiattoOrdinazione> ottieniTuttePreparazioni()  {
		List<PreparazionePiattoOrdinazione> preparazioni = servicePreparazione.ottieniTuttePreparazioni();
		List<DTOPreparazionePiattoOrdinazione> daRestituire = new ArrayList<DTOPreparazionePiattoOrdinazione>();
		for(PreparazionePiattoOrdinazione o : preparazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	
	@GetMapping("getPreparazioniStato/{stato}")  
	@ResponseBody
	public List<DTOPreparazionePiattoOrdinazione> ottieniPreparazioniStato(@PathVariable(name="stato") String stato)  {
		List<PreparazionePiattoOrdinazione> preparazioni = servicePreparazione.ottieniPreparazioniStato(stato);
		List<DTOPreparazionePiattoOrdinazione> daRestituire = new ArrayList<DTOPreparazionePiattoOrdinazione>();
		for(PreparazionePiattoOrdinazione o : preparazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	
	@GetMapping("getPreparazioneDaId/{idpreparazione}")
	@ResponseBody
	public DTOPreparazionePiattoOrdinazione ottieniPreparazioneDaId(@PathVariable(name="idpreparazione") long idPreparazione) {
		Optional<PreparazionePiattoOrdinazione> preparazione = servicePreparazione.ottieniPreparazioneDaId(idPreparazione);
		if(preparazione.isEmpty())
			return null;
		
		return convertiInDTO(preparazione.get());
	}
	
	@GetMapping("getPreparazioniEvaseDipendente/{iddipendente}")
	@ResponseBody
	public List<DTOPreparazionePiattoOrdinazione> ottieniPreparazioniEvaseDipendente(@PathVariable(name="iddipendente") int idDipendente)  {
		List<PreparazionePiattoOrdinazione> preparazioni = servicePreparazione.ottieniPreparazioniEvaseDipendente(idDipendente);
		List<DTOPreparazionePiattoOrdinazione> daRestituire = new ArrayList<DTOPreparazionePiattoOrdinazione>();
		for(PreparazionePiattoOrdinazione o : preparazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	@GetMapping("getPreparazioniOrdinazione/{idordinazione}")
	@ResponseBody
	public List<DTOPreparazionePiattoOrdinazione> ottieniPreparazioniOrdinazione(@PathVariable(name="idordinazione") long idOrdinazione)  {
		List<PreparazionePiattoOrdinazione> preparazioni = servicePreparazione.ottieniPreparazioniDaIdOrdinazione(idOrdinazione);
		List<DTOPreparazionePiattoOrdinazione> daRestituire = new ArrayList<DTOPreparazionePiattoOrdinazione>();
		for(PreparazionePiattoOrdinazione o : preparazioni)
			daRestituire.add(convertiInDTO(o));
		return daRestituire;
	}
	
	//POST
	@PostMapping("creaPreparazione")
	@ResponseBody
	public ResponseEntity<DTOPreparazionePiattoOrdinazione> creaPreparazione(@RequestBody DTOPreparazionePiattoOrdinazione dtoPreparazione) {
		PreparazionePiattoOrdinazione preparazione = convertiInEntity(dtoPreparazione);
		
		PreparazionePiattoOrdinazione creata = servicePreparazione.creaPreparazione(preparazione);
		if(creata != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creata));
		else
			return null;
	}
	
	@PostMapping("creaPreparazioni")
	@ResponseBody
	public List<DTOPreparazionePiattoOrdinazione> creaPreparazioniMultiple(@RequestBody List<DTOPreparazionePiattoOrdinazione> dtoPreparazioni) {
		List<PreparazionePiattoOrdinazione> preparazioni = new ArrayList<PreparazionePiattoOrdinazione>();
		for(DTOPreparazionePiattoOrdinazione dtoPrep : dtoPreparazioni)
			preparazioni.add(convertiInEntity(dtoPrep));
		
		List<PreparazionePiattoOrdinazione> create = servicePreparazione.creaPreparazioni(preparazioni);
		List<DTOPreparazionePiattoOrdinazione> dtoCreate = new ArrayList<DTOPreparazionePiattoOrdinazione>();
		for(PreparazionePiattoOrdinazione prep : create)
				dtoCreate.add(convertiInDTO(prep));
		if(create != null)
			return dtoCreate;
		else
			return null;
	}
	
	//DELETE
	/*@DeleteMapping("eliminaOrdinazione/{idordinazione}")
	@ResponseBody
	public ResponseEntity<String> eliminaPiatto(@PathVariable(name="idordinazione") long idOrdinazione) {
		boolean eliminata = serviceOrdinazione.eliminaOrdinazione(idOrdinazione);
		if(eliminata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}*/
	
	//PUT
	@PutMapping("modificaPreparazione")
	@ResponseBody
	public ResponseEntity<String> modificaPreparazione(@RequestBody DTOPreparazionePiattoOrdinazione dtoPreparazione) {
		PreparazionePiattoOrdinazione preparazione = convertiInEntity(dtoPreparazione);
		
		boolean modificata = servicePreparazione.modificaPreparazione(preparazione);
		if(modificata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOPreparazionePiattoOrdinazione convertiInDTO(PreparazionePiattoOrdinazione preparazione) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOPreparazionePiattoOrdinazione dtoPreparazione = new DTOPreparazionePiattoOrdinazione();
		dtoPreparazione = modelMapper.map(preparazione, DTOPreparazionePiattoOrdinazione.class);
		
		//Mapping altri attributi
		if(preparazione.getDipendente() != null)
			dtoPreparazione.setIdDipendente(preparazione.getDipendente().getIdDipendente());
		else
			dtoPreparazione.setIdDipendente(-1);
		dtoPreparazione.setIdOrdinazione(preparazione.getOrdinazione().getIdOrdinazione());
		dtoPreparazione.setPiatto(convertiPiattoInDTO(preparazione.getPiatto()));
		
		return dtoPreparazione;
	}
	
	private PreparazionePiattoOrdinazione convertiInEntity(DTOPreparazionePiattoOrdinazione dtoPreparazione) {
		PreparazionePiattoOrdinazione preparazione = new PreparazionePiattoOrdinazione();
		
		preparazione.setQuantita(dtoPreparazione.getQuantita());
		preparazione.setNota(dtoPreparazione.getNota());
		preparazione.setStatoPreparazione(dtoPreparazione.getStatoPreparazione());
		preparazione.setIdPreparazionePiattoOrdinazione(dtoPreparazione.getIdPreparazionePiattoOrdinazione());
		
		if(dtoPreparazione.getIdDipendente() > 0 )
			preparazione.setDipendente(serviceDipendente.ottieniDipendenteDaId(dtoPreparazione.getIdDipendente()).get());
		else
			preparazione.setDipendente(null);
		preparazione.setOrdinazione(serviceOrdinazione.ottieniOrdinazioneDaId(dtoPreparazione.getIdOrdinazione()).get());
		preparazione.setPiatto(convertiPiattoInEntity(dtoPreparazione.getPiatto()));
		
		return preparazione;
	}
	
	private DTOPiatto convertiPiattoInDTO(Piatto piatto) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOPiatto dtoPiatto = new DTOPiatto();
		dtoPiatto = modelMapper.map(piatto, DTOPiatto.class);
		
		//Mapping altri attributi
		dtoPiatto.setCategoria(piatto.getCategoria().getNome());
				
		List<String> allergeni = new ArrayList<String>();
		for(Allergene a : piatto.getAllergeni())
			allergeni.add(a.getNome());
		
		dtoPiatto.setAllergeni(allergeni);
		
		return dtoPiatto;
	}
	
	private Piatto convertiPiattoInEntity(DTOPiatto dtoPiatto) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Piatto piatto = new Piatto();
		piatto = modelMapper.map(dtoPiatto, Piatto.class);
		
		//Mapping altri attributi
		Optional<Categoria> categoriaOpt = serviceCategoria.ottieniCategoriaDaNome(dtoPiatto.getCategoria());
		Categoria c = categoriaOpt.get();
		piatto.setCategoria(c);
		
		List<Allergene> allergeni = new ArrayList<Allergene>();
		for(String a : dtoPiatto.getAllergeni())
			allergeni.add(Allergene.getAllergene(a));
		piatto.setAllergeni(allergeni);
		
		return piatto;
	}
}
