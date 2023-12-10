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

import com.ratatouille23.server.model.Menu;
import com.ratatouille23.server.model.dto.DTOMenu;
import com.ratatouille23.server.service.ServiceMenu;

@RestController
@RequestMapping(path = "api/menu", produces = { "application/json" })
@CrossOrigin
public class ControllerMenu {
	
	@Autowired private ServiceMenu serviceMenu;
	
	@Autowired private ModelMapper modelMapper;
	
	//GET
	@GetMapping("getMenu")
	@ResponseBody
	public List<DTOMenu> ottieniTuttiMenu()  {
		List<Menu> menu = serviceMenu.ottieniTuttiMenu();
		List<DTOMenu> daRestituire = new ArrayList<DTOMenu>();
		
		for(Menu m : menu)
			daRestituire.add(convertiInDTO(m));
		
		return daRestituire;
	}
	
	@GetMapping("getMenuAbilitati")  
	@ResponseBody
	public List<DTOMenu> ottieniTuttiMenuAbilitati()  {
		List<Menu> menu = serviceMenu.ottieniTuttiMenuAbilitati();
		List<DTOMenu> daRestituire = new ArrayList<DTOMenu>();
		
		for(Menu m : menu)
			daRestituire.add(convertiInDTO(m));
		
		return daRestituire;
	}
	
	@GetMapping("getMenuDaId/{idmenu}")
	@ResponseBody
	public DTOMenu ottieniMenuDaId(@PathVariable(name="idmenu") int idMenu) {
		Optional<Menu> menu = serviceMenu.ottieniMenuDaId(idMenu);
		if(menu.isEmpty())
			return null;
		
		return convertiInDTO(menu.get());
	}
	
	//POST
	@PostMapping("creaMenu")
	@ResponseBody
	public ResponseEntity<DTOMenu> creaMenu(@RequestBody DTOMenu dtoMenu) {
		Menu menu = convertiInEntity(dtoMenu);
		
		Menu creato = serviceMenu.creaMenu(menu);
		if(creato != null)
			return ResponseEntity.status(HttpStatus.CREATED).body(convertiInDTO(creato));
		else
			throw new RuntimeException();
	}
	
	//DELETE
	@DeleteMapping("eliminaMenu/{idmenu}")
	@ResponseBody
	public ResponseEntity<String> eliminaMenu(@PathVariable(name="idmenu") int idMenu) {
		boolean eliminato = serviceMenu.eliminaMenu(idMenu);
		if(eliminato)
			return ResponseEntity.status(HttpStatus.OK).build();
		else
			throw new RuntimeException();
	}
	
	//PUT
	@PutMapping("modificaMenu")
	@ResponseBody
	public ResponseEntity<DTOMenu> modificaMenu(@RequestBody DTOMenu dtoMenu) {
		Menu menu = convertiInEntity(dtoMenu);
		
		Menu modificato = serviceMenu.modificaMenu(menu);
		if(modificato != null)
			return ResponseEntity.status(HttpStatus.OK).body(convertiInDTO(modificato));
		else
			throw new RuntimeException();
	}
	
	//Conversioni
	private Menu convertiInEntity(DTOMenu dtoMenu) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		Menu menu = new Menu();
		menu = modelMapper.map(dtoMenu, Menu.class);
		
		return menu;
	}
	
	private DTOMenu convertiInDTO(Menu menu) {
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.LOOSE);
		DTOMenu dtoMenu = new DTOMenu();
		dtoMenu = modelMapper.map(menu, DTOMenu.class);
		
		return dtoMenu;
	}
}