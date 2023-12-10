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
import org.springframework.web.bind.annotation.DeleteMapping;
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
import com.ratatouille23.server.model.dto.DTOPiatto;
import com.ratatouille23.server.service.ServiceCategoria;
import com.ratatouille23.server.service.ServicePiatto;

@RestController
@RequestMapping(path = "api/piatto", produces = { "application/json" })
@CrossOrigin
public class ControllerPiatto {

	@Autowired private ServicePiatto servicePiatto;
	@Autowired private ServiceCategoria serviceCategoria;
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getPiatti")  
	@ResponseBody
	public List<DTOPiatto> ottieniTuttiPiatti()  {
		List<Piatto> piatti = servicePiatto.ottieniTuttiPiatti();
		List<DTOPiatto> daRestituire = new ArrayList<DTOPiatto>();
		for(Piatto p : piatti)
			daRestituire.add(convertiInDTO(p));
		return daRestituire;
	}
	
	@GetMapping("getPiattiAttivi")  
	@ResponseBody
	public List<DTOPiatto> ottieniTuttiPiattiAttivi()  {
		List<Piatto> piatti = servicePiatto.ottieniTuttiPiattiAttivi();
		List<DTOPiatto> daRestituire = new ArrayList<DTOPiatto>();
		for(Piatto p : piatti)
			daRestituire.add(convertiInDTO(p));
		return daRestituire;
	}
	
	@GetMapping("getPiattoDaId/{idpiatto}")
	@ResponseBody
	public DTOPiatto ottieniPiattoDaId(@PathVariable(name="idpiatto") long idPiatto) {
		Optional<Piatto> piatto = servicePiatto.ottieniPiattoDaId(idPiatto);
		if(piatto.isEmpty())
			return null;
		
		return convertiInDTO(piatto.get());
	}
	
	@GetMapping("getPiattiCategoria/{idcategoria}/{attivi}")
	@ResponseBody
	public List<DTOPiatto> ottieniPiattiCategoria(@PathVariable(name="idcategoria") int idCategoria, @PathVariable(name="attivi") boolean attivi) {
		List<Piatto> piatti = servicePiatto.ottieniPiattiCategoria(idCategoria, attivi);
		
		List<DTOPiatto> daRestituire = new ArrayList<DTOPiatto>();
		for(Piatto p : piatti)
			daRestituire.add(convertiInDTO(p));
		return daRestituire;
	}
	
	//POST
	@PostMapping("creaPiatto")
	@ResponseBody
	public ResponseEntity<DTOPiatto> creaPiatto(@RequestBody DTOPiatto dtoPiatto) {
		Piatto piatto = convertiInEntity(dtoPiatto);
		
		/*System.err.println(dtoPiatto.getAllergeni());
		System.err.println(piatto.getAllergeni());*/
		
		Piatto creato = servicePiatto.creaPiatto(piatto);
		if(creato != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creato));
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaPiatto/{idpiatto}")
	@ResponseBody
	public ResponseEntity<String> eliminaPiatto(@PathVariable(name="idpiatto") long idPiatto) {
		boolean eliminato = servicePiatto.eliminaPiatto(idPiatto);
		if(eliminato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//PUT
	@PutMapping("modificaPiatto")
	@ResponseBody
	public ResponseEntity<DTOPiatto> modificaPiatto(@RequestBody DTOPiatto dtoPiatto) {
		Piatto piatto = convertiInEntity(dtoPiatto);
		
		Piatto modificato = servicePiatto.modificaPiatto(piatto);
		if(modificato != null)
			return ResponseEntity.status(HttpStatus.OK).body(convertiInDTO(modificato));
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOPiatto convertiInDTO(Piatto piatto) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOPiatto dtoPiatto = new DTOPiatto();
		dtoPiatto = modelMapper.map(piatto, DTOPiatto.class);
		
		//Mapping altri attributi
		dtoPiatto.setCategoria(piatto.getCategoria().getNome());
		dtoPiatto.setIdCategoria(piatto.getCategoria().getIdCategoria());
		
		List<String> allergeni = new ArrayList<String>();
		for(Allergene a : piatto.getAllergeni())
			allergeni.add(a.getNome());
		
		dtoPiatto.setAllergeni(allergeni);
		
		return dtoPiatto;
	}
	
	private Piatto convertiInEntity(DTOPiatto dtoPiatto) {
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
