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

import com.ratatouille23.server.model.Categoria;
import com.ratatouille23.server.model.CategoriaMenu;
import com.ratatouille23.server.model.dto.DTOCategoria;
import com.ratatouille23.server.model.dto.DTOCategoriaMenu;
import com.ratatouille23.server.service.ServiceCategoria;

@RestController
@RequestMapping(path = "api/categoria", produces = { "application/json" })
@CrossOrigin
public class ControllerCategoria {
	
	@Autowired private ServiceCategoria serviceCategoria;
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getCategorie")  
	@ResponseBody
	public List<DTOCategoria> ottieniTutteCategorie()  {
		List<DTOCategoria> daRestituire = new ArrayList<DTOCategoria>();
		List<Categoria> categorie = serviceCategoria.ottieniTutteCategorie();
		for(Categoria c : categorie)
			daRestituire.add(convertiInDTO(c));
		
		return daRestituire;
	}
	
	@GetMapping("getCategoriaDaId/{idcategoria}")
	@ResponseBody
	public DTOCategoria ottieniCategoriaDaId(@PathVariable(name="idcategoria") int idCategoria) {
		Optional<Categoria> categoria = serviceCategoria.ottieniCategoriaDaId(idCategoria);
		if(categoria.isEmpty())
			return null;
		
		return convertiInDTO(categoria.get());
	}
	
	//POST
	@PostMapping("creaCategoria")
	@ResponseBody
	public ResponseEntity<DTOCategoria> creaCategoria(@RequestBody DTOCategoria dtoCategoria) {
		Categoria categoria = convertiInEntity(dtoCategoria);
		
		Categoria creata = serviceCategoria.creaCategoria(categoria);
		if(creata != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creata));
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaCategoria/{idcategoria}")
	@ResponseBody
	public ResponseEntity<String> eliminaCategoria(@PathVariable(name="idcategoria") int idCategoria) {
		boolean eliminata = serviceCategoria.eliminaCategoria(idCategoria);
		if(eliminata)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//PUT
	@PutMapping("modificaCategoria")
	@ResponseBody
	public ResponseEntity<DTOCategoria> modificaCategoria(@RequestBody DTOCategoria dtoCategoria) {
		Categoria categoria = convertiInEntity(dtoCategoria);
		
		Categoria modificata = serviceCategoria.modificaCategoria(categoria);
		if(modificata != null)
			return ResponseEntity.status(HttpStatus.OK).body(convertiInDTO(modificata));
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private DTOCategoria convertiInDTO(Categoria categoria) {
		DTOCategoria dtoCategoria = new DTOCategoria();
		
		dtoCategoria.setIdCategoria(categoria.getIdCategoria());
		dtoCategoria.setNome(categoria.getNome());
		
		List<DTOCategoriaMenu> dtoMenu = new ArrayList<DTOCategoriaMenu>();
		for(CategoriaMenu cm : categoria.getMenu())
			dtoMenu.add(convertiMenuInDTO(cm));
		dtoCategoria.setMenu(dtoMenu);
		
		return dtoCategoria;
	}
	
	private Categoria convertiInEntity(DTOCategoria dtoCategoria) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Categoria categoria = new Categoria();
		categoria = modelMapper.map(dtoCategoria, Categoria.class);
		
		return categoria;
	}
	
	private DTOCategoriaMenu convertiMenuInDTO(CategoriaMenu menu) {
		DTOCategoriaMenu dtoMenu = new DTOCategoriaMenu();
		
		dtoMenu.setAbilitato(menu.isAbilitato());
		dtoMenu.setIdCategoria(menu.getCategoria().getIdCategoria());
		dtoMenu.setIdCategoriaMenu(menu.getIdCategoriaMenu());
		dtoMenu.setIdMenu(menu.getMenu().getIdMenu());
		dtoMenu.setNomeCategoria(menu.getCategoria().getNome());
		dtoMenu.setNomeMenu(menu.getMenu().getNome());
		dtoMenu.setPosizioneCategoria(menu.getPosizioneCategoria());
		
		return dtoMenu;
	}
}
